import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PLATFORMS } from '../data/mockData';
import Topbar from '../components/Topbar';
import NewPostModal from '../components/NewPostModal';
import PlatformPill from '../components/PlatformPill';
import styles from './Schedule.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function PostDot({ post }) {
  const plat = PLATFORMS[post.platform];
  return (
    <div
      className={styles.postDot}
      style={{ background: plat?.bg, borderLeft: `2px solid ${plat?.color}` }}
      title={post.title}
    >
      <span className={styles.postDotTitle}>{post.title}</span>
      <span className={styles.postDotTime}>
        {new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}

function DayDetail({ day, posts, onClose, onNewPost }) {
  const date = new Date(day);
  return (
    <div className={styles.dayDetail}>
      <div className={styles.dayDetailHeader}>
        <div>
          <div className={styles.dayDetailDate}>
            {date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className={styles.dayDetailCount}>{posts.length} post{posts.length !== 1 ? 's' : ''}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => onNewPost(day)}>
            <Plus size={13} /> Add
          </button>
          <button className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>
      </div>
      {posts.length === 0 ? (
        <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          Nothing scheduled — add a post?
        </div>
      ) : posts.map(p => (
        <div key={p.id} className={styles.detailPost}>
          <div className={styles.detailTime}>
            {new Date(p.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={styles.detailContent}>
            <div className={styles.detailTitle}>{p.title}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <PlatformPill platform={p.platform} />
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20,
                background: p.status === 'draft' ? 'rgba(253,230,138,0.12)' : 'rgba(134,239,172,0.12)',
                color: p.status === 'draft' ? 'var(--yellow)' : 'var(--mint)',
              }}>{p.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Schedule() {
  const { posts } = useApp();
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDay, setSelectedDay] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostDate, setNewPostDate] = useState(null);
  const [filterPlatform, setFilterPlatform] = useState('all');

  const { year, month } = current;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const prev = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });
  const goToday = () => setCurrent({ year: today.getFullYear(), month: today.getMonth() });

  const filteredPosts = filterPlatform === 'all' ? posts : posts.filter(p => p.platform === filterPlatform);

  const getPostsForDay = (d) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    return filteredPosts.filter(p => {
      const pd = new Date(p.date);
      return pd.getFullYear() === year && pd.getMonth() === month && pd.getDate() === d;
    }).sort((a,b) => new Date(a.date) - new Date(b.date));
  };

  const selectedPosts = selectedDay ? getPostsForDay(selectedDay) : [];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevMonthDays - firstDay + 1 + i, type: 'prev' });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type: 'current' });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - firstDay - daysInMonth + 1, type: 'next' });

  const handleDayClick = (d) => setSelectedDay(selectedDay === d ? null : d);
  const handleNewPost = (date) => { setNewPostDate(date); setShowNewPost(true); };

  return (
    <>
      <Topbar title="Schedule" actions={
        <button className="btn btn-primary" onClick={() => { setNewPostDate(null); setShowNewPost(true); }}>
          <Plus size={15} /> New Post
        </button>
      } />

      <div className={styles.wrapper}>
        <div className={styles.calendarArea}>
          <div className={styles.calHeader}>
            <div className={styles.calNav}>
              <button className="btn btn-ghost" style={{ padding: '7px 10px' }} onClick={prev}>
                <ChevronLeft size={16} />
              </button>
              <div className={styles.calMonthYear}>{MONTHS[month]} {year}</div>
              <button className="btn btn-ghost" style={{ padding: '7px 10px' }} onClick={next}>
                <ChevronRight size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={filterPlatform === 'all' ? styles.filterActive : styles.filterBtn}
                  onClick={() => setFilterPlatform('all')}
                >All</button>
                {Object.entries(PLATFORMS).map(([k, v]) => (
                  <button
                    key={k}
                    className={filterPlatform === k ? styles.filterActive : styles.filterBtn}
                    style={filterPlatform === k ? { background: v.bg, color: v.color } : {}}
                    onClick={() => setFilterPlatform(k)}
                  >{v.name}</button>
                ))}
              </div>
              <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={goToday}>Today</button>
            </div>
          </div>

          <div className={styles.calGrid}>
            {DAYS.map(d => (
              <div key={d} className={styles.calDayHeader}>{d}</div>
            ))}
            {cells.map((cell, i) => {
              const dayPosts = cell.type === 'current' ? getPostsForDay(cell.day) : [];
              const isToday = cell.type === 'current' && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = cell.type === 'current' && cell.day === selectedDay;

              return (
                <div
                  key={i}
                  className={`${styles.calCell} ${cell.type !== 'current' ? styles.calCellOther : ''} ${isToday ? styles.calCellToday : ''} ${isSelected ? styles.calCellSelected : ''}`}
                  onClick={() => cell.type === 'current' && handleDayClick(cell.day)}
                >
                  <div className={styles.calDayNum}>{cell.day}</div>
                  <div className={styles.calPostList}>
                    {dayPosts.slice(0, 3).map(p => <PostDot key={p.id} post={p} />)}
                    {dayPosts.length > 3 && (
                      <div className={styles.morePost}>+{dayPosts.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedDay && (
          <DayDetail
            day={new Date(year, month, selectedDay)}
            posts={selectedPosts}
            onClose={() => setSelectedDay(null)}
            onNewPost={handleNewPost}
          />
        )}
      </div>

      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} defaultDate={newPostDate} />}
    </>
  );
}
