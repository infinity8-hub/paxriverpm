import Link from 'next/link'
import Image from 'next/image'
import { FaPhoneAlt, FaClock } from 'react-icons/fa'
import { lusitanaTitle, sourceSans } from '@/app/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t-8 border-[#BFD9E9] mt-8 pt-7 text-sm">
      <div className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="text-center md:text-left">
          <h3 className={`${lusitanaTitle.className} mb-7 text-[23px]`}>Our Services</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/association-management" className={`${sourceSans.className} text-xl text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300`}>
                Association Management
              </Link>
            </li>
            <li>
              <Link href="/residential-management" className={`${sourceSans.className} text-xl text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300`}>
                Residential Management
              </Link>
            </li>
          </ul>
          <div className="mt-5">
            <h3 className={`${lusitanaTitle.className} mb-5 mt-10 text-[23px]`}>Online Portal</h3>
            <Link
              href="/login"
              className={`${sourceSans.className} inline-flex items-center gap-2 text-xl py-2 px-4 rounded text-white bg-primary-lightBlue hover:bg-primary-darkBlue transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faShareFromSquare} className="h-5 w-5" />
              Click here to login
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className={`${lusitanaTitle.className} mb-6 text-[23px]`}>Contact Us</h3>
          <ul className={`${sourceSans.className} space-y-3 text-xl text-primary-lightBlack transition-colors duration-300`}>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-primary-lightBlue text-[28px]" />
              <a href="tel:+12406613222" className="hover:text-primary-darkBlue transition-colors duration-300">
                (240) 661-3222
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-primary-lightBlue h-7 w-7" />
              <a href="mailto:info@paxriverpm.com" className="hover:text-primary-darkBlue transition-colors duration-300">
                info@paxriverpm.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <IoLocationSharp className="text-primary-lightBlue text-4xl -ml-1 mr-1" />
              P.O. Box 465 <br /> Leonardtown, MD 20650
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaClock className="mr-2 text-primary-lightBlue text-[28px]" />
              Monday - Friday <br /> 8:30am - 5:30pm
            </li>
          </ul>
        </div>

        <div className="text-center md:col-span-2 lg:col-span-1 md:flex md:justify-center lg:block md:text-center lg:text-left">
          <div className="inline-block">
            <h3 className={`${lusitanaTitle.className} mb-7 text-[23px]`}>Affiliations and Associations</h3>
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <Link href="https://www.narpm.org" target="_blank"
                rel="noopener noreferrer" >
                <Image
                  src="/images/NARPM_logo.gif"
                  alt="NARPM logo"
                  width={270}
                  height={80}
                  className="object-contain w-auto h-[82px]"
                />
              </Link>
              <Link href="https://smcchamber.com" target="_blank"
                rel="noopener noreferrer" >
                <Image
                  src="/images/SMCChamberLogo.png"
                  alt="SMCChamber logo"
                  width={270}
                  height={80}
                  className="object-contain w-auto h-[82px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 pb-16 text-center px-7">
        <p className={`${sourceSans.className} text-xl mb-10`}>Copyright © 2025 Pax River Property Management LLC</p>
        <Link href="/privacy-policy" className={`${sourceSans.className} text-xl text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 mb-10`}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
