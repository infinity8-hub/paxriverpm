'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function ResidentLoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!remember) {
      toast.error('Please check "Remember me" to continue');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      toast.success('Login successful (dummy message)');
      setEmail('');
      setPassword('');
      setRemember(false);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-100 overflow-y-auto">
      <Image
        src="/images/resident-login.jpg"
        alt="Resident Login Background"
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="flex min-h-screen flex-col justify-center items-center px-4">
        <div className="w-full max-w-[500px] rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-10">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Pax River Property Management LLC"
                width={420}
                height={90}
                priority
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </Link>
          </div>

          <h1 className="mt-6 text-center text-lg font-bold text-[#767676]">
            Resident Center
          </h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6 px-10">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#767676]">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border border-slate-300 text-sm bg-white px-3.5 py-2 text-[#767676] shadow-sm outline-none ring-0 placeholder:text-[#767676] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                placeholder="Type your email..."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#767676]">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 pr-12 text-sm text-[#767676] shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                  placeholder="Type your password..."
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 mr-2 grid place-items-center rounded-md px-3 text-slate-500 hover:text-[#767676] focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                >
                  {showPwd ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-[#767676]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#909090] font-medium focus:ring-primary-500"
                />
                Remember me
              </label>
              <Link href="/residental/forgot-password" className="text-sm text-[#909090] font-medium hover:text-primary-700 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full px-6 py-2 text-white bg-[#509CCF] hover:bg-primary-darkBlue transition-colors duration-300 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="pt-14 text-center text-xs text-[#909090]">
              Property manager, rental owner, or vendor?{' '}
              <Link href="/customer-login" className="font-semibold text-[#509CCF] hover:text-primary-darkBlue transition-colors duration-300 hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#909090]">
          By signing in you agree to Buildium&apos;s{' '}
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#909090]">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="https://www.buildium.com/resident-site-terms-of-service/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#909090]">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
