'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvailableUnitsAlert from '@/components/AvailableUnitsAlert';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* <AvailableUnitsAlert /> */}
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}