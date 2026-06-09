import { useState } from 'react';
import { Plus, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PLATFORMS } from '../data/mockData';
import Topbar from '../components/Topbar';
import PlatformPill from '../components/PlatformPill';
import styles from './Settings.module.css';

function ConnectModal({ onClose, onConnect }) {
  const [step, setStep] = useState('pick');
  const [platform, setPlatform] = useState(null);
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const simulate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    await new Promise(r => setTimeout(r, 800));
    onConnect({ platform, handle: handle || `@account_${Date.now().toString().slice(-4)}`, followers: '0', avatar: PLATFORMS[platform].icon });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h2 className="modal-title">Connect account</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        {step === 'pick' && (
          <>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              Choose a platform to connect. You'll be redirected to authorize access.
            </div>
            <div className={styles.platformGrid}>
              {Object.entries(PLATFORMS).map(([k, v]) => (
                <button
                  key={k}
                  className={`${styles.platformCard} ${platform === k ? styles.platformCardActive : ''}`}
                  style={platform === k ? { borderColor: v.color, background: v.bg } : {}}
                  onClick={() => setPlatform(k)}
                >
                  <span style={{ fontSize: 24 }}>{v.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v.name}</span>
                  {platform === k && <Check size={14} style={{ color: v.color, position: 'absolute', top: 8, right: 8 }} />}
                </button>
              ))}
            </div>
            {platform && (
              <div style={{ marginTop: 16 }}>
                <div className="form-group">
                  <label className="form-label">Account handle (optional)</label>
                  <input type="text" placeholder={`@your${platform}handle`} value={handle} onChange={e => setHandle(e.target.value)} />
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" disabled={!platform} onClick={simulate}>
                {loading ? 'Connecting...' : done ? '✓ Connected!' : `Connect ${platform ? PLATFORMS[platform].name : ''}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Settings() {
  const { accounts, connectAccount, disconnectAccount } = useApp();
  const [showConnect, setShowConnect] = useState(false);

  return (
    <>
      <Topbar title="Settings" />
      <div className={styles.content}>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Connected accounts</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            Manage your connected social accounts. Real OAuth requires platform developer credentials.
          </div>
          <div className={styles.accountList}>
            {accounts.map(acc => {
              const plat = PLATFORMS[acc.platform];
              return (
                <div key={acc.id} className={styles.accountRow}>
                  <div className={styles.accountThumb} style={{ background: plat.bg, fontSize: 18 }}>
                    {acc.avatar}
                  </div>
                  <div className={styles.accountInfo}>
                    <div className={styles.accountHandle}>{acc.handle}</div>
                    <div style={{ display: 'flex', align: 'center', gap: 6, marginTop: 3 }}>
                      <PlatformPill platform={acc.platform} />
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{acc.followers} followers</span>
                    </div>
                  </div>
                  <div className={styles.statusDot} />
                  <button className="btn btn-ghost" style={{ padding: 6, color: 'var(--peach)' }} onClick={() => disconnectAccount(acc.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
            <button className={styles.addAccount} onClick={() => setShowConnect(true)}>
              <Plus size={16} /> Connect new account
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Workspace</div>
          <div className="card">
            <div className={styles.settingRow}>
              <div><div className={styles.settingLabel}>Workspace name</div><div className={styles.settingDesc}>Shown to all team members</div></div>
              <input type="text" defaultValue="My Brand" style={{ width: 200 }} />
            </div>
            <div className={styles.settingRow}>
              <div><div className={styles.settingLabel}>Default timezone</div><div className={styles.settingDesc}>Used for scheduling posts</div></div>
              <select style={{ width: 200 }}>
                <option>America/Chicago</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
                <option>Europe/Paris</option>
              </select>
            </div>
            <div className={styles.settingRow} style={{ border: 'none', paddingBottom: 0 }}>
              <div><div className={styles.settingLabel}>AI suggestions</div><div className={styles.settingDesc}>Enable AI-powered caption and hashtag suggestions</div></div>
              <div className={styles.toggle} style={{ background: 'var(--lavender)' }}>
                <div className={styles.toggleKnob} style={{ left: '50%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Danger zone</div>
          <div className="card" style={{ borderColor: 'rgba(252,165,165,0.2)' }}>
            <div className={styles.settingRow} style={{ border: 'none', paddingBottom: 0 }}>
              <div>
                <div className={styles.settingLabel} style={{ color: 'var(--peach)' }}>Delete workspace</div>
                <div className={styles.settingDesc}>This action cannot be undone. All data will be permanently removed.</div>
              </div>
              <button className="btn" style={{ background: 'var(--peach-bg)', color: 'var(--peach)' }}>Delete workspace</button>
            </div>
          </div>
        </div>

      </div>
      {showConnect && <ConnectModal onClose={() => setShowConnect(false)} onConnect={connectAccount} />}
    </>
  );
}
