export const PLATFORMS = {
  instagram: { name: 'Instagram', color: '#C4B5FD', bg: 'rgba(196,181,253,0.12)', icon: '📸' },
  tiktok:    { name: 'TikTok',    color: '#FCA5A5', bg: 'rgba(252,165,165,0.12)', icon: '🎬' },
  facebook:  { name: 'Facebook',  color: '#93C5FD', bg: 'rgba(147,197,253,0.12)', icon: '📘' },
  youtube:   { name: 'YouTube',   color: '#86EFAC', bg: 'rgba(134,239,172,0.12)', icon: '▶️' },
};

export const ACCOUNTS = [
  { id: 'ig1', platform: 'instagram', handle: '@brand_main',    followers: '48.2K', avatar: '🌸' },
  { id: 'ig2', platform: 'instagram', handle: '@brand_stories', followers: '12.1K', avatar: '✨' },
  { id: 'ig3', platform: 'instagram', handle: '@brand_reels',   followers: '31.7K', avatar: '🎞️' },
  { id: 'tt1', platform: 'tiktok',    handle: '@brandofficial', followers: '94.3K', avatar: '🎵' },
  { id: 'tt2', platform: 'tiktok',    handle: '@brandbts',      followers: '22.0K', avatar: '🎬' },
  { id: 'fb1', platform: 'facebook',  handle: 'Brand Page',     followers: '105K',  avatar: '📘' },
  { id: 'fb2', platform: 'facebook',  handle: 'Brand Community',followers: '18.4K', avatar: '👥' },
  { id: 'yt1', platform: 'youtube',   handle: 'Brand Channel',  followers: '67.8K', avatar: '▶️' },
];

export const TEAM_MEMBERS = [
  { id: 't1', name: 'Alex Johnson', role: 'Admin',   email: 'alex@brand.com',   avatar: 'AJ', color: '#C4B5FD' },
  { id: 't2', name: 'Maria Santos', role: 'Editor',  email: 'maria@brand.com',  avatar: 'MS', color: '#86EFAC' },
  { id: 't3', name: 'James Lee',    role: 'Viewer',  email: 'james@brand.com',  avatar: 'JL', color: '#FCA5A5' },
  { id: 't4', name: 'Sara Kim',     role: 'Editor',  email: 'sara@brand.com',   avatar: 'SK', color: '#93C5FD' },
];

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();

