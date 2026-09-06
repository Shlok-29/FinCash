import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, MessageCircle, Share2, Plus, Sparkles, UserCheck, Flame, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const Community = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Aarav Sharma',
      role: 'Tax Specialist Candidate',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      time: '2 hours ago',
      title: 'Should I switch to the New Tax Regime for FY 2024-25 if I have ₹1.5L in ELSS?',
      content: 'I have been investing ₹12,500 monthly in ELSS funds under Section 80C. Under the new regime with ₹75k standard deduction, my taxable income comes out slightly lower. What are your thoughts?',
      likes: 42,
      comments: 18,
      tags: ['Taxation', 'ELSS', '80C']
    },
    {
      id: 2,
      author: 'Priya Patel',
      role: 'Early Stage Investor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      time: '5 hours ago',
      title: 'My 50/30/20 Budgeting milestone: Saved my first ₹1 Lakh in liquid emergency fund!',
      content: 'Following the FinCash Budget Lab rule strictly over the past 8 months. Started with zero savings and built a 4-month emergency cushion. Consistency really works!',
      likes: 128,
      comments: 34,
      tags: ['Milestone', 'BudgetLab', 'EmergencyFund']
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post = {
      id: Date.now(),
      author: user?.name || 'FinCash Member',
      role: 'Community Member',
      avatar: `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`,
      time: 'Just now',
      title: newTitle,
      content: newContent,
      likes: 1,
      comments: 0,
      tags: ['General', 'FinCash']
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPost(false);
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-widest mb-1">
            <MessageSquare size={16} /> Peer Financial Exchange
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-white">FinCash Community</h1>
          <p className="text-gray-400 text-sm">Ask financial questions, share budgeting milestones, and learn from fellow investors.</p>
        </div>

        <button 
          onClick={() => setShowNewPost(!showNewPost)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-2xl transition-all shadow-lg shadow-purple-600/20"
        >
          <Plus size={18} />
          Create New Discussion
        </button>
      </div>

      {showNewPost && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl space-y-4"
        >
          <h3 className="text-lg font-bold text-white">Start a Discussion</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input 
              type="text"
              placeholder="Topic Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-white text-sm focus:border-purple-500 outline-none"
            />
            <textarea 
              rows={4}
              placeholder="Describe your financial question or milestone..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-white text-sm focus:border-purple-500 outline-none resize-none"
            />
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setShowNewPost(false)}
                className="px-5 py-2.5 bg-gray-800 text-gray-400 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/20"
              >
                Publish Post
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover border border-gray-700" />
                <div>
                  <h4 className="text-sm font-bold text-white">{post.author}</h4>
                  <p className="text-[10px] text-purple-400 font-bold uppercase">{post.role} • {post.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {post.tags.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-950 text-gray-400 border border-gray-800">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-gray-800/80 text-xs font-bold text-gray-400">
              <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <ThumbsUp size={16} /> {post.likes} Upvotes
              </button>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MessageCircle size={16} /> {post.comments} Comments
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Share2 size={16} /> Share
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Community;
