'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { lusitanaTitle } from '@/app/fonts';

export default function AvailableUnitsAlert() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        localStorage.removeItem('hideAvailableUnitsAlert');
        if (pathname?.includes('available-units')) {
            setIsVisible(true);
        }
    }, [pathname]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hideAvailableUnitsAlert', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="mx-auto w-[70%] m-3 bg-white">
            <div className="bg-[#DFEBF1] border-l-[6px] border-l-[#A5CDE4] text-black px-3 py-2 flex justify-between items-start relative">
                <div>
                    <h2 className={`${lusitanaTitle.className} text-[27.2px] font-medium tracking-wide mb-[-10px]`}>
                        UNITS AVAILABLE FOR RENT
                    </h2>
                    <Link
                        href="/available-units"
                        className="mt-2 sm:mt-2 text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 font-bold text-[19.2px] block"
                    >
                        Click here for more information
                    </Link>
                </div>
                <button
                    onClick={handleClose}
                    className="text-primary-lightBlue text-lg font-bold leading-none hover:text-primary-darkBlue transition-colors duration-300"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
        </div>
    );
}