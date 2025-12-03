'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function CustomerLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password) {
      toast.error('Please fill in both email and password fields')
      setLoading(false)
      return
    }

    if (!rememberMe) {
      toast.error('Please check "Remember my email" to continue')
      setLoading(false)
      return
    }

    setTimeout(() => {
      toast.success('Sign-in successful!')
      setLoading(false)
      setEmail('')
      setPassword('')
      setRememberMe(false)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen flex">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/customer-login.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full md:w-6/12 bg-[#153D58] text-white shadow-lg p-8 bg-opacity-90 min-h-screen flex flex-col justify-center items-center px-4">
        <h1 className="max-w-md text-4xl font-medium text-start text-white w-full">Sign in</h1>
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
          <div className="mb-8">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-[#A5A5A6]">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 h-5 w-5 bg-[#153D58] rounded-md border-2 border-white accent-[#5C9266]" 
              />
              Remember my email
            </label>
            <Link href="/customer/forgot-password" className="text-sm text-primary-lightBlue hover:text-primary-darkBlue hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#5C9266] text-white rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-white">OR</span>
          </div>

          <button
            type="button"
            className="w-full mt-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md  flex justify-center items-center"
          >
            <span className="mr-2">
              <Image
                src="/images/google-logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
            </span>
            <span className='text-sm font-medium text-gray-500 hover:text-green-600 transition-colors duration-300'>Sign in with Google</span>
          </button>

          <div className="mt-6 text-center">
            <span className="text-xs text-white">
              By signing in, you agree to Buildium's
              <Link target='_blank' rel='noopener noreferrer' href="https://www.buildium.com/terms-of-use" className="font-medium text-primary-lightBlue hover:text-primary-darkBlue hover:underline text-sm"> Terms of Use </Link>
              and
              <Link target='_blank' rel='noopener noreferrer' href="https://www.buildium.com/privacy-policy" className="font-medium text-primary-lightBlue hover:text-primary-darkBlue hover:underline text-sm"> Privacy Policy</Link>.
            </span>
          </div>
        </form>

        <div className="text-center">
          <span className='text-xs'>Are you looking for your Resident Center? </span>
          <Link href="/resident-login" className="text-sm font-medium text-primary-lightBlue hover:text-primary-darkBlue hover:underline">
            Sign in here.
          </Link>
        </div>
      </div>

    </div>
  )
}