export const SCHEDULED_POSTS = [
  { id: 'p1',  title: 'Summer collection drop 🌅',            platform: 'instagram', account: 'ig1', type: 'image',  status: 'scheduled', date: new Date(y, m, 9, 9, 0),   caption: 'Summer just got an upgrade. Meet the drop. ☀️ #summerdrops #newcollection', tags: ['#summer','#fashion','#newcollection'] },
  { id: 'p2',  title: 'Behind the scenes reel',               platform: 'tiktok',    account: 'tt1', type: 'video',  status: 'scheduled', date: new Date(y, m, 9, 14, 0),  caption: 'Ever wonder how we make magic? 🎬 #bts #behindthescenes', tags: ['#bts','#viral'] },
  { id: 'p3',  title: 'Packaging design tutorial',            platform: 'youtube',   account: 'yt1', type: 'video',  status: 'scheduled', date: new Date(y, m, 10, 11, 0), caption: 'In this week\'s tutorial we break down our entire packaging design process.', tags: ['#tutorial','#design'] },
  { id: 'p4',  title: 'Flash sale announcement',              platform: 'facebook',  account: 'fb1', type: 'image',  status: 'scheduled', date: new Date(y, m, 12, 8, 0),  caption: '48 hours only — everything 30% off. Shop now! 🔥', tags: ['#sale','#flash'] },
  { id: 'p5',  title: 'Customer spotlight feature',           platform: 'instagram', account: 'ig2', type: 'story',  status: 'scheduled', date: new Date(y, m, 14, 10, 0), caption: 'Meet @customer — her story inspired our latest collection 💛', tags: ['#community','#spotlight'] },
  { id: 'p6',  title: 'Product unboxing video',               platform: 'tiktok',    account: 'tt1', type: 'video',  status: 'scheduled', date: new Date(y, m, 16, 15, 0), caption: 'Unboxing the new arrivals 📦✨ Which one is your fave?', tags: ['#unboxing','#haul'] },
  { id: 'p7',  title: 'Weekly Q&A session',                   platform: 'instagram', account: 'ig1', type: 'reel',   status: 'scheduled', date: new Date(y, m, 17, 12, 0), caption: 'You asked, we answered! Swipe through for this week\'s Q&A 💬', tags: ['#qanda','#community'] },
  { id: 'p8',  title: 'Brand values post',                    platform: 'facebook',  account: 'fb2', type: 'image',  status: 'scheduled', date: new Date(y, m, 19, 9, 0),  caption: 'Three things we believe in: quality, sustainability, and you. 🌿', tags: ['#brandvalues','#sustainability'] },
  { id: 'p9',  title: 'How-to reel: style guide',             platform: 'instagram', account: 'ig3', type: 'reel',   status: 'draft',     date: new Date(y, m, 21, 11, 0), caption: 'Three ways to style our newest drop 👗 Comment your fave look!', tags: ['#style','#howto'] },
  { id: 'p10', title: 'Founder story documentary',            platform: 'youtube',   account: 'yt1', type: 'video',  status: 'scheduled', date: new Date(y, m, 23, 14, 0), caption: 'How it all started — the full story. Watch now.', tags: ['#founder','#documentary'] },
  { id: 'p11', title: 'New color palette reveal',             platform: 'tiktok',    account: 'tt2', type: 'video',  status: 'scheduled', date: new Date(y, m, 24, 17, 0), caption: 'Dropping a hint... 🎨 Which color is your fave? Comment below!', tags: ['#reveal','#color'] },
  { id: 'p12', title: 'Community milestone celebration',      platform: 'instagram', account: 'ig1', type: 'image',  status: 'published', date: new Date(y, m, 3, 9, 0),   caption: 'We hit 100K! Thank you for being part of this journey 🎉', tags: ['#milestone','#community'] },
  { id: 'p13', title: 'Weekly tip: morning routine',          platform: 'facebook',  account: 'fb1', type: 'image',  status: 'published', date: new Date(y, m, 5, 8, 0),   caption: 'Start your morning with intention. Here are 5 tips from our team 🌅', tags: ['#tips','#wellness'] },
  { id: 'p14', title: 'Product review compilation',           platform: 'youtube',   account: 'yt1', type: 'video',  status: 'published', date: new Date(y, m, 7, 12, 0),  caption: 'Real customers, real reviews. Watch what people are saying about our products.', tags: ['#reviews','#honest'] },
  { id: 'p15', title: 'End of month wrap-up',                 platform: 'instagram', account: 'ig1', type: 'story',  status: 'scheduled', date: new Date(y, m, 28, 18, 0), caption: 'June in review — our best moments ✨', tags: ['#recap','#june'] },
];

export const MEDIA_LIBRARY = [
  { id: 'm1',  name: 'summer-hero-shot.jpg',     type: 'image', size: '4.2 MB', platform: 'instagram', emoji: '🌅', color: 'rgba(196,181,253,0.15)', uploaded: '2 days ago' },
  { id: 'm2',  name: 'bts-reel-cut.mp4',         type: 'video', size: '128 MB', platform: 'tiktok',    emoji: '🎬', color: 'rgba(252,165,165,0.15)', uploaded: '3 days ago' },
  { id: 'm3',  name: 'packaging-tutorial.mp4',   type: 'video', size: '256 MB', platform: 'youtube',   emoji: '📦', color: 'rgba(134,239,172,0.15)', uploaded: '4 days ago' },
  { id: 'm4',  name: 'flash-sale-banner.png',    type: 'image', size: '2.1 MB', platform: 'facebook',  emoji: '🔥', color: 'rgba(147,197,253,0.15)', uploaded: '5 days ago' },
  { id: 'm5',  name: 'customer-story-01.jpg',    type: 'image', size: '3.8 MB', platform: 'instagram', emoji: '💛', color: 'rgba(253,230,138,0.15)', uploaded: '1 week ago' },
  { id: 'm6',  name: 'product-unbox.mp4',        type: 'video', size: '98 MB',  platform: 'tiktok',    emoji: '✨', color: 'rgba(252,165,165,0.15)', uploaded: '1 week ago' },
  { id: 'm7',  name: 'style-guide-reel.mp4',     type: 'video', size: '145 MB', platform: 'instagram', emoji: '👗', color: 'rgba(196,181,253,0.15)', uploaded: '1 week ago' },
  { id: 'm8',  name: 'founder-doc-raw.mp4',      type: 'video', size: '512 MB', platform: 'youtube',   emoji: '🎥', color: 'rgba(134,239,172,0.15)', uploaded: '2 weeks ago' },
  { id: 'm9',  name: 'color-reveal-clip.mp4',    type: 'video', size: '67 MB',  platform: 'tiktok',    emoji: '🎨', color: 'rgba(252,165,165,0.15)', uploaded: '2 weeks ago' },
  { id: 'm10', name: 'milestone-graphic.png',    type: 'image', size: '1.4 MB', platform: 'instagram', emoji: '🎉', color: 'rgba(196,181,253,0.15)', uploaded: '2 weeks ago' },
  { id: 'm11', name: 'morning-routine-shot.jpg', type: 'image', size: '5.1 MB', platform: 'facebook',  emoji: '🌿', color: 'rgba(147,197,253,0.15)', uploaded: '3 weeks ago' },
  { id: 'm12', name: 'product-review-cut.mp4',   type: 'video', size: '203 MB', platform: 'youtube',   emoji: '⭐', color: 'rgba(134,239,172,0.15)', uploaded: '3 weeks ago' },
];

