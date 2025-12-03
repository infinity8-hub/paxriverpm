'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

export default function ContactRightSection() {
    return (
        <div className="space-y-6 flex-1 lg:max-w-[38%]">
            <div className="w-full lg:max-w-[70%] lg:ml-auto mb-16">
                <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                    <Image
                        src="/images/contact-client.jpg"
                        alt="Professional woman on phone with laptop"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <Link 
                    href="/owner-resources" 
                    className="bg-primary-darkBlue p-4 flex items-center justify-between cursor-pointer hover:bg-primary-darkBlue hover:border-transparent transition-all duration-500 ease-in-out group"
                >
                    <span className="text-black text-xl italic font-medium">Unit Owner Resources</span>
                    <FaArrowRightLong className="text-black text-2xl group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
                </Link>
            </div>

            <div className="space-y-6 w-full lg:max-w-[70%] lg:ml-auto">
                <h3 className="text-black text-xl italic">
                    Offices
                </h3>

                <div className="space-y-3 pl-5">
                    <h4 className="text-black text-[22px]">
                        Corporate Office
                    </h4>
                    <p className="text-black text-sm leading-relaxed">
                        110 Old Padonia Rd. Suite 202<br />
                        Cockeysville, MD 21030
                    </p>
                    <div className="space-y-2 text-sm font-bold">
                        <div>
                            <span className="text-black">Phone: </span>
                            <a href="tel:+12406613222" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>
                            <a href="tel:+12406613222" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>
                        </div>
                        <div>
                            <span className="text-black">Fax: </span>
                            <a href="tel:+14102961289" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>
                            <a href="tel:+14105717725" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-400 !mt-8 !mb-8"></div>

                <div className="space-y-3 pl-5">
                    <h4 className="text-black text-[22px]">
                        Accounting Department
                    </h4>
                    <div className="space-y-2 text-sm font-bold">
                        <div>
                            <span className="text-black">Phone: </span>
                            <a href="tel:+12406613222" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>
                        </div>
                        <div>
                            <span className="text-black">Fax: </span>
                            <a href="tel:+14105717725" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors"><p>(240) 661-3222</p></a>

                            <a href="mailto:info@paxriverpm.com" className="text-[#c0e04c] font-bold hover:text-yellow-300 transition-colors">
                                info@paxriverpm.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-400 my-8"></div>

                <div className="space-y-3 pl-5">
                    <h4 className="text-black text-[22px]">
                        After Hours Emergency
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div>
                            <span className="text-black">Call: </span>
                            <a href="tel:+12406613222" target="_blank" className="text-[#c0e04c] hover:text-yellow-300 transition-colors font-bold">(240) 661-3222</a> for emergencies during non-business hours.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

