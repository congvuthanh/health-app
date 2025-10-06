/**
 * Header Menu Items Data
 *
 * Static data for header navigation items and dropdown menu items.
 */

// Icons
import icChallenge from 'assets/icons/ic-challenge.svg';
import icFlag from 'assets/icons/ic-flag.svg';
import icInfo from 'assets/icons/ic-info.svg';
import icLogout from 'assets/icons/ic-logout.svg';
import icMemo from 'assets/icons/ic-memo.svg';
import icMeter from 'assets/icons/ic-meter.svg';
import icSettings from 'assets/icons/ic-settings.svg';
import icStories from 'assets/icons/ic-stories.svg';

// Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  link: string;
  badge?: number;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon: string;
  link?: string;
  action?: string; // Action identifier instead of function
}

/**
 * Primary navigation items displayed in the header
 * Visible on desktop, icons-only on mobile/tablet
 */
export const primaryNavItems: NavigationItem[] = [
  {
    id: 'my-records',
    label: '自分の記録',
    icon: icMemo,
    link: '/myPage',
  },
  {
    id: 'challenge',
    label: 'チャレンジ',
    icon: icChallenge,
    link: '#',
  },
  {
    id: 'notifications',
    label: 'お知らせ',
    icon: icInfo,
    link: '#',
    badge: 1, // TODO: This should be fetched from API or state management
  },
];

/**
 * Dropdown menu items displayed when hamburger menu is opened
 * Includes all navigation options and logout action
 */
export const dropdownMenuItems: DropdownItem[] = [
  {
    id: 'my-records-dropdown',
    label: '自分の記録',
    icon: icMemo,
    link: '#',
  },
  {
    id: 'challenge-dropdown',
    label: 'チャレンジ',
    icon: icChallenge,
    link: '#',
  },
  {
    id: 'goals',
    label: '目標',
    icon: icFlag,
    link: '#',
  },
  {
    id: 'current-course',
    label: '選択中のコース',
    icon: icMeter,
    link: '#',
  },
  {
    id: 'articles',
    label: 'コラム一覧',
    icon: icStories,
    link: '#',
  },
  {
    id: 'settings',
    label: '設定',
    icon: icSettings,
    link: '#',
  },
  {
    id: 'logout',
    label: 'ログアウト',
    icon: icLogout,
    action: 'logout', // Special action identifier
  },
];
