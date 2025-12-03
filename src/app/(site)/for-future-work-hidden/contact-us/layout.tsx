import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Pax River Property Management for professional property management services in Southern Maryland. Call (240) 661-3222 for HOA management, residential management, and rental property services.',
  keywords: [
    'contact property management',
    'property management Southern Maryland contact',
    'HOA management contact',
    'residential management contact',
    'Pax River Property Management contact',
    'property management phone number',
    'property management consultation',
    'property management quote',
    'property management services contact'
  ],
  openGraph: {
    title: 'Contact Us - Pax River Property Management LLC',
    description: 'Contact Pax River Property Management for professional property management services in Southern Maryland. Call (240) 661-3222 for HOA management, residential management, and rental property services.',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 80,
        alt: 'Contact Pax River Property Management',
      },
    ],
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
