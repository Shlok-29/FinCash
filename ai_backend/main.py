import os
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="FinCash AI Backend")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_key = os.getenv("OPENAI_API_KEY")
gemini_key = os.getenv("GEMINI_API_KEY")

openai_client = None
if openai_key and openai_key.strip():
    try:
        from openai import OpenAI
        openai_client = OpenAI(api_key=openai_key.strip())
    except Exception as e:
        print(f"OpenAI Client Init Note: {e}")

gemini_model = None
if gemini_key and gemini_key.strip():
    try:
        import google.generativeai as genai
        genai.configure(api_key=gemini_key.strip())
        gemini_model = genai.GenerativeModel('gemini-1.5-flash')
    except Exception as e:
        print(f"Gemini Client Init Note: {e}")

class EvaluationRequest(BaseModel):
    quiz_score: int
    total_questions: int
    assignment_text: str
    user_savings: Optional[float] = 0
    user_salary: Optional[float] = 0
    video_title: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

SYSTEM_PROMPT = """You are the official FinCash AI Financial Assistant (AI Mentor), an intelligent assistant for the FinCash financial wellness platform.

SCOPE & PERMITTED TOPICS:
1. FinCash Platform Features & Navigation:
   - Personalized Financial Roadmaps
   - Budget Lab & Expense Tracking
   - Tax Center & Tax Planning (e.g., Income tax, Section 80C, ELSS, deduction rules)
   - Investments & Stock Market Insights
   - Insurance Recommendations (Health, Life)
   - Financial Simulations & Gamified Learning Paths (XP, Streaks, Badges)
   - Mentor Sessions & Expert Consultations

2. Financial Concepts & Financial Literacy:
   - Personal finance, budgeting, emergency funds, debt/loan management, credit scores (CIBIL).
   - Taxes, tax optimization, and tax saving instruments.
   - Investment vehicles: Stocks, Equity, Mutual Funds, Index Funds, SIPs, Bonds, Real Estate, Gold, ETFs.
   - Cryptocurrencies & Bitcoin: Blockchain fundamentals, crypto market trends, risk management, and digital asset principles.
   - General economic and financial literacy concepts.

STRICT DENIAL FOR UNRELATED / OFF-TOPIC QUERIES:
If the user asks ANY query that is completely unrelated to finance, money management, investments, crypto, taxes, economics, business, or the FinCash platform (for example: cooking, recipes, movies, entertainment, sports, non-financial coding/programming, fiction writing, jokes, weather, general trivia):
You MUST POLITELY DENY to answer.

Denial Guidelines:
- State clearly and politely that you are FinCash's AI Assistant specialized strictly in finance, money management, and the FinCash platform.
- Invite the user to ask any questions related to finance, budgeting, taxes, crypto, stock markets, or FinCash.

Example denial response:
"I am your FinCash AI Assistant, specialized strictly in financial literacy, investments, budgeting, taxes, crypto, and the FinCash platform. I cannot assist with unrelated topics. Please feel free to ask me any questions about personal finance, money management, or FinCash!"

TONE & STYLE:
- Helpful, polite, concise, professional, and clear.
"""

def is_finance_related(msg: str) -> bool:
    msg_lower = msg.lower()
    allowed_keywords = [
        "fincash", "roadmap", "budget", "tax", "invest", "simulation", "mentor",
        "learning", "xp", "streak", "badge", "score", "money", "finance", "literacy",
        "saving", "save", "expense", "spend", "income", "salary", "bitcoin", "btc",
        "crypto", "cryptocurrency", "stock", "market", "share", "equity", "fund",
        "sip", "bond", "gold", "bank", "loan", "interest", "fd", "rd", "elss",
        "80c", "nps", "insurance", "policy", "asset", "portfolio", "dividend",
        "wealth", "debt", "credit", "cibil", "inflation", "economy", "rupee", "dollar",
        "inr", "pay", "401k", "roth", "ira", "mortgage", "yield", "capital", "wallet",
        "blockchain", "altcoin", "trading", "profit", "loss", "risk", "hedging", "hello",
        "hi", "hey", "help", "what", "how", "who"
    ]
    # Check if any financial keyword is in message
    return any(kw in msg_lower for kw in allowed_keywords)

@app.post("/api/evaluate")
async def evaluate_user(data: EvaluationRequest):
    prompt = f"""
    Act as a professional financial advisor for FinCash.
    User finished watching: "{data.video_title}".
    Quiz Score: {data.quiz_score}/{data.total_questions}
    User's Goal: "{data.assignment_text}"
    User's Savings: ₹{data.user_savings}
    User's Salary: ₹{data.user_salary}
    
    Evaluate their understanding and suggest 3 actionable investment steps. Keep it under 150 words.
    """

    if gemini_model:
        try:
            res = gemini_model.generate_content(prompt)
            if res and res.text:
                return {"suggestion": res.text, "type": "Gemini Personalized Recommendation"}
        except Exception as e:
            print(f"Gemini API evaluate error: {e}")

    if openai_client:
        try:
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a professional financial advisor for FinCash."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300
            )
            return {"suggestion": response.choices[0].message.content, "type": "OpenAI Personalized Recommendation"}
        except Exception as e:
            print(f"OpenAI API evaluate error: {e}")

    return {
        "suggestion": f"Based on your score of {data.quiz_score}/{data.total_questions} and your financial goal, we recommend building a 6-month emergency buffer and starting a low-risk index fund SIP.",
        "type": "FinCash Financial Recommendation"
    }

