import { useState, useRef } from 'react';
import { Upload, Search, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PLATFORMS } from '../data/mockData';
import Topbar from '../components/Topbar';
import PlatformPill from '../components/PlatformPill';
import styles from './Library.module.css';

const FILTERS = ['All', 'Images', 'Videos', 'Instagram', 'TikTok', 'Facebook', 'YouTube'];

export default function Library() {
  const { media, addMedia, deleteMedia } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const fileRef = useRef();

  const filtered = media.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All' ? true :
      filter === 'Images' ? m.type === 'image' :
      filter === 'Videos' ? m.type === 'video' :
      m.platform === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const plats = ['instagram','tiktok','facebook','youtube'];
      const plat = plats[Math.floor(Math.random() * plats.length)];
      addMedia({
        name: file.name,
        type: file.type.startsWith('video') ? 'video' : 'image',
        size: `${(file.size / (1024*1024)).toFixed(1)} MB`,
        platform: plat,
        emoji: file.type.startsWith('video') ? '🎬' : '🖼️',
        color: PLATFORMS[plat].bg,
        uploaded: 'Just now',
      });
    });
  };

  return (
    <>
      <Topbar title="Media Library" actions={
        <>
          <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={15} /> Upload
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleUpload} />
        </>
      } />

      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.searchBox}>
            <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, fontSize: 13, color: 'var(--text-primary)' }}
            />
          </div>

          <div className={styles.filterList}>
            <div className={styles.filterLabel}>Filter</div>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterItem} ${filter === f ? styles.filterItemActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className={styles.filterCount}>
                  {f === 'All' ? media.length :
                   f === 'Images' ? media.filter(m => m.type === 'image').length :
                   f === 'Videos' ? media.filter(m => m.type === 'video').length :
                   media.filter(m => m.platform === f.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.storageCard}>
            <div className={styles.storageLabel}>Storage used</div>
            <div className={styles.storageBar}><div className={styles.storageBarFill} style={{ width: '62%' }} /></div>
            <div className={styles.storageText}>6.2 GB of 10 GB</div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.gridHeader}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{filtered.length} files</span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🖼️</div>
              <div className="empty-state-title">No files found</div>
              <div className="empty-state-desc">Try a different search or upload new media.</div>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(item => (
                <div
                  key={item.id}
                  className={`${styles.gridItem} ${selected?.id === item.id ? styles.gridItemSelected : ''}`}
                  onClick={() => setSelected(selected?.id === item.id ? null : item)}
                >
                  <div className={styles.gridThumb} style={{ background: item.color }}>
                    <span style={{ fontSize: 32 }}>{item.emoji}</span>
                    {item.type === 'video' && <div className={styles.videoTag}>VIDEO</div>}
                  </div>
                  <div className={styles.gridInfo}>
                    <div className={styles.gridName}>{item.name}</div>
                    <div className={styles.gridMeta}>{item.size} · {item.uploaded}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>File info</span>
              <button className="modal-close" onClick={() => setSelected(null)}><X size={14} /></button>
            </div>
            <div className={styles.detailThumb} style={{ background: selected.color }}>
              <span style={{ fontSize: 48 }}>{selected.emoji}</span>
            </div>
            <div className={styles.detailName}>{selected.name}</div>
            <div className={styles.detailRows}>
              <div className={styles.detailRow}><span>Type</span><span>{selected.type}</span></div>
              <div className={styles.detailRow}><span>Size</span><span>{selected.size}</span></div>
              <div className={styles.detailRow}><span>Platform</span><PlatformPill platform={selected.platform} /></div>
              <div className={styles.detailRow}><span>Uploaded</span><span>{selected.uploaded}</span></div>
            </div>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 8, background: 'var(--peach-bg)', color: 'var(--peach)' }}
              onClick={() => { deleteMedia(selected.id); setSelected(null); }}>
              <Trash2 size={14} /> Delete file
            </button>
          </div>
        )}
      </div>
    </>
  );
}
