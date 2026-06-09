import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PLATFORMS } from '../data/mockData';

const TYPES = ['image','video','reel','story'];

export default function NewPostModal({ onClose, defaultDate }) {
  const { addPost, accounts } = useApp();
  const [form, setForm] = useState({
    title: '', platform: 'instagram', account: '',
    type: 'image', caption: '', status: 'scheduled',
    date: defaultDate
      ? new Date(defaultDate).toISOString().slice(0,16)
      : new Date().toISOString().slice(0,16),
    tags: '',
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCaption, setAiCaption] = useState('');

  const platAccounts = accounts.filter(a => a.platform === form.platform);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generateCaption = async () => {
    if (!form.title) return;
    setAiLoading(true);
    // Simulate AI caption generation
    await new Promise(r => setTimeout(r, 1200));
    const captions = {
      instagram: `✨ ${form.title} — this one's for you. Drop a 💜 if you're feeling it. #content #viral`,
      tiktok:    `POV: you just found your new favorite thing 🔥 ${form.title} #fyp #trending`,
      facebook:  `We're excited to share: ${form.title}. Let us know your thoughts in the comments below! 👇`,
      youtube:   `In today's video: ${form.title}. Watch till the end — you won't want to miss it!`,
    };
    setAiCaption(captions[form.platform] || captions.instagram);
    set('caption', captions[form.platform] || captions.instagram);
    setAiLoading(false);
  };

  const handleSubmit = () => {
    if (!form.title || !form.platform) return;
    const account = form.account || platAccounts[0]?.id || '';
    addPost({
      ...form,
      account,
      date: new Date(form.date),
      tags: form.tags.split(' ').filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Create new post</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" placeholder="Give your post a name..." value={form.title} onChange={e => set('title', e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Platform</label>
            <select value={form.platform} onChange={e => { set('platform', e.target.value); set('account', ''); }}>
              {Object.entries(PLATFORMS).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Account</label>
            <select value={form.account} onChange={e => set('account', e.target.value)}>
              <option value="">Auto-select</option>
              {platAccounts.map(a => (
                <option key={a.id} value={a.id}>{a.handle}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Content type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Publish date & time</label>
          <input type="datetime-local" value={form.date} onChange={e => set('date', e.target.value)} />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <label className="form-label" style={{ margin: 0 }}>Caption</label>
            <button
              className="btn btn-ghost"
              style={{ padding: '4px 10px', fontSize: 11, gap: 4 }}
              onClick={generateCaption}
              disabled={aiLoading}
            >
              <Sparkles size={12} />
              {aiLoading ? 'Generating...' : 'AI Suggest'}
            </button>
          </div>
          <textarea
            rows={4}
            placeholder="Write your caption here..."
            value={form.caption}
            onChange={e => set('caption', e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hashtags (space separated)</label>
          <input type="text" placeholder="#summer #newcollection #brand" value={form.tags} onChange={e => set('tags', e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {form.status === 'draft' ? 'Save draft' : 'Schedule post'}
          </button>
        </div>
      </div>
    </div>
  );
}
