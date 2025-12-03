import Image from 'next/image'
import Link from 'next/link'
import { lusitanaTitle, sourceSans } from '@/app/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pax River Property Management LLC - Southern Maryland Property Management',
  description: 'Welcome to Pax River Property Management LLC, your trusted partner in residential and homeowners\' association (HOA) management in Southern Maryland. Family-owned business serving St. Mary\'s, Charles, and Calvert Counties.',
  keywords: [
    'property management Southern Maryland',
    'HOA management St. Mary\'s County',
    'residential property management',
    'property management company Maryland',
    'homeowners association management',
    'Pax River Property Management',
    'property management Charles County',
    'property management Calvert County'
  ],
  openGraph: {
    title: 'Pax River Property Management LLC - Southern Maryland Property Management',
    description: 'Welcome to Pax River Property Management LLC, your trusted partner in residential and homeowners\' association (HOA) management in Southern Maryland.',
    images: [
      {
        url: '/images/home-hero.jpg',
        width: 1726,
        height: 343,
        alt: 'Southern Maryland landscape - Pax River Property Management',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div>
      <section>
        <div className="relative w-full h-[50vh] min-h-[300px]">
          <Image
            src="/images/home-hero.jpg"
            alt="Southern Maryland landscape"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="max-w-[90%] mx-auto px-7 sm:px-10 py-12 space-y-6 ">
        <h2
          className={`${lusitanaTitle.className} text-[32px] text-center text-primary-blackTitle font-medium mb-8 px-[33px]`}
        >
          Property Management in Southern Maryland
        </h2>

        <section className={`${sourceSans.className} mx-auto text-primary-lightBlack font-normal text-xl`}>
          <p className="mb-5 mt-1">
            Welcome to Pax River Property Management LLC, your trusted partner in residential and homeowners’ association (HOA) management. We take pride in being a family-owned business deeply dedicated to serving the unique needs of Southern Maryland and its vibrant communities. Our commitment to excellence is unwavering, and we’re here to transform your property management experience.
          </p>

          <h2 className={`${sourceSans.className} font-bold`}>
            Our Commitment to Excellence
          </h2>
          <p className="mb-5 mt-1">
            At Pax River PM, we understand that managing properties requires a delicate balance of expertise, personalized service, and open communication. Our mission is to provide you with the exceptional support and tailored solutions needed to achieve the highest standards of property management.
          </p>

          <h2 className={`${sourceSans.className} font-bold`}>A Local Touch</h2>
          <p className="mb-5 mt-1">
            Based in the heart of St. Mary’s County, we proudly serve all of Southern Maryland, including Charles and Calvert Counties. Our local expertise allows us to offer insights and solutions that are uniquely suited to our community’s needs. When you choose Pax River PM, you’re not just choosing a property management company; you’re selecting a partner who understands the intricacies of our area and is committed to its growth and prosperity.
          </p>

          <h2 className={`${sourceSans.className} font-bold`}>
            Specialists in Residential and Association Management
          </h2>
          <p className="mb-5 mt-1">
            We specialize in managing a diverse range of properties, including residential properties and condominium and homeowners’ associations (COAs/HOAs). Our{' '}
            <Link
              href="/residential-management/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 ease-in-out"
            >
              residential property management services
            </Link>{' '}
            encompass tenant placement, day-to-day operations, and property maintenance, whether you’re a local property owner or stationed halfway across the world. Additionally, we excel in{' '}
            <Link
              href="/association-management/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 ease-in-out"
            >
              condominium and homeowner associations
            </Link>
            , handling maintenance requests, violation reports, budgeting, financial reporting, association dues collection, and fostering effective communication with board members and residents alike.
          </p>

          <h2 className={`${sourceSans.className} font-bold`}>
            Effortless Communication
          </h2>
          <p className="mb-5 mt-1">
            Our commitment to transparency is unwavering. We provide a state-of-the-art resident and owner portal, accessible online or through the iOS/Android app store. This powerful tool simplifies communication, offering instant access to financial reports, accounts receivable, maintenance requests, and more. Stay connected and informed through your preferred communication method, be it mail, email, texts, or push notifications (available with the app).
          </p>

          <h2 className={`${sourceSans.className} font-bold`}>
            Your Customized Solution
          </h2>
          <p className="mb-5 mt-1">
            We understand that every property and community is unique, and so are your management requirements. Our services are fully customizable to align with your preferences. Whether you prefer hands-on involvement or a more hands-off approach, we adapt to your needs. With Pax River PM, you have the freedom to shape the level of engagement that suits your property or community best.{' '}
            <Link
              href="/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 ease-in-out"
            >
              Click here to contact us for a personalized quote!
            </Link>
          </p>

          <div className="text-xl font-bold">
            Let Pax River PM handle the stressful parts of owning a property. Give us a call at{' '}
            <a
              href="tel:+12406613222"
              className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 ease-in-out"
            >
              (240) 661-3222
            </a>{' '}
            or{' '}
            <Link
              href="/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300 ease-in-out"
            >
              contact us
            </Link>{' '}
            to learn more about our property management services in Southern Maryland.
          </div>
        </section>
      </section>
    </div>
  );
}