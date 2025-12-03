import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your customer account password for Pax River Property Management. Enter your email to receive password reset instructions.',
  keywords: [
    'forgot password',
    'password reset',
    'customer password reset',
    'account recovery',
    'password recovery',
    'reset password',
    'forgot login',
    'password help',
    'account access recovery',
    'customer password help'
  ],
  openGraph: {
    title: 'Forgot Password - Pax River Property Management LLC',
    description: 'Reset your customer account password for Pax River Property Management. Enter your email to receive password reset instructions.',
    images: [
      {
        url: '/images/customer-login.jpg',
        width: 800,
        height: 600,
        alt: 'Forgot Password - Pax River Property Management',
      },
    ],
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
