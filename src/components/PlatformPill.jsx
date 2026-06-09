import { PLATFORMS } from '../data/mockData';

export default function PlatformPill({ platform, size = 'sm' }) {
  const plat = PLATFORMS[platform];
  if (!plat) return null;
  const pad = size === 'sm' ? '2px 7px' : '4px 10px';
  const fs = size === 'sm' ? '10px' : '12px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: pad, borderRadius: 20, fontSize: fs, fontWeight: 600,
      background: plat.bg, color: plat.color, letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
    }}>
      {plat.name}
    </span>
  );
}
