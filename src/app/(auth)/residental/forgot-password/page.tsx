'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      toast.error('Please enter your email')
      setLoading(false)
      return
    }

    localStorage.setItem('email', email)
    setTimeout(() => {
      toast.success('Password reset instructions sent!')
      setEmail('');
      setLoading(false);
      router.push('/residental/email-sent')
    }, 3000)
  }

  return (
    <div className="relative min-h-screen overflow-y-auto">
      <Image
        src="/images/resident-login.jpg"
        alt="Resident Login Background"
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="flex min-h-screen flex-col justify-center items-center px-4">
        <div className="w-full max-w-[500px] rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 py-[80px]">
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
            Reset password
          </h1>
          <p className="pt-4 text-center text-sm px-10 text-[#909090]">
            Enter the email address associated with your account and we'll send you instructions to reset your password
          </p>
          <form onSubmit={handleSubmit} className="mt-6 px-10">
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
                className="mt-2 block w-full rounded-sm border border-slate-300 text-sm bg-white px-3.5 py-2 text-[#767676] shadow-sm outline-none ring-0 placeholder:text-[#767676] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                placeholder="Type your email..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-10 w-full rounded-full px-6 py-2 text-white bg-[#509CCF] hover:bg-primary-darkBlue transition-colors duration-300 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset instructions'}
            </button>

            <Link
              href="/resident-login"
              className="w-full text-[#509CCF] hover:text-primary-darkBlue transition-colors duration-300 text-xs font-semibold text-center hover:underline block mt-2"
            >
              Go back
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
