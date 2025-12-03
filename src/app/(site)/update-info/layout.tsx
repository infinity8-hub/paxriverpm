import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Information',
  description: 'Update your contact information with Pax River Property Management. Keep your property owner details, tenant information, and contact preferences current for better communication and service.',
  keywords: [
    'update contact information',
    'property owner information',
    'tenant contact update',
    'property management contact update',
    'update personal information',
    'contact information change',
    'property management update',
    'owner information update',
    'tenant information update',
    'contact details update'
  ],
  openGraph: {
    title: 'Update Information - Pax River Property Management LLC',
    description: 'Update your contact information with Pax River Property Management. Keep your property owner details, tenant information, and contact preferences current.',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 80,
        alt: 'Update Information - Pax River Property Management',
      },
    ],
  },
};

export default function UpdateInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
