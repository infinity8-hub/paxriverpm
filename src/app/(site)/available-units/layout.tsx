import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Available Units',
  description: 'Browse available rental properties in Southern Maryland. Find your perfect home with our comprehensive property listings including homes, apartments, and townhomes. Filter by location, price, and amenities.',
  keywords: [
    'available rental properties',
    'rental listings Southern Maryland',
    'apartment rentals Maryland',
    'home rentals St. Mary\'s County',
    'rental property search',
    'available rentals Charles County',
    'rental properties Calvert County',
    'property listings Maryland',
    'rental homes Southern Maryland',
    'apartment search Maryland'
  ],
  openGraph: {
    title: 'Available Units - Pax River Property Management LLC',
    description: 'Browse available rental properties in Southern Maryland. Find your perfect home with our comprehensive property listings including homes, apartments, and townhomes.',
    images: [
      {
        url: '/images/rental1.jpg',
        width: 799,
        height: 100,
        alt: 'Available Rental Properties - Pax River Property Management',
      },
    ],
  },
};

export default function AvailableUnitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
