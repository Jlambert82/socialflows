import { createContext, useContext, useState } from 'react';
import { SCHEDULED_POSTS, MEDIA_LIBRARY, TEAM_MEMBERS, ACCOUNTS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [posts, setPosts] = useState(SCHEDULED_POSTS);
  const [media, setMedia] = useState(MEDIA_LIBRARY);
  const [team, setTeam] = useState(TEAM_MEMBERS);
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const [user] = useState({ name: 'Alex Johnson', avatar: 'AJ', role: 'Admin' });

  const addPost = (post) => setPosts(prev => [...prev, { ...post, id: `p${Date.now()}` }]);
  const updatePost = (id, data) => setPosts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deletePost = (id) => setPosts(prev => prev.filter(p => p.id !== id));

  const addMedia = (item) => setMedia(prev => [{ ...item, id: `m${Date.now()}` }, ...prev]);
  const deleteMedia = (id) => setMedia(prev => prev.filter(m => m.id !== id));

  const addTeamMember = (member) => setTeam(prev => [...prev, { ...member, id: `t${Date.now()}` }]);
  const removeTeamMember = (id) => setTeam(prev => prev.filter(t => t.id !== id));

  const connectAccount = (account) => setAccounts(prev => [...prev, { ...account, id: `acc${Date.now()}` }]);
  const disconnectAccount = (id) => setAccounts(prev => prev.filter(a => a.id !== id));

  return (
    <AppContext.Provider value={{
      posts, addPost, updatePost, deletePost,
      media, addMedia, deleteMedia,
      team, addTeamMember, removeTeamMember,
      accounts, connectAccount, disconnectAccount,
      user,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
