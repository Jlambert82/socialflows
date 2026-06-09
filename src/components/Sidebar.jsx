import { NavLink } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { PLATFORMS } from '../data/mockData'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, Calendar, Image, BarChart2,
  Users, Settings, Zap, LogOut
} from 'lucide-react'
import styles from './Sidebar.module.css'

const NAV = [
  { to: '/',          icon: LayoutDashboard, label: 'Overview'      },
  { to: '/schedule',  icon: Calendar,        label: 'Schedule'      },
  { to: '/library',   icon: Image,           label: 'Media Library' },
  { to: '/analytics', icon: BarChart2,       label: 'Analytics'     },
]

const TEAM_NAV = [
  { to: '/team',     icon: Users,    label: 'Team'     },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { accounts } = useApp()
  const { user } = useUser()
  const { signOut } = useClerk()

  const platformCounts = Object.keys(PLATFORMS).reduce((acc, key) => {
    acc[key] = accounts.filter(a => a.platform === key).length
    return acc
  }, {})

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? '?'

  const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'User'
  const displayEmail = user?.emailAddresses?.[0]?.emailAddress ?? ''

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Zap size={16} fill="#1a0a4a" color="#1a0a4a" />
        </div>
        <span className={styles.logoText}>SocialFlow</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <span className={styles.navLabel}>Workspace</span>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className={styles.navSection}>
          <span className={styles.navLabel}>Team</span>
          {TEAM_NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className={styles.platforms}>
        <span className={styles.navLabel}>Connected</span>
        {Object.entries(PLATFORMS).map(([key, plat]) => (
          <div key={key} className={styles.platformRow}>
            <span className={styles.platDot} style={{ background: plat.color }} />
            <span className={styles.platName}>{plat.name}</span>
            <span className={styles.platBadge} style={{ background: plat.bg, color: plat.color }}>
              {platformCounts[key]}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.userRow}>
        {user?.imageUrl ? (
          <img src={user.imageUrl} className={styles.userAvatarImg} alt={displayName} />
        ) : (
          <div className={styles.userAvatar}>{initials}</div>
        )}
        <div className={styles.userInfo}>
          <div className={styles.userName}>{displayName}</div>
          <div className={styles.userRole}>{displayEmail}</div>
        </div>
        <button
          className={styles.signOut}
          onClick={() => signOut()}
          title="Sign out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  )
}
