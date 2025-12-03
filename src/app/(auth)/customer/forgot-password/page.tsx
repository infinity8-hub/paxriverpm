'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function CustomerLogin() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!email) {
            toast.error('Please fill in both fields')
            setLoading(false)
            return
        }


        setTimeout(() => {
            toast.success('Password reset link has been sent to your email!')
            setLoading(false)
            setEmail('')
        }, 2000);

        setTimeout(() => {
            router.push('/customer-login')
        }, 3000);
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
                <h1 className="max-w-md text-4xl font-medium text-start text-white w-full">Forgot Password</h1>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-[#5C9266] text-white rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <Link href="/customer-login" className="text-sm  text-center font-medium text-primary-lightBlue hover:text-primary-darkBlue hover:underline">
                        Go back.
                    </Link>
                </div>
            </div>

        </div>
    )
}