export const ANALYTICS = {
  summary: {
    totalReach:    { value: '248K', change: '+12.4%', up: true },
    engagement:    { value: '5.8%', change: '+2.1%',  up: true },
    scheduled:     { value: '14',   change: '-3',      up: false },
    newFollowers:  { value: '+1.2K',change: '+8.7%',  up: true },
  },
  weeklyReach: [
    { day: 'Mon', instagram: 12000, tiktok: 8000,  facebook: 5000,  youtube: 9000  },
    { day: 'Tue', instagram: 18000, tiktok: 14000, facebook: 8000,  youtube: 6000  },
    { day: 'Wed', instagram: 15000, tiktok: 22000, facebook: 11000, youtube: 15000 },
    { day: 'Thu', instagram: 11000, tiktok: 9000,  facebook: 16000, youtube: 5000  },
    { day: 'Fri', instagram: 26000, tiktok: 18000, facebook: 13000, youtube: 20000 },
    { day: 'Sat', instagram: 20000, tiktok: 15000, facebook: 18000, youtube: 22000 },
    { day: 'Sun', instagram: 13000, tiktok: 11000, facebook: 8000,  youtube: 11000 },
  ],
  followerGrowth: [
    { month: 'Jan', total: 82000  },
    { month: 'Feb', total: 98000  },
    { month: 'Mar', total: 112000 },
    { month: 'Apr', total: 134000 },
    { month: 'May', total: 158000 },
    { month: 'Jun', total: 184000 },
  ],
  topPosts: [
    { title: 'Summer collection drop', platform: 'instagram', reach: '42K', engagement: '8.2%', emoji: '🌅' },
    { title: 'Behind the scenes reel', platform: 'tiktok',    reach: '38K', engagement: '11.4%', emoji: '🎬' },
    { title: 'Packaging tutorial',     platform: 'youtube',   reach: '29K', engagement: '6.8%', emoji: '📦' },
    { title: 'Flash sale post',        platform: 'facebook',  reach: '24K', engagement: '4.1%', emoji: '🔥' },
  ],
  platformBreakdown: [
    { platform: 'instagram', reach: 115000, pct: 46 },
    { platform: 'tiktok',    reach: 77000,  pct: 31 },
    { platform: 'youtube',   reach: 38000,  pct: 15 },
    { platform: 'facebook',  reach: 20000,  pct: 8  },
  ],
};

export const AI_SUGGESTIONS = [
  { id: 'ai1', icon: '⏰', color: 'var(--lavender)', text: 'Best time to post on Instagram today is 7:00–9:00 PM' },
  { id: 'ai2', icon: '#',  color: 'var(--mint)',     text: 'Add #summerdrops #newcollection for +18% estimated reach' },
  { id: 'ai3', icon: '💡', color: 'var(--yellow)',   text: 'Caption idea: "Summer just got an upgrade. Meet the drop."' },
  { id: 'ai4', icon: '📈', color: 'var(--peach)',    text: 'Your TikTok engagement peaks Wed & Fri — schedule a reel this week' },
  { id: 'ai5', icon: '🎯', color: 'var(--sky)',      text: 'Reels perform 3× better than static posts for your audience right now' },
];
