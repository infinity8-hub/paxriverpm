import Image from "next/image";
import Link from "next/link";
import { lusitanaTitle, sourceSans } from "@/app/fonts";
import { FaCheck } from "react-icons/fa";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Residential Management',
  description: 'Professional residential property management services in Southern Maryland. Tenant placement, rental management, and property maintenance services for landlords and property owners in St. Mary\'s, Charles, and Calvert Counties.',
  keywords: [
    'residential property management',
    'tenant placement services',
    'rental property management',
    'property management Southern Maryland',
    'landlord services',
    'rental management company',
    'tenant screening',
    'property maintenance management',
    'rental property services',
    'property management St. Mary\'s County'
  ],
  openGraph: {
    title: 'Residential Management - Pax River Property Management LLC',
    description: 'Professional residential property management services in Southern Maryland. Tenant placement, rental management, and property maintenance services for landlords and property owners.',
    images: [
      {
        url: '/images/resident-1.jpg',
        width: 799,
        height: 100,
        alt: 'Residential Property Management Services - Pax River Property Management',
      },
    ],
  },
};

export default function ResidentialManagement() {
  const images = [
    "/images/resident-1.jpg",
    "/images/resident-2.jpg",
    "/images/resident-3.jpg",
  ];
  const images1 = [
    "/images/rental1.jpg",
    "/images/rental2.jpg",
    "/images/rental3.jpg",
  ];
  const images2 = [
    "/images/portal1.jpg",
    "/images/portal2.jpg",
    "/images/portal3.jpg",
  ];
  return (
    <div>
      <div className="bg-gray-100 py-8">
        <h1
          className={`${lusitanaTitle.className} uppercase text-center text-[32px] mb-5`}
        >
          Residential Management
        </h1>
        <p className="max-w-[90%] mx-auto text-[19.2px] ${sourceSans.className}">
          Discover the convenience and peace of mind that comes with Pax River
          PM's residential management services. Our dedicated team handles all
          aspects of residential property management, from tenant placement to
          day-to-day affairs. Whether you're a homeowner here in Maryland or
          stationed halfway across the world, we've got your back. Experience
          worry‑free property ownership and exceptional tenant care with Pax
          River PM.
        </p>
      </div>
      {/* Row of houses image */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 my-8 px-3">
        {images.map((src, i) => {
          let responsiveClasses = "";
          if (i === 0) {
            responsiveClasses = "block";
          } else if (i === 1) {
            responsiveClasses = "hidden md:block";
          } else if (i === 2) {
            responsiveClasses = "hidden lg:block";
          }
          return (
            <div key={i} className={`relative w-full h-[50vh] min-h-[300px] ${responsiveClasses}`}>
              <Image
                src={src}
                alt="Residential homes"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          );
        })}
      </div>
      <section className="container mx-auto max-w-[90%] py-8 space-y-10">
        {/* Tenant Placement Services */}
        <div>
          <h2
            className={`${lusitanaTitle.className} text-center text-3xl mb-4`}
          >
            Tenant Placement Services
          </h2>
          <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
            At Pax River PM, our tenant placement services are designed to
            simplify the rental process for property owners while ensuring the
            highest level of tenant quality. Let us help you secure reliable,
            responsible, and long‑term tenants for your investment property. Get
            started today and experience the Pax River PM advantage in tenant
            placement.
          </p>
          <p
            className={`text-xl mt-2 font-semibold text-center ${sourceSans.className}`}
          >
            Our tenant placement services start at 7% of the yearly rent.{" "}
            <Link
              href="/contact-us"
              className="text-primary-lightBlue hover:text-primary-darkBlue "
            >
              Contact us
            </Link>{" "}
            for a personalized quote.
          </p>
          <div className="mt-5 space-y-4">
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Swift and Efficient Marketing
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We prioritize efficiency to minimize vacancy periods and find
                suitable tenants quickly. Our proactive approach and
                comprehensive marketing strategies ensure prompt occupancy. To
                attract a wide pool of potential tenants, we employ professional
                advertising techniques. This includes high‑quality photography,
                property showings seven days a week, and an extensive online
                presence. We leverage major search engines, online classifieds,
                and off‑site marketing avenues to maximize exposure and attract
                qualified renters.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Professional Photography and Virtual Tours
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                To enhance the appeal of your property, we employ professional
                photography, 3D tours, and floorplan layouts. These immersive
                tools provide potential renters with a detailed virtual
                experience.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Thorough Tenant Screening
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Tenant quality is paramount to us. Our tenant screening process,
                powered by TransUnion, covers credit history, criminal
                background checks, and eviction history. We also conduct pet
                screening if applicable, ensuring reliable and compatible
                tenants.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Streamlined Security Deposit Handling
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our online portal allows tenants to submit security deposits
                conveniently through bank accounts or credit cards. We also
                offer the convenience of eSignatures, eliminating the need for
                physical paperwork.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Comprehensive Lease Drafting
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We take care of drafting the lease agreements, ensuring they are
                legally sound and tailored to your property's unique
                requirements. Our meticulous approach ensures clarity and
                compliance for both landlords and tenants.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Personalized Service
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We understand that each property is unique, and so are the needs
                of its owner. Our tenant placement services can be tailored to
                meet your specific requirements, providing flexible solutions
                that align with your property's distinct characteristics and
                your investment goals.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Competitive Pricing
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our tenant placement services are competitively priced, starting
                at just 7% of the annual rent.{" "}
                <Link
                  href="/contact-us"
                  className="text-primary-lightBlue hover:text-primary-darkBlue "
                >
                  Contact us
                </Link>{" "}
                today for a personalized quote and discover how we can assist
                you in finding the right tenant for your property.
              </p>
            </div>
          </div>
        </div>

        {/* Middle row of illustrative images */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 my-8">
          {images1.map((src, i) => {
            let responsiveClasses = "";
            if (i === 0) {
              responsiveClasses = "block";
            } else if (i === 1) {
              responsiveClasses = "hidden md:block";
            } else if (i === 2) {
              responsiveClasses = "hidden lg:block";
            }
            return (
              <div key={i} className={`relative w-full h-[50vh] min-h-[300px] ${responsiveClasses}`}>
                <Image
                  src={src}
                  alt="Rental homes"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            );
          })}
        </div>

        {/* Rental Management Services */}
        <div>
          <h2
            className={`${lusitanaTitle.className} text-center text-3xl mb-4`}
          >
            Rental Management Services
          </h2>
          <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
            When you have a rental property, you don't want to stress about
            dealing with any problems that might arise. Pax River Property
            Management will take care of everything, from rental payments to
            maintenance requests. We'll make sure your property remains in good
            shape.
          </p>
          <p
            className={`text-xl mt-2 font-semibold text-center ${sourceSans.className}`}
          >
            Our rental management services start at 9% of the monthly rent.{" "}
            <Link
              href="/contact-us"
              className="text-primary-lightBlue hover:text-primary-darkBlue"
            >
              Contact us
            </Link>{" "}
            for a personalized quote.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Tenant Relations and Communication
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We act as a dedicated point of contact for your tenants,
                providing prompt responses to their inquiries, requests, and
                concerns. Our proactive communication fosters positive tenant
                relations and encourages long‑term tenancies. We also provide
                tenants with access to a 24/7 emergency line to address urgent
                issues promptly.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Rent Collection and Financial Management
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our streamlined rent collection procedures offer tenants
                multiple payment options for their convenience. We handle
                security deposits, ensuring compliance with legal requirements,
                and provide you with transparent, detailed financial statements
                to keep you informed about your property's financial
                performance.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Property Maintenance and Repairs
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Preserving your property's value is paramount. Our team oversees
                all maintenance and repair tasks, from routine inspections to
                emergency repairs. We address issues promptly, ensuring tenant
                satisfaction and protecting your investment.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Legal Compliance and Eviction Management
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Navigating the complex legal landscape of rental management can
                be challenging. We ensure that your property remains in
                compliance with all applicable laws and regulations. In cases
                requiring eviction, we handle the process efficiently and
                professionally, safeguarding your interests.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Transparent Reporting and Technology Integration
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our online portal provides you with real‑time access to
                financial statements, lease agreements, and property maintenance
                updates. This transparency empowers you to stay informed about
                your property's performance effortlessly.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Personalized Service
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We understand that each property is unique, and so are the needs
                of its owner. Our tenant placement services can be tailored to
                meet your specific requirements, providing flexible solutions
                that align with your property's distinct characteristics and
                your investment goals.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Competitive Pricing
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our rental management services are competitively priced,
                starting at just 9% of the monthly rent.{" "}
                <Link
                  href="/contact-us"
                  className="text-primary-lightBlue hover:text-primary-darkBlue"
                >
                  Contact us
                </Link>{" "}
                for a personalized quote tailored to your property's
                requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Online portal section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 my-8">
          {images2.map((src, i) => {
            let responsiveClasses = "";
            if (i === 0) {
              responsiveClasses = "block";
            } else if (i === 1) {
              responsiveClasses = "hidden md:block";
            } else if (i === 2) {
              responsiveClasses = "hidden lg:block";
            }
            return (
              <div key={i} className={`relative w-full h-[50vh] min-h-[300px] ${responsiveClasses}`}>
                <Image
                  src={src}
                  alt="Portals"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-16 items-center">
          <div className="md:col-span-2 space-y-6">
            <h2
              className={`${lusitanaTitle.className} text-center text-3xl mb-4`}
            >
              Our online portal allows easy access to everything you need
            </h2>
            <p className={`text-[19.2px] ${sourceSans.className} leading-6`}>
              Our user‑friendly online portal ensures effortless access to all
              the tools you need for efficient property management. Available on
              Android, iOS, or any web browser, our sleek portal provides an
              intuitive self‑service experience for both property owners and
              tenants.
            </p>
            <ul className="space-y-2 mt-7">
              <li className={`text-[19.2px] ${sourceSans.className} leading-6 flex items-center gap-3`}>
                <div>
                  <FaCheck size={16} className="text-primary-lightBlue" />
                </div>
                Easily view your tenant's account details, keeping you informed
                about payments and balances.
              </li>
              <li className={`text-[19.2px] ${sourceSans.className} leading-6 flex items-center gap-3`}>
                <div>
                  <FaCheck size={16} className="text-primary-lightBlue" />
                </div>
                Stay organized with a streamlined system for tracking
                maintenance requests submitted by tenants. This feature even
                allows for photo attachments to provide clear information.
              </li>
              <li className={`text-[19.2px] ${sourceSans.className} leading-6 flex items-center gap-3`}>
                <div>
                  <FaCheck size={16} className="text-primary-lightBlue" />
                </div>
                Offer tenants the convenience of secure online rent and security
                deposit payments from any device. They can set up automatic
                payments for consistent, on‑time transactions.
              </li>
              <li className={`text-[19.2px] ${sourceSans.className} leading-6 flex items-center gap-3`}>
                <div>
                  <FaCheck size={16} className="text-primary-lightBlue" />
                </div>
                Access essential property reports, including monthly account
                statements, vendor invoices, and yearly 1099 forms. These
                reports provide a comprehensive overview of your property's
                financial performance.
              </li>
            </ul>
          </div>
          <div className="relative w-full h-[40vh] min-h-[200px]">
            <Image
              src="/images/portal-side.png"
              alt="Portals"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            /></div>
        </div>
      </section>
    </div>
  );
}
