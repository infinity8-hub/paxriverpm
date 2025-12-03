import { lusitanaTitle, sourceSans } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Available Unit',
  description: 'Available rental property in Great Mills, MD. 3-level townhome with brand-new roof, luxury vinyl planks, and modern amenities. $2,350/month. 6 minutes from NAS Pax River. Apply now!',
  keywords: [
    'rental property Great Mills MD',
    'available rental Southern Maryland',
    'townhome rental NAS Pax River',
    'rental property St. Mary\'s County',
    'apartment rental Maryland',
    'rental home Great Mills',
    'property rental Southern Maryland',
    'rental application Maryland',
    'rental property near Pax River',
    'available rental property'
  ],
  openGraph: {
    title: 'Available Unit - Pax River Property Management LLC',
    description: 'Available rental property in Great Mills, MD. 3-level townhome with brand-new roof, luxury vinyl planks, and modern amenities. $2,350/month. 6 minutes from NAS Pax River.',
    images: [
      {
        url: '/images/rental1.jpg',
        width: 799,
        height: 100,
        alt: 'Available Rental Property in Great Mills, MD - Pax River Property Management',
      },
    ],
  },
};

export default function AvailableUnit() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2
          className={`${lusitanaTitle.className} uppercase text-center text-[32px] w-full mb-5 py-8 border-b-[3px] border-[#BFD9E9]`}
        >
          AVAILABLE FOR RENT
        </h2>
        <p className={`${lusitanaTitle.className} text-[30px] leading-[30px] text-center mt-5`}>
          45715 N Maxine Way <br /> Great Mills, MD 20634
        </p>
        <Link href="/rental-application" target="_blank" rel="noopener noreferrer" className="bg-primary-lightBlue hover:bg-primary-darkBlue text-white text-xl transition-colors duration-300 font-bold px-7 py-2 my-4 rounded">
          Click here to apply
        </Link>
      </div>

      <div className={`${sourceSans.className} max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 text-[19.2px] my-10`}>
        <p>
          <strong className="font-bold">Rent:</strong> $2,350/month
        </p>
        <p className="mt-5">
          <strong className="font-bold">Description:</strong> Welcome to your new home just minutes away from shopping and NAS Pax River! This lovely three-level townhome, boasting a brand-new roof installed in 2024, offers an abundance of space and thoughtful amenities. With freshly installed luxury vinyl planks and freshly painted walls throughout, the spacious living area provides a welcoming atmosphere. The master bathroom features a soaking tub for ultimate relaxation, while the sleek kitchen boasts a brand new refrigerator and an island perfect for meal prep. Step outside to the private patio, ideal for enjoying morning coffee or evening barbecues. With an attached one-car garage and additional driveway parking, this townhouse offers both convenience and luxury.
        </p>
        <p className="my-5">
          6 mins from Naval Air Station Patuxent River.
        </p>

        <p>
          <strong className="font-bold">Requirements:</strong> No smoking. Stable employment required. $45 nonrefundable application fee (per applicant).
        </p>
        <p className="my-5">
          <strong className="font-bold">Rent includes:</strong> Parking and Snow Removal
        </p>

        <p>
          <strong className="font-bold">Unit amenities:</strong> Air conditioner, Dishwasher, Disposal, Dryer, Microwave, Mirrors, Private sunroom, Refrigerator, Stove/Oven, Hardwood and carpet, Washer
        </p>
        <p className="my-5">
          <strong className="font-bold">Property amenities:</strong> Trash, Parking, Snow Removal
          (included in rent)
        </p>

        <h3 className="font-bold">Additional application details:</h3>
        <ul className="list-disc list-inside">
          <li>RENT: $2,350/month</li>
          <li>SECURITY DEPOSIT: $2,350</li>
          <li>
            ADDITIONAL FEES NOT INCLUDED IN RENT:
            <ul className="list-inside ml-6" style={{ listStyleType: 'circle' }}>
              <li>$45 Application Fee per applicant 18 or older (nonrefundable)</li>
              <li>Pet rent of $50/month per pet</li>
              <li>Pet deposit of $250</li>
            </ul>
          </li>
          <li>AVAILABLE DATE: 04/01/25</li>
          <li>
            LEASE LENGTH: 1–3 year leases accepted *Other terms, fees, and conditions may apply.
          </li>
        </ul>

        <p className="my-5">
          SMOKING: No Smoking Allowed in or on the Property
        </p>
        <p>
          INCOME REQUIREMENTS: Minimum Gross Income Requirement (before taxes) is 2 times the rental rate of the property you would like to rent.
        </p>
        <p className="my-5">
          CREDIT REQUIREMENTS: Minimum Credit Score of 600 is required for ALL financially responsible applicants. An applicant with a lower credit score of 550 for (ALL financially responsible applicants) or higher MAY be considered if the gross monthly income of the applicant is at least 3Xs the rental rate and the negative information on the credit report are not housing related.
        </p>
        <p>
          Common Reasons to be Declined but NOT ALL reasons to be declined are eviction filings, unpaid balances due to landlords, move-in date longer than 30 days out, credit score beneath the listing’s requirement, insufficient or unverifiable income, and unsatisfactory references.
        </p>
        <p className="my-5">
          Inability to pay the security deposit within 24 hours of acceptance, and recent bankruptcies. Unqualified occupants, pets, and/or vehicles can also be a reason for the decline.
        </p>
        <p>
          A Criminal background check will be conducted on each applicant. The criminal background check will take into account an individualized assessment of the applicant’s record related to any type of crime committed, the specific actions that resulted from the crime, how long ago the crime occurred, and how the individual’s circumstances may have changed since then.
        </p>
        <p className="my-5">
          *Other terms, fees, and conditions may apply.
        </p>

        <div className="text-center my-6">
          <Link href="/rental-application" target="_blank" rel="noopener noreferrer" className="bg-primary-lightBlue hover:bg-primary-darkBlue text-white text-xl transition-colors duration-300 font-bold px-7 py-2 mt-4 rounded">
            Click here to apply
          </Link>
        </div>
      </div>

      <div className="px-3">
        <h3 className={`${lusitanaTitle.className} text-center text-[30.4px] font-medium mt-14`}>
          Gallery
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mx-auto">
          {[
            '/images/rental/indoor-1.jpg',
            '/images/rental/indoor-2.jpg',
            '/images/rental/indoor-3.jpg',
            '/images/rental/indoor-4.jpg',
            '/images/rental/indoor-5.jpg',
          ]
            .slice(0, 5)
            .map((src, index) => (
              <div key={src} className="w-full">
                <Image
                  src={src}
                  alt={`Indoor image ${index + 1}`}
                  width={1000}
                  height={750}
                  className="w-full h-auto rounded-md object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 25vw"
                  priority={index === 0}
                />
              </div>
            ))}
        </div>

        <div className="h-[450px] bg-gray-100 mt-4">
          <iframe
            src="https://www.zillow.com/view-imx/08eeee39-40bf-49a6-ac6f-b88613c15516?setAttribution=mls&wl=true&initialViewType=pano&utm_source=dashboard"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <h3 className={`${lusitanaTitle.className} text-center text-[30.4px] font-medium mt-14`}>
          Location
        </h3>

        <div className="h-[420px] bg-gray-100 mt-4">
          <iframe
            src="https://maps.google.com/maps?q=45715%20N%20Maxine%20Way%2C%20Great%20Mills%2C%20MD%2020634&t=m&z=12&output=embed&iwloc=near"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center my-16">
        <Link href="/rental-application" target="_blank" rel="noopener noreferrer" className="bg-primary-lightBlue hover:bg-primary-darkBlue text-white text-xl transition-colors duration-300 font-bold px-7 py-2 mt-4 rounded">
          Click here to apply
        </Link>
      </div>
    </div>
  );
}
