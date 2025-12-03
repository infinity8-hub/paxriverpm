"use client";

import Image from "next/image";
import Link from "next/link";
import { lusitanaTitle, sourceSans } from "@/app/fonts";
import { FaCheck } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

const HCaptcha = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});

declare global {
  var __NEXT_HCAPTCHA_NONCE__: number | undefined;
}
if (process.env.NODE_ENV !== "production") {
  globalThis.__NEXT_HCAPTCHA_NONCE__ =
    (globalThis.__NEXT_HCAPTCHA_NONCE__ ?? 0) + 1;
}
const DEV_NONCE = globalThis.__NEXT_HCAPTCHA_NONCE__ ?? 0;

export default function AssociationManagement() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const recomputeValidity = () => {
    const ok = formRef.current?.checkValidity() ?? false;
    setFormValid(ok);
  };

  useEffect(() => {
    recomputeValidity();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken || !formValid) {
      toast.error("Please complete the form and captcha.", {
        position: "top-right",
        autoClose: 2200,
      });
      return;
    }

    const formEl = formRef.current;
    const formData = new FormData(formEl ?? undefined);
    const payload = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      reason: (formData.get("reason") as string) ?? "",
      address: (formData.get("address") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      token: captchaToken,
    };

    setSubmitting(true);
    const toastId = toast.loading("Processing your request…", {
      position: "top-right",
    });
    await new Promise((r) => setTimeout(r, 1200));
    toast.update(toastId, {
      render: "Data submitted successfully (demo).",
      type: "success",
      isLoading: false,
      autoClose: 2500,
      position: "top-right",
    });

    formRef.current?.reset();
    setCaptchaToken(null);
    setCaptchaKey((k) => k + 1);
    setSubmitting(false);
    setFormValid(false);
    // console.log(payload);
  };
  const images = [
    "/images/association1.jpg",
    "/images/association2.jpg",
    "/images/association3.jpg",
  ];
  const images1 = [
    "/images/association4.jpg",
    "/images/association5.jpg",
    "/images/association6.jpg",
  ];
  return (
    <div>
      <div className="bg-gray-100 py-8">
        <h1
          className={`${lusitanaTitle.className} uppercase text-center text-[32px] mb-5`}
        >
          Association Management
        </h1>
        <p className={`max-w-[90%] mx-auto text-[19.2px] ${sourceSans.className}`}>
          When entrusting your community's management to a professional company,
          you deserve the confidence that they will be both proactive and
          dedicated. At Pax River PM, we excel at overseeing every aspect of
          your HOA/COA, from resident communication to maintenance handling to
          board guidance. Let us handle the complexities of running your
          association, so you can enjoy peace of mind.
        </p>
        <p
          className={`max-w-[90%] mx-auto text-[19.2px] ${sourceSans.className} mt-4`}
        >
          We understand that every board has different preferences when it comes
          to involvement. That's why we customize our services to align with
          your needs. Whether you prefer a hands‑off approach, only being
          contacted for board approval, or desire regular updates on maintenance
          requests and financial matters, we're here to accommodate your
          preferences. We even offer the option of monthly meetings with board
          members to review completed tasks and discuss your association's
          objectives.
        </p>
        <p
          className={`max-w-[90%] mx-auto text-[19.2px] ${sourceSans.className} mt-4`}
        >
          Our{" "}
          <Link
            href="#proposal"
            className="text-primary-lightBlue hover:text-primary-darkBlue"
          >
            resident portal
          </Link>
          , accessible online or via our iOS/Android app, serves as a convenient
          one‑stop hub for all your association's requirements. Gain immediate
          access to financial reports, accounts receivable, delinquent accounts,
          vendor invoices, maintenance requests, violation notices, and more
          with ease.
        </p>
        <p
          className={`max-w-[90%] mx-auto text-[19.2px] ${sourceSans.className} mt-4`}
        >
          Ready to explore the tailored solutions Pax River PM can provide for
          your community?{" "}
          <Link
            href="#proposal"
            className="text-primary-lightBlue hover:text-primary-darkBlue"
          >
            Request a proposal
          </Link>{" "}
          today, or contact us at (240) 661‑3222 to learn how we can enhance
          your community management experience.
        </p>
      </div>
      {/* Row of townhouse images */}

      <section className="container mx-auto max-w-[90%] py-8 space-y-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-8">
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
        {/* Our Association Management Services */}
        <div>
          <h2
            className={`${lusitanaTitle.className} text-center text-3xl mb-4`}
          >
            Our Association Management Services
          </h2>
          <p className={`leading-7 text-[19.2px] ${sourceSans.className}`}>
            At Pax River PM, our comprehensive services are designed to elevate
            your community management experience. Contact us today to discover
            how we can transform the management of your property and enhance the
            quality of life within your association.
          </p>
          <div className="mt-4 space-y-6">
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Efficient Day‑to‑Day Management
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We excel in seamlessly managing day‑to‑day operations while
                keeping you well‑informed every step of the way. We act as a
                reliable point of contact for residents, alleviating the board's
                involvement in routine inquiries and concerns. Additionally, we
                take charge of coordinating and attending your association's
                annual meetings, ensuring residents are promptly notified. We
                provide monthly financial reports and annual budgets to ensure
                you always have a clear understanding of your community's
                financial health.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Seamless Communication for Your Community
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our online portal allows residents to submit maintenance
                requests and communicate directly with residents and fellow
                board members. Residents have the flexibility to choose their
                preferred communication method. This not only fosters community
                communication but also reduces unnecessary paper mail, saving on
                stationery costs. Additionally, we provide a message board
                feature to encourage residents to engage in discussions and
                actively participate in their community.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Expert Management of Accounts and Vendors
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our team expertly manages accounts payable and vendor contracts,
                ensuring vendors are paid promptly and that no unexpected costs
                are incurred. We periodically review contracts to guarantee you
                receive the most favorable terms and prices available in the
                market. Within our online portal, you can easily track every
                fee, deposit, check, and refund, providing you with a
                transparent overview of your association's finances.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Effortless HOA Dues Collection
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                We prioritize a seamless approach to HOA dues collection,
                offering residents flexible payment options. Whether residents
                prefer the traditional method of checks or the modern
                convenience of online autopay, our user‑friendly online portal
                accommodates their preferences. Additionally, we provide the
                flexibility to apply late fees, as per your association's
                bylaws, after a predefined grace period, reinforcing adherence
                to payment schedules within the community. In cases of
                delinquent accounts, our proactive approach includes timely
                notifications to account owners and, when necessary, initiating
                legal actions to recover outstanding balances.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Prompt and Efficient Maintenance Management
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our property maintenance services are designed to address the
                needs of your community promptly and efficiently. Residents can
                easily submit maintenance requests through our online portal,
                which we promptly resolve. For minor repairs, our in‑house
                maintenance team steps in, saving you both time and money. When
                larger projects arise, we source an unlimited number of quotes
                from multiple vendors for the board's review. We take charge of
                coordinating and overseeing all maintenance and repair work on
                your property’s common elements, ensuring that contractors
                deliver top‑notch results.
              </p>
            </div>
            <div>
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Proactive Property Care
              </h3>
              <p className={`text-[19.2px] ${sourceSans.className} leading-7`}>
                Our proactive approach includes monthly property visits to
                ensure there are no violations and that common elements are
                well‑maintained. We also provide recommendations for
                preventative maintenance to keep your property in excellent
                condition, reducing the likelihood of future issues.
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

        {/* Online portal benefits section */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-16 items-center">
          <div className="md:col-span-2 space-y-6">
            <h2
              className={`${lusitanaTitle.className} text-center text-3xl mb-4`}
            >
              Our online portal allows easy access to everything you need
            </h2>
            <p className={`text-[19.2px] ${sourceSans.className} leading-6`}>
              Accessible on iOS, Android, or any web browser, our online portal
              provides a user‑friendly and intuitive self‑service experience for
              unit owners and board members alike.
            </p>
            <div className="mt-8 space-y-2">
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Benefits for unit owners:
              </h3>
              <ul className="space-y-2">
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Securely make online payments for association fees from
                  anywhere. You can even set up automatic payments for
                  hassle‑free, on‑time payments.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Submit and track maintenance requests, including photo
                  attachments.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Communicate with other residents using our community message
                  board.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Stay informed with timely community announcements from the
                  Board. Receive updates via text messages, emails, or push
                  notifications.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  View association documents, such as meeting minutes and
                  bylaws, for easy reference.
                </li>
              </ul>
            </div>
            <div className="mt-8 space-y-3">
              <h3
                className={`text-xl mt-2 font-semibold ${sourceSans.className}`}
              >
                Benefits for board members:
              </h3>
              <ul className="space-y-2">
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Effortlessly communicate with your association by sending
                  announcements that reach all units.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Generate personalized reports for your community, including
                  income statements, delinquency rates, budget vs. actuals, and
                  more.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Access a comprehensive ledger containing all transaction
                  records for your association.
                </li>
                <li
                  className={`text-xl leading-6 flex items-center gap-3 ${sourceSans.className}`}
                >
                  <div>
                    <FaCheck size={16} className="text-primary-lightBlue" />
                  </div>
                  Monitor violations and maintenance requests and stay updated
                  on their status and resolutions.
                </li>
              </ul>
            </div>
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

        {/* Request A Proposal form */}
        <div id="proposal">
          <h2 className={`${lusitanaTitle.className} text-center text-3xl`}>
            Request A Proposal
          </h2>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            onChange={recomputeValidity}
            onInput={recomputeValidity}
            className={`${sourceSans.className} text-[17.6px] space-y-4 max-w-[90%] mx-auto mt-14`}
            noValidate={false}
          >
            <div className="space-y-1">
              <label htmlFor="name" className="block font-medium">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block font-medium">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="association" className="block font-medium">
                Name of association<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="association"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="location" className="block font-medium">
                Location of community (City, State)
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="homes" className="block font-medium">
                Number of homes / units / lots
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="homes"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="style" className="block font-medium">
                Community style (single family / apartment / condo / townhome /
                etc)
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="style"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="comments" className="block font-medium">
                Comments
              </label>
              <textarea
                id="comments"
                rows={4}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300"
              ></textarea>
            </div>
            <div className="flex justify-start">
              <div className="rounded-sm">
                <HCaptcha
                  key={`captcha-${DEV_NONCE}-${captchaKey}`}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY as string}
                  theme="light"
                  size="normal"
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    recomputeValidity();
                  }}
                  onExpire={() => {
                    setCaptchaToken(null);
                    recomputeValidity();
                  }}
                  onError={() => {
                    setCaptchaToken(null);
                    recomputeValidity();
                    toast.error("Captcha error. Please try again.", {
                      position: "top-right",
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center py-6">
              <button
                type="submit"
                disabled={!formValid || !captchaToken || submitting}
                className={`text-white text-lg px-6 py-2 rounded transition-colors duration-300 ${!formValid || !captchaToken || submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-lightBlue hover:bg-primary-darkBlue"
                  }`}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}