@app.post("/api/chat")
async def chat_with_mentor(data: ChatRequest):
    # 0. Enforce domain relevance check
    if not is_finance_related(data.message):
        return {
            "response": "I am your FinCash AI Assistant, specialized strictly in financial literacy, investments, budgeting, taxes, crypto, and the FinCash platform. I cannot assist with unrelated topics. Please feel free to ask me any questions about personal finance, money management, or FinCash!"
        }

    # 1. Try Gemini API if key configured
    if gemini_model:
        try:
            # Build conversation context for Gemini
            conversation_history = ""
            if data.history:
                for h in data.history[-6:]:
                    sender = "User" if h.get("role") in ["user"] else "Assistant"
                    conversation_history += f"{sender}: {h.get('content', '')}\n"
            
            full_prompt = f"{SYSTEM_PROMPT}\n\nRecent History:\n{conversation_history}\nUser: {data.message}\nAssistant:"
            res = gemini_model.generate_content(full_prompt)
            if res and res.text:
                return {"response": res.text.strip()}
        except Exception as e:
            print(f"Gemini API chat error: {e}")

    # 2. Try OpenAI API if key configured
    if openai_client:
        try:
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            if data.history:
                for item in data.history[-6:]:
                    role = "assistant" if item.get("role") in ["bot", "assistant"] else "user"
                    messages.append({"role": role, "content": item.get("content", "")})
            messages.append({"role": "user", "content": data.message})

            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=500
            )
            return {"response": response.choices[0].message.content.strip()}
        except Exception as e:
            print(f"OpenAI API chat error: {e}")

    # 3. Fallback / Guardrail domain handler (if API keys fail or quota exceeded)
    msg_lower = data.message.lower()

    # FinCash Platform & Financial responses
    if "fincash" in msg_lower:
        return {
            "response": "FinCash is a comprehensive financial wellness platform! We provide personalized financial roadmaps, AI investment advice, tax optimization tools (Tax Center), interactive budget labs, financial simulations, and expert mentor booking to help you master your finances."
        }
    elif "bitcoin" in msg_lower or "crypto" in msg_lower:
        return {
            "response": "Bitcoin and cryptocurrencies are decentralized digital assets powered by blockchain technology. While they offer high potential returns, they carry high volatility. In FinCash, we recommend allocating no more than 5-10% of your portfolio to high-risk assets like crypto, alongside stable investments like index funds and SIPs."
        }
    elif "tax" in msg_lower or "80c" in msg_lower or "elss" in msg_lower:
        return {
            "response": "Under Section 80C of the Income Tax Act in India, you can claim tax deductions up to ₹1.5 Lakh per year. Key tax-saving instruments include ELSS (Equity Linked Savings Scheme mutual funds with a 3-year lock-in), PPF, NPS, and Term Insurance. Check out the FinCash Tax Center for personalized tax planning!"
        }
    elif "stock" in msg_lower or "market" in msg_lower or "share" in msg_lower or "invest" in msg_lower:
        return {
            "response": "Investing in the stock market allows your money to grow against inflation. Beginners can start with low-cost Nifty 50 or Sensex Index Funds via Systematic Investment Plans (SIPs). Remember the golden rule of investing: diversify your portfolio and maintain a long-term perspective!"
        }
    elif "budget" in msg_lower or "expense" in msg_lower or "saving" in msg_lower:
        return {
            "response": "A solid financial plan begins with the 50/30/20 budgeting rule: 50% of your income for needs, 30% for wants, and 20% for savings and investments. First priority should be building an emergency fund covering 3 to 6 months of expenses in a high-yield savings account or liquid fund."
        }
    elif "mentor" in msg_lower or "human" in msg_lower:
        return {
            "response": "Through the FinCash Human Mentors tab, you can book 1-on-1 sessions with verified certified financial advisors and tax experts for personalized strategy calls with secure payment processing."
        }
    
    # Generic greeting or financial assistance fallback
    return {
        "response": "Hello! I am your FinCash AI Assistant. I can help you with budgeting, tax optimization (Section 80C), stock market investing, Bitcoin & crypto, or navigating the FinCash platform. What financial question can I help you with today?"
    }


@app.get("/")
async def root():
    return {"message": "FinCash AI Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

