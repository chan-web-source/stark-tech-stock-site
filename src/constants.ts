import { type SubItem, type LeftPanelMenuItem } from './components/@types/types'

export const BOOKMAKER_MAP: Record<number, string> = {

};

// Functions that return current language constants

export const GAME_MENU_ITEMS = [

];

export const LEFT_PANEL_SUB_ITEMS = [

];

export const LEFT_PANEL_LOGIN_SUB_ITEMS: SubItem[] = [
  { id: 'login', name: 'Login', path: 'login' },
  { id: 'register', name: 'Sign up', path: 'register' },
  { id: 'accountRecovery', name: 'Account Recovery', path: 'login' },
]

export const LEFT_PANEL_ACCOUNT_SUB_ITEMS: SubItem[] = [
  { id: 'profile', name: 'Profile', path: 'account' },
  { id: 'logout', name: 'Logout', path: '#' },
]

export const INFORMATION_MENU_ITEMS: LeftPanelMenuItem[] = [

];

export const LANGUAGE_OPTIONS: LeftPanelMenuItem[] = [
  { id: "en", name: "English", icon: "/img/languages/english.svg" },
  { id: "zh", name: "中文", icon: "/img/languages/chinese.svg" },
];

export const MAIN_MENU = [
  {
    id: 'news',
    label: '最新動態',
    sub: []
  },
  {
    id: 'health',
    label: '股票健診',
    sub: []
  },
  {
    id: 'finance',
    label: '財務報表',
    sub: [
      { id: 'monthly', label: '每月營收' },
      { id: 'eps', label: '每股盈餘' },
      { id: 'bvps', label: '每股淨值' },
      { id: 'pl', label: '損益表' },
      { id: 'assets', label: '總資產' },
      { id: 'liabilities', label: '負債和股東權益' },
      { id: 'cashflow', label: '現金流量表' },
      { id: 'policy', label: '股利政策' },
      { id: 'ebook', label: '電子書' },
    ]
  },
  {
    id: 'profit',
    label: '獲利能力',
    sub: []
  },
  {
    id: 'safe',
    label: '安全性分析',
    sub: []
  },
  {
    id: 'growth',
    label: '成長力分析',
    sub: []
  },
  {
    id: 'value',
    label: '價值評估',
    sub: []
  },
  {
    id: 'director',
    label: '董監與籌碼',
    sub: []
  },
  {
    id: 'key',
    label: '關鍵指標',
    sub: []
  },
  {
    id: 'product',
    label: '產品組合',
    sub: []
  },
];

export const FOOTER_DATA = {
  groups: [
    {
      name: '財報狗功能',
      items: [
        { label: '個股數據', name: 'stock-data', url: '#' },
        { label: '選股功能', name: 'stock-selection', url: '#' },
        { label: '大盤產業', name: 'industry-trend', url: '#' },
        { label: '個股比較', name: 'stock-comparison', url: '#' },
        { label: '美股列表', name: 'us-stock-list', url: '#' },
        { label: '財報狗編誌', name: 'feature-magazine', url: '#' },
      ],
    },
    {
      name: '付費加值',
      items: [{ label: '功能購買', name: 'purchase', url: '#' }],
    },
    {
      name: '客戶服務',
      items: [
        { label: '未收到驗證信', name: 'missing-verification', url: '#' },
        { label: '聯絡我們', name: 'contact-us', url: '#' },
        { label: '商業合作聯絡', name: 'business-inquiry', url: '#' },
        { label: '臉書粉絲團', name: 'facebook', url: '#' },
      ],
    },
    {
      name: '條款與聲明',
      items: [
        { label: '服務條款', name: 'terms-of-service', url: '#' },
        { label: '隱私權政策', name: 'privacy-policy', url: '#' },
        { label: '免責聲明', name: 'disclaimer', url: '#' },
      ],
    },
  ],
  sourceInfo: [
    '資料來源參考：公開資訊觀測站、台灣證券交易所、櫃檯買賣中心。',
    '本站提供之分析資料，僅供工具參考，不暗示買賣建議，本站對資訊正確、更新延誤或傳輸中斷不負任何責任；依本站資訊交易發生損失需自行負責，請謹慎評估與風險（財報狗免責聲明）。',
  ],
  copyright: '版權所有 © 2010 ~ 2025 財報狗資訊股份有限公司，統一編號： 53754983',
  note: '網站由財報狗團隊設計，法律顧問：永聯法律事務所',
};
