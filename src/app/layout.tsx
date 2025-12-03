import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://paxriverpm.vercel.app'),
  title: {
    default: 'Pax River Property Management LLC',
    template: '%s - Pax River Property Management LLC'
  },
  description: 'Professional property management services in Southern Maryland. Residential and HOA management, tenant placement, and rental property services for St. Mary\'s, Charles, and Calvert Counties.',
  keywords: [
    'property management',
    'Southern Maryland',
    'HOA management',
    'residential management',
    'tenant placement',
    'rental management',
    'St. Mary\'s County',
    'Charles County',
    'Calvert County',
    'Pax River',
    'property management company',
    'homeowners association',
    'condo management',
    'rental property services'
  ],
  authors: [{ name: 'Pax River Property Management LLC LLC' }],
  creator: 'Pax River Property Management LLC LLC',
  publisher: 'Pax River Property Management LLC LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paxriverpm.vercel.app',
    siteName: 'Pax River Property Management LLC LLC',
    title: 'Pax River Property Management LLC - Professional Property Management in Southern Maryland',
    description: 'Professional property management services in Southern Maryland. Residential and HOA management, tenant placement, and rental property services.',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 80,
        alt: 'Pax River Property Management LLC Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pax River Property Management LLC - Professional Property Management in Southern Maryland',
    description: 'Professional property management services in Southern Maryland. Residential and HOA management, tenant placement, and rental property services.',
    images: ['/images/logo.png'],
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://paxriverpm.vercel.app',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        {children}
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}