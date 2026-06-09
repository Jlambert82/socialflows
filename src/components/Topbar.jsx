import { useApp } from '../context/AppContext';
import styles from './Topbar.module.css';

export default function Topbar({ title, actions }) {
  const { user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <header className={styles.topbar}>
      <div className={styles.title}>
        {title === 'overview' ? `${greeting}, ${user.name.split(' ')[0]} ✦` : title}
      </div>
      <div className={styles.actions}>
        {actions}
        <div className={styles.avatar} title={user.name}>{user.avatar}</div>
      </div>
    </header>
  );
}
