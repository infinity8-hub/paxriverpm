import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Login',
  description: 'Customer login portal for Pax River Property Management. Access your account to manage payments, maintenance requests, and property information.',
  keywords: [
    'customer login',
    'property management login',
    'customer portal',
    'property management account',
    'customer access',
    'login portal',
    'property management customer',
    'account access',
    'customer dashboard',
    'property management login portal'
  ],
  openGraph: {
    title: 'Customer Login - Pax River Property Management LLC',
    description: 'Customer login portal for Pax River Property Management. Access your account to manage payments, maintenance requests, and property information.',
    images: [
      {
        url: '/images/customer-login.jpg',
        width: 800,
        height: 600,
        alt: 'Customer Login Portal - Pax River Property Management',
      },
    ],
  },
};

export default function CustomerLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
