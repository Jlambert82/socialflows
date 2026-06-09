import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Topbar from '../components/Topbar';
import styles from './Team.module.css';

const ROLES = ['Admin', 'Editor', 'Viewer'];
const ROLE_COLORS = { Admin: 'var(--lavender)', Editor: 'var(--mint)', Viewer: 'var(--sky)' };
const ROLE_BG = { Admin: 'var(--lavender-bg)', Editor: 'var(--mint-bg)', Viewer: 'var(--sky-bg)' };

function InviteModal({ onClose, onInvite }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Editor' });
  const AVATAR_COLORS = ['#C4B5FD','#86EFAC','#FCA5A5','#93C5FD','#FDE68A'];

  const submit = () => {
    if (!form.name || !form.email) return;
    const initials = form.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    onInvite({
      ...form,
      avatar: initials,
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h2 className="modal-title">Invite team member</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="form-group">
          <label className="form-label">Full name</label>
          <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Role permissions:</strong><br />
          Admin — full access. Editor — create & schedule posts. Viewer — read only.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Send invite</button>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const { team, addTeamMember, removeTeamMember } = useApp();
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      <Topbar title="Team" actions={
        <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
          <Plus size={15} /> Invite member
        </button>
      } />

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Members <span className={styles.count}>{team.length}</span></div>
          </div>
          <div className={styles.memberList}>
            {team.map(member => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberAvatar} style={{ background: `${member.color}25`, color: member.color }}>
                  {member.avatar}
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberName}>{member.name}</div>
                  <div className={styles.memberEmail}>{member.email}</div>
                </div>
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: ROLE_BG[member.role], color: ROLE_COLORS[member.role],
                }}>{member.role}</span>
                <button
                  className="btn btn-ghost"
                  style={{ padding: '6px', color: 'var(--peach)' }}
                  onClick={() => removeTeamMember(member.id)}
                  title="Remove member"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Role permissions</div>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className={styles.permTable}>
              <thead>
                <tr>
                  <th>Permission</th>
                  {ROLES.map(r => <th key={r} style={{ color: ROLE_COLORS[r] }}>{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['View posts & analytics', true, true, true],
                  ['Create & edit posts',    true, true, false],
                  ['Schedule & publish',     true, true, false],
                  ['Manage media library',   true, true, false],
                  ['Invite team members',    true, false, false],
                  ['Connect accounts',       true, false, false],
                  ['Billing & settings',     true, false, false],
                ].map(([perm, ...vals]) => (
                  <tr key={perm}>
                    <td>{perm}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ textAlign: 'center' }}>
                        {v ? <span style={{ color: 'var(--mint)', fontSize: 16 }}>✓</span>
                           : <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} onInvite={addTeamMember} />}
    </>
  );
}
