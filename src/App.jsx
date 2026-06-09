import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import Schedule from './pages/Schedule'
import Library from './pages/Library'
import Analytics from './pages/Analytics'
import Team from './pages/Team'
import Settings from './pages/Settings'
import SignInPage from './pages/SignInPage'
import './index.css'

function ProtectedLayout() {
  return (
    <>
      <SignedIn>
        <AppProvider>
          <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-base)' }}>
            <Sidebar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>
              <Routes>
                <Route path="/"          element={<Overview />} />
                <Route path="/schedule"  element={<Schedule />} />
                <Route path="/library"   element={<Library />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/team"      element={<Team />} />
                <Route path="/settings"  element={<Settings />} />
                <Route path="*"          element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </AppProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/*"         element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
