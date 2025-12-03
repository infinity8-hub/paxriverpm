import Image from 'next/image'
import Link from 'next/link'
import { lusitanaTitle, sourceSans } from '@/app/fonts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Access your Pax River Property Management online portal. Login to make payments, submit maintenance requests, report violations, and communicate with your community. Available on iOS, Android, and web.',
  keywords: [
    'property management portal login',
    'HOA portal access',
    'resident portal login',
    'property management online portal',
    'tenant portal login',
    'property management app',
    'online property management',
    'resident login portal',
    'property management software',
    'tenant portal access'
  ],
  openGraph: {
    title: 'Login - Pax River Property Management LLC',
    description: 'Access your Pax River Property Management online portal. Login to make payments, submit maintenance requests, report violations, and communicate with your community.',
    images: [
      {
        url: '/images/portal-side.png',
        width: 199,
        height: 100,
        alt: 'Pax River Property Management Portal Login',
      },
    ],
  },
};

export default function LoginPage() {
  return (
    <div className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 py-8">
      <h1 className={`${lusitanaTitle.className} text-primary-blackTitle text-center text-[32px] font-serif font-medium mb-2`}>
        LOGIN TO OUR ONLINE PORTAL
      </h1>

      <p className={`${sourceSans.className} text-primary-lightBlack my-6 text-[19.2px]`}>
        Pax River Property Management provides you with an online portal to make payments on your account, open maintenance tickets,
        report violations, communicate with your community, and more! Login below to get started.
      </p>

      <div className="grid justify-items-center grid-cols-1 lg:grid-cols-1 gap-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-8">
          <div className="text-center lg:text-left">
            <h2 className={`${lusitanaTitle.className} text-primary-blackTitle text-[23px] font-serif font-medium`}>
              RESIDENT LOGIN:
            </h2>
            <p className={`${sourceSans.className} text-primary-lightBlack text-[19.2px]`}>
              (for tenants and HOA/COA owners)
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/resident-login"
              className={`${sourceSans.className} inline-flex items-center gap-2 text-xl py-3 px-5 rounded text-white bg-primary-lightBlue hover:bg-primary-darkBlue transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faShareFromSquare} className="h-5 w-5" />
              Click here to login
            </Link>
          </div>

          <div className="flex justify-center">
            <Link
              href="https://apps.apple.com/us/app/resident-center/id1466854902"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/apple.png"
                alt="Download on the App Store"
                width={270}
                height={80}
                className="h-[56px] w-auto object-contain"
              />
            </Link>

          </div>

          <div className="flex justify-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.buildium.resident.android"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/android.png"
                alt="Get it on Google Play"
                width={270}
                height={80}
                className="h-[56px] w-auto object-contain"
              />
            </Link>
          </div>
        </section>
      </div>
      <div className="mt-14 justify-items-center grid grid-cols-1 lg:grid-cols-1 gap-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-8">
          <div className="text-center lg:text-left">
            <h2 className={`${lusitanaTitle.className} text-primary-blackTitle text-[23px] font-serif font-medium`}>
              RESIDENT LOGIN:
            </h2>
            <p className={`${sourceSans.className} text-primary-lightBlack text-[19.2px]`}>
              (for tenants and HOA/COA owners)
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/customer-login"
              className={`${sourceSans.className} inline-flex items-center gap-2 text-xl py-3 px-5 rounded text-white bg-primary-lightBlue hover:bg-primary-darkBlue transition-colors duration-300`}
            >
              <FontAwesomeIcon icon={faShareFromSquare} className="h-5 w-5" />
              Click here to login
            </Link>
          </div>

          <div className="flex justify-center">
            <Link
              href="https://apps.apple.com/us/app/buildium/id1288105237"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/apple.png"
                alt="Download on the App Store"
                width={270}
                height={80}
                className="h-[56px] w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex justify-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.buildium.android"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/android.png"
                alt="Get it on Google Play"
                width={270}
                height={80}
                className="h-[56px] w-auto object-contain"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
