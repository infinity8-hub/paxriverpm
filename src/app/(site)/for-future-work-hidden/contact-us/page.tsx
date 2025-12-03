'use client';

import Link from 'next/link';
import { lusitanaTitle, sourceSans } from '@/app/fonts';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const HCaptcha = dynamic(() => import('@hcaptcha/react-hcaptcha'), { ssr: false });

declare global {
  var __NEXT_HCAPTCHA_NONCE__: number | undefined;
}
if (process.env.NODE_ENV !== 'production') {
  globalThis.__NEXT_HCAPTCHA_NONCE__ = (globalThis.__NEXT_HCAPTCHA_NONCE__ ?? 0) + 1;
}
const DEV_NONCE = globalThis.__NEXT_HCAPTCHA_NONCE__ ?? 0;

export default function ContactUs() {
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
      toast.error('Please complete the form and captcha.', { position: 'top-right', autoClose: 2200 });
      return;
    }

    const formEl = formRef.current;
    const formData = new FormData(formEl ?? undefined);
    const payload = {
      name: (formData.get('name') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      reason: (formData.get('reason') as string) ?? '',
      address: (formData.get('address') as string) ?? '',
      message: (formData.get('message') as string) ?? '',
      token: captchaToken,
    };

    setSubmitting(true);
    const toastId = toast.loading('Processing your request…', { position: 'top-right' });
    await new Promise((r) => setTimeout(r, 1200));
    toast.update(toastId, { render: 'Data submitted successfully (demo).', type: 'success', isLoading: false, autoClose: 2500, position: 'top-right' });

    formRef.current?.reset();
    setCaptchaToken(null);
    setCaptchaKey((k) => k + 1);
    setSubmitting(false);
    setFormValid(false);
    // console.log(payload);
  };

  return (
    <div className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 py-8">

      <h1 className={`${lusitanaTitle.className} text-primary-blackTitle text-center text-[32px] font-serif font-medium mb-2`}>
        CONTACT US
      </h1>

      <div className={`${sourceSans.className} text-primary-lightBlack text-center mb-9 text-[18.6px] font-semibold`}>
        <p>Call us at (240) 661-3222 or fill out the form below if you have any questions. We're here to help you!</p>
        <p className="mt-3">
          If you'd like to request a proposal for association management, please{' '}
          <Link href="/association-management" className="text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300">
            click here
          </Link>.
        </p>
      </div>

      <div className="max-w-[85%] mx-auto">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          onChange={recomputeValidity}
          onInput={recomputeValidity}
          className={`${sourceSans.className} text-[17.6px] space-y-4`}
          noValidate={false}
        >
          <div>
            <label htmlFor="name" className="block font-normal">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              name="name"
              id="name"
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              inputMode="email"
              className="w-full border border-gray-300 rounded-sm px-3 py-2"
              suppressHydrationWarning
            />
          </div>

          <div>
            <span className="block font-medium mb-1">
              Why are you contacting us? <span className="text-red-600">*</span>
            </span>
            <div className="space-y-2 ml-3">
              <label className="flex items-center space-x-2">
                <input type="radio" name="reason" value="association" required className="text-blue-600" suppressHydrationWarning />
                <span>Association management</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="reason" value="residential" required className="text-blue-600" suppressHydrationWarning />
                <span>Residential/rental management</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="reason" value="maintenance" required className="text-blue-600" suppressHydrationWarning />
                <span>Maintenance request</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="reason" value="other" required className="text-blue-600" suppressHydrationWarning />
                <span>Other</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block font-medium">Property address</label>
            <input
              name="address"
              id="address"
              className="w-full border border-gray-300 rounded-sm px-3 py-2"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2"
              suppressHydrationWarning
            />
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
                  toast.error('Captcha error. Please try again.', { position: 'top-right' });
                }}
              />
            </div>
          </div>

          <div className="flex justify-center py-6">
            <button
              type="submit"
              disabled={!formValid || !captchaToken || submitting}
              className={`text-white text-lg px-6 py-2 rounded transition-colors duration-300 ${!formValid || !captchaToken || submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-lightBlue hover:bg-primary-darkBlue'
                }`}
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}