'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || 'johndoe@example.com'
    setEmail(storedEmail)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      toast.error('Please enter your email')
      setLoading(false)
      return
    }

    toast.success('Password reset instructions sent!')
    setTimeout(() => {
      router.push('/residental/email-sent')
    }, 1200)
  }

  const removeEmail = () => {
    localStorage.removeItem('email')
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
            Check your email
          </h1>
          <p className="pt-4 text-center text-sm px-10 text-[#909090]">
            An email with instructions to reset your password has been sent to <strong>{email}</strong>.
          </p>

          <p className="pt-4 text-center text-sm px-10 text-[#909090]">
            If you don't see an email within a few minutes, check your spam folder or try again.
          </p>

          <Link
            href="/resident-login"
            className="w-full text-[#509CCF] hover:text-primary-darkBlue transition-colors duration-300 text-xs font-semibold text-center hover:underline block mt-4"
            onClick={removeEmail}
          >
            <button
              type="submit"
              disabled={loading}
              className="mt-10 w-full max-w-[370px] rounded-full px-6 py-2 text-white bg-[#509CCF] hover:bg-primary-darkBlue transition-colors duration-300 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
            >
              Back to sign in
            </button>

          </Link>
        </div>
      </div>
    </div>
  )
}