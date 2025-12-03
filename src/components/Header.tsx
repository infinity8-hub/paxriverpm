'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="shadow-sm border-b-[3px] border-[#BFD9E9]">
      <nav className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-3 xl:px-9">
        <div className="flex justify-between items-center h-[90px] sm:h-[100px] lg:h-[123px]">
          {/* <div className="flex-shrink-0"> */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Pax River Property Management LLC"
                width={400}
                height={80}
                className="xl:h-24 sm:h-20 h-14 w-auto"
                priority
              />
            </Link>
          {/* </div> */}

          <div className="hidden lg:block">
            <div className="ml-10 lg:ml-3 xl:ml-8 flex items-baseline xl:gap-x-5 lg:gap-x-3 gap-x-2">
              <Link
                href="/residential-management"
                className="text-black hover:text-primary-lightBlue py-2 xl:text-lg text-base font-medium transition-colors duration-300"
              >
                Residential Management
              </Link>
              <Link
                href="/association-management"
                className="text-black hover:text-primary-lightBlue py-2 xl:text-lg text-base font-medium transition-colors duration-300"
              >
                Association Management
              </Link>
              <Link
                href="/contact-us"
                className="text-black hover:text-primary-lightBlue py-2 xl:text-lg text-base font-medium transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link
                href="/login"
                className="bg-primary text-white hover:bg-primary-darkBlue py-2 px-3 rounded-sm xl:text-lg text-base font-medium transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="lg:hidden pb-[10px]">
            <button onClick={toggleMenu} className="relative">
              <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isMenuOpen ? 'translate-x-10' : ''
                    }`}></div>
                  <div className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 ${isMenuOpen ? 'translate-x-10' : ''
                    }`}></div>
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 ${isMenuOpen ? 'translate-x-10' : ''
                    }`}></div>
                  <div className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 flex ${isMenuOpen ? 'translate-x-0 w-12' : '-translate-x-10 w-0'
                    }`}>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${isMenuOpen ? 'rotate-45' : 'rotate-0'
                      }`}></div>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${isMenuOpen ? '-rotate-45' : 'rotate-0'
                      }`}></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] mb-5' : 'max-h-0'
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/residential-management"
              className="text-black hover:text-primary-lightBlue hover:bg-gray-100 block mx-3 px-3 py-2 text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Residential Management
            </Link>
            <Link
              href="/association-management"
              className="text-black hover:text-primary-lightBlue hover:bg-gray-100 block mx-3 px-3 py-2 text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Association Management
            </Link>
            <Link
              href="/contact-us"
              className="text-black hover:text-primary-lightBlue hover:bg-gray-100 block mx-3 px-3 py-2 text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="bg-primary text-white hover:bg-primary-darkBlue block px-3 py-2 text-base font-medium rounded mx-3 mt-4 transition-colors duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;