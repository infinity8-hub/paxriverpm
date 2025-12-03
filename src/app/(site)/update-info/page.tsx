"use client";

import Link from "next/link";
import { lusitanaTitle, sourceSans } from "@/app/fonts";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UpdateInfo() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isTenantOccupied, setIsTenantOccupied] = useState<string>("");

  const recomputeValidity = () => {
    const ok = formRef.current?.checkValidity() ?? false;
    setFormValid(ok);
  };

  useEffect(() => {
    recomputeValidity();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) {
      toast.error("Please complete the form.", {
        position: "top-right",
        autoClose: 2200,
      });
      return;
    }

    const formEl = formRef.current;
    const formData = new FormData(formEl ?? undefined);
    const payload = Object.fromEntries(formData.entries());

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
    setSubmitting(false);
    setFormValid(false);
    setIsTenantOccupied("");
  };

  return (
    <div className="bg-gray-100 py-8">
      <h1
        className={`${lusitanaTitle.className} uppercase text-center text-[32px] mb-5`}
      >
        Update your information
      </h1>

      <div
        className={`max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 text-[19.2px] font-medium ${sourceSans.className}`}
      >
        <p className="mt-7">
          Please fill out the following form to ensure we have the most
          up-to-date contact info for yourself and your tenants.
        </p>
        <p className="mt-10">
          This information will not be made public and will be only used for
          informational purposes as deemed by the Board of Directors for your
          Community Association or the management team overseeing the management
          of your community. For more information please reference our
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-lightBlue hover:text-primary-darkBlue hover:underline"
          >
            &nbsp;privacy policy.
          </Link>
        </p>
      </div>

      <div className="max-w-[85%] mx-auto mt-10 px-7 sm:px-10 lg:px-9 font-semibold text-[19.2px]">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          onChange={recomputeValidity}
          onInput={recomputeValidity}
          className={`${sourceSans.className} space-y-6 w-full mx-auto mt-14`}
        >
          <div className="space-y-1">
            <label htmlFor="owner" className="block">
              Name of property owner(s) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="propertyAddress" className="block">
              Property address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="propertyAddress"
              name="propertyAddress"
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
            <p className="font-medium">
              This is the address of your property in the Community Association.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="mailingAddress" className="block">
              Mailing address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="mailingAddress"
              name="mailingAddress"
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
            <p className="font-medium">
              This is your mailing address. It may be the same as your property
              address.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
            <p className="font-medium">
              This email will be used to access your online portal in which you
              can pay your HOA dues and submit maintenance requests. It will
              also be used by the Board of Directors and the management team to
              send periodic updates on your Community Association and account
              information specific to your property.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block">
              Phone number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
            <p className="font-medium">
              This phone number will be used to contact you in case of
              emergency.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="additionalPhone" className="block">
              Additional phone number(s)
            </label>
            <input
              type="text"
              id="additionalPhone"
              name="additionalPhone"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            />
            <p className="font-medium">
              Please list any additional phone numbers that we can use to
              contact you (if applicable).
            </p>
          </div>

          <div className="space-y-2">
            <label className="block">
              Is this property occupied by a tenant?{" "}
              <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-col gap-3">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="occupied"
      value="Yes"
      required
      checked={isTenantOccupied === "Yes"}
      onChange={(e) => setIsTenantOccupied(e.target.value)}
      className="accent-primary-lightBlue"
    />
    Yes
  </label>
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="occupied"
      value="No"
      checked={isTenantOccupied === "No"}
      onChange={(e) => setIsTenantOccupied(e.target.value)}
      className="accent-primary-lightBlue"
    />
    No
  </label>
</div>

          </div>

          {isTenantOccupied === "Yes" && (
            <>
              <div className="space-y-1">
                <label htmlFor="tenantName" className="block">
                  Tenant name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="tenantName"
                  name="tenantName"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="tenantEmail" className="block">
                  Tenant email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="tenantEmail"
                  name="tenantEmail"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="tenantPhone" className="block">
                  Tenant phone number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="tenantPhone"
                  name="tenantPhone"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label htmlFor="tenantInfo" className="block">
              Tenant contact info (name, phone number and/or email)
            </label>
            <textarea
              id="tenantInfo"
              name="tenantInfo"
              rows={4}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 bg-white focus:outline-neutral-300 font-normal text-base"
            ></textarea>
          </div>

          <div className="flex justify-center py-6">
            <button
              type="submit"
              disabled={!formValid || submitting}
              className={`text-white text-lg px-6 py-2 rounded transition-colors duration-300 ${
                !formValid || submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-lightBlue hover:bg-primary-darkBlue"
              }`}
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
