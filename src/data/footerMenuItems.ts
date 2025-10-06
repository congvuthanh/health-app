/**
 * Footer Menu Items Data
 *
 * Static data for footer navigation items.
 */

// Types
export interface FooterNavItem {
  id: string;
  label: string;
  href: string;
}

/**
 * Footer navigation items displayed at the bottom of all pages
 * Contains links to registration, company info, legal documents, and contact
 */
export const footerNavItems: FooterNavItem[] = [
  {
    id: 'member-registration',
    label: '会員登録',
    href: '#',
  },
  {
    id: 'operating-company',
    label: '運営会社',
    href: '#',
  },
  {
    id: 'terms-of-service',
    label: '利用規約',
    href: '#',
  },
  {
    id: 'privacy-policy',
    label: '個人情報の取扱について',
    href: '#',
  },
  {
    id: 'commercial-transaction-act',
    label: '特定商取引法に基づく表記',
    href: '#',
  },
  {
    id: 'contact',
    label: 'お問い合わせ',
    href: '#',
  },
];
