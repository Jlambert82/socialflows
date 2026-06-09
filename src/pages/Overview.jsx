import { useState } from 'react';
import { Plus, CalendarPlus, TrendingUp, TrendingDown, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ANALYTICS, AI_SUGGESTIONS, PLATFORMS } from '../data/mockData';
import Topbar from '../components/Topbar';
import PlatformPill from '../components/PlatformPill';
import NewPostModal from '../components/NewPostModal';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Overview.module.css';

const STAT_COLORS = ['lavender','mint','peach','sky'];
const STAT_LABELS = ['Total Reach','Engagement','Posts Scheduled','New Followers'];
const STAT_KEYS   = ['totalReach','engagement','scheduled','newFollowers'];

function StatCard({ label, data, accent }) {
  return (
    <div className={styles.statCard} style={{ '--accent': `var(--${accent})`, '--accent-bg': `var(--${accent}-bg)` }}>
      <div className={styles.statAccent} />
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue} style={{ color: `var(--${accent})` }}>{data.value}</div>
      <div className={styles.statChange} style={{ color: data.up ? 'var(--mint)' : 'var(--peach)' }}>
        {data.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {data.change} this week
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-md)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ marginBottom: 6, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {PLATFORMS[p.dataKey]?.name}: {(p.value / 1000).toFixed(1)}K
        </div>
      ))}
    </div>
  );
};

export default function Overview() {
  const { posts } = useApp();
  const [showNewPost, setShowNewPost] = useState(false);

  const upcoming = posts
    .filter(p => p.status === 'scheduled' && new Date(p.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const formatDate = (d) => {
    const date = new Date(d);
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return `Today · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return `${date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const PLATFORM_COLORS = { instagram: '#C4B5FD', tiktok: '#FCA5A5', facebook: '#93C5FD', youtube: '#86EFAC' };

  return (
    <>
      <Topbar title="overview" actions={
        <>
          <button className="btn btn-ghost" onClick={() => setShowNewPost(true)}>
            <CalendarPlus size={15} /> Schedule
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewPost(true)}>
            <Plus size={15} /> New Post
          </button>
        </>
      } />
      <div className={styles.content}>
        <div className={styles.statsGrid}>
          {STAT_KEYS.map((key, i) => (
            <StatCard key={key} label={STAT_LABELS[i]} data={ANALYTICS.summary[key]} accent={STAT_COLORS[i]} />
          ))}
        </div>

        <div className={styles.twoCol}>
          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Upcoming posts</span>
              <a href="/schedule" style={{ fontSize: 12, color: 'var(--lavender)', fontWeight: 500 }}>View all →</a>
            </div>
            {upcoming.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <div className="empty-state-title">No upcoming posts</div>
                <div className="empty-state-desc">Schedule your first post to get started.</div>
              </div>
            ) : upcoming.map(post => (
              <div key={post.id} className={styles.schedItem}>
                <div className={styles.schedThumb} style={{ background: PLATFORMS[post.platform]?.bg }}>
                  {PLATFORMS[post.platform]?.icon}
                </div>
                <div className={styles.schedInfo}>
                  <div className={styles.schedTitle}>{post.title}</div>
                  <div className={styles.schedMeta}>
                    <span>{formatDate(post.date)}</span>
                    <PlatformPill platform={post.platform} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>AI suggestions</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: 'var(--lavender-bg)', color: 'var(--lavender)' }}>
                ✦ Powered by AI
              </span>
            </div>
            {AI_SUGGESTIONS.map(s => (
              <div key={s.id} className={styles.aiChip}>
                <div className={styles.aiChipIcon} style={{ background: `${s.color}20` }}>
                  <span style={{ fontSize: 13 }}>{s.icon}</span>
                </div>
                <div className={styles.aiChipText}>{s.text}</div>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Weekly reach by platform</span>
            <div style={{ display: 'flex', gap: 16 }}>
              {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
                  {PLATFORMS[k].name}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ANALYTICS.weeklyReach} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                  <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#grad-${k})`} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} />}
    </>
  );
}
