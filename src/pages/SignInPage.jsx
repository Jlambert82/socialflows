import { SignIn } from '@clerk/clerk-react'
import { Zap } from 'lucide-react'
import styles from './SignInPage.module.css'

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Zap size={22} fill="#1a0a4a" color="#1a0a4a" />
          </div>
          <span className={styles.brandName}>SocialFlow</span>
        </div>
        <div className={styles.tagline}>
          <h1 className={styles.headline}>Your social media,<br />one place.</h1>
          <p className={styles.sub}>Schedule, analyze, and grow across Instagram, TikTok, Facebook, and YouTube — all from one beautiful dashboard.</p>
        </div>
        <div className={styles.features}>
          {[
            { icon: '✦', text: 'AI-powered caption & hashtag suggestions' },
            { icon: '📅', text: 'Full calendar scheduling across all platforms' },
            { icon: '📊', text: 'Deep analytics for every account' },
            { icon: '👥', text: 'Collaborate with your whole team' },
          ].map((f, i) => (
            <div key={i} className={styles.feature}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <span className={styles.featureText}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <SignIn
          routing="path"
          path="/sign-in"
          afterSignInUrl="/"
          appearance={{
            variables: {
              colorPrimary: '#C4B5FD',
              colorBackground: '#13131F',
              colorInputBackground: '#20203A',
              colorInputText: '#F0EFFF',
              colorText: '#F0EFFF',
              colorTextSecondary: 'rgba(255,255,255,0.55)',
              colorNeutral: '#F0EFFF',
              borderRadius: '10px',
              fontFamily: 'Inter, -apple-system, sans-serif',
            },
            elements: {
              card: {
                background: '#13131F',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'none',
              },
              headerTitle: { color: '#F0EFFF', fontWeight: 700 },
              headerSubtitle: { color: 'rgba(255,255,255,0.5)' },
              formButtonPrimary: {
                background: '#C4B5FD',
                color: '#1a0a4a',
                fontWeight: 600,
              },
              footerActionLink: { color: '#C4B5FD' },
              identityPreviewEditButton: { color: '#C4B5FD' },
              formFieldInput: {
                background: '#20203A',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F0EFFF',
              },
              dividerLine: { background: 'rgba(255,255,255,0.08)' },
              dividerText: { color: 'rgba(255,255,255,0.3)' },
              socialButtonsBlockButton: {
                background: '#20203A',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F0EFFF',
              },
            },
          }}
        />
      </div>
    </div>
  )
}
