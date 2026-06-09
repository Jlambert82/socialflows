import { ANALYTICS, PLATFORMS } from '../data/mockData';
import Topbar from '../components/Topbar';
import PlatformPill from '../components/PlatformPill';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import styles from './Analytics.module.css';

const PLATFORM_COLORS = { instagram: '#C4B5FD', tiktok: '#FCA5A5', facebook: '#93C5FD', youtube: '#86EFAC' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-md)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color || p.fill }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `${(p.value/1000).toFixed(1)}K` : p.value}
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  const { summary, weeklyReach, followerGrowth, topPosts, platformBreakdown } = ANALYTICS;

  return (
    <>
      <Topbar title="Analytics" />
      <div className={styles.content}>
        <div className={styles.statsRow}>
          {[
            { label: 'Total Reach', ...summary.totalReach, color: 'var(--lavender)' },
            { label: 'Avg. Engagement', ...summary.engagement, color: 'var(--mint)' },
            { label: 'New Followers', ...summary.newFollowers, color: 'var(--sky)' },
            { label: 'Posts This Month', value: '15', change: '+3', up: true, color: 'var(--yellow)' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: s.up ? 'var(--mint)' : 'var(--peach)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {s.change} vs last week
              </div>
            </div>
          ))}
        </div>

        <div className={styles.twoCol}>
          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Weekly reach by platform</span>
              <div style={{ display: 'flex', gap: 12 }}>
                {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                  <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-muted)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'inline-block' }} />
                    {PLATFORMS[k].name}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weeklyReach} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                    <linearGradient key={k} id={`ag-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                {Object.entries(PLATFORM_COLORS).map(([k, c]) => (
                  <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} fill={`url(#ag-${k})`} name={PLATFORMS[k].name} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Follower growth</span>
              <span style={{ fontSize: 11, color: 'var(--mint)' }}>↑ 124% YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={followerGrowth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fg-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4B5FD" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" stroke="#C4B5FD" strokeWidth={2} fill="url(#fg-grad)" name="Followers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Platform breakdown</span>
            </div>
            {platformBreakdown.map(p => (
              <div key={p.platform} className={styles.breakdownRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <PlatformPill platform={p.platform} />
                  <div className={styles.breakdownBar}>
                    <div className={styles.breakdownBarFill} style={{
                      width: `${p.pct}%`,
                      background: PLATFORM_COLORS[p.platform],
                    }} />
                  </div>
                </div>
                <div className={styles.breakdownStats}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{(p.reach/1000).toFixed(0)}K</span>
                  <span style={{ color: 'var(--text-muted)' }}>{p.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Top performing posts</span>
            </div>
            {topPosts.map((p, i) => (
              <div key={i} className={styles.topPost}>
                <div className={styles.topPostRank} style={{ color: i === 0 ? 'var(--yellow)' : 'var(--text-muted)' }}>
                  {i + 1}
                </div>
                <div className={styles.topPostThumb} style={{ background: PLATFORMS[p.platform]?.bg }}>
                  {p.emoji}
                </div>
                <div className={styles.topPostInfo}>
                  <div className={styles.topPostTitle}>{p.title}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 3 }}>
                    <PlatformPill platform={p.platform} />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.reach} reach</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--mint)' }}>{p.engagement}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>engagement</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
