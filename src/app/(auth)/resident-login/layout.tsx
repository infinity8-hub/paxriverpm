import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resident Login',
  description: 'Resident login portal for Pax River Property Management. Access your tenant account to make payments, submit maintenance requests, and communicate with your community.',
  keywords: [
    'resident login',
    'tenant login',
    'resident portal',
    'tenant portal',
    'property management resident',
    'tenant account access',
    'resident dashboard',
    'tenant dashboard',
    'property management tenant',
    'resident access portal'
  ],
  openGraph: {
    title: 'Resident Login - Pax River Property Management LLC',
    description: 'Resident login portal for Pax River Property Management. Access your tenant account to make payments, submit maintenance requests, and communicate with your community.',
    images: [
      {
        url: '/images/resident-login.jpg',
        width: 800,
        height: 600,
        alt: 'Resident Login Portal - Pax River Property Management',
      },
    ],
  },
};

export default function ResidentLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
