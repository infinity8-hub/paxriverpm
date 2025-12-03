import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Sent',
  description: 'Password reset email has been sent to your account. Check your email for instructions to reset your Pax River Property Management account password.',
  keywords: [
    'email sent',
    'password reset email',
    'reset instructions sent',
    'check email',
    'password reset confirmation',
    'email verification',
    'account recovery email',
    'reset password email',
    'password help email',
    'account access email'
  ],
  openGraph: {
    title: 'Email Sent - Pax River Property Management LLC',
    description: 'Password reset email has been sent to your account. Check your email for instructions to reset your Pax River Property Management account password.',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 80,
        alt: 'Email Sent - Pax River Property Management',
      },
    ],
  },
};

export default function EmailSentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
