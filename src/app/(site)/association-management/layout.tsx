import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Association Management',
  description: 'Professional HOA and COA management services in Southern Maryland. Comprehensive association management including financial oversight, maintenance coordination, and resident communication for homeowners associations.',
  keywords: [
    'HOA management Southern Maryland',
    'COA management',
    'homeowners association management',
    'condo association management',
    'association management services',
    'HOA financial management',
    'property management HOA',
    'community association management',
    'HOA board support',
    'association maintenance management'
  ],
  openGraph: {
    title: 'Association Management - Pax River Property Management LLC',
    description: 'Professional HOA and COA management services in Southern Maryland. Comprehensive association management including financial oversight, maintenance coordination, and resident communication.',
    images: [
      {
        url: '/images/association1.jpg',
        width: 799,
        height: 100,
        alt: 'Association Management Services - Pax River Property Management',
      },
    ],
  },
};

export default function AssociationManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
