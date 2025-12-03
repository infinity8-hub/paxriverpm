'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";
import './style.css';

export default function ContactUs() {
    return (
        <>
            <div className="bg-white">
            <div className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 py-16">
                <div className="flex flex-col gap-8">
                    <div className="space-y-8 w-full">
                        <div className="space-y-4">
                            <h1 className="text-[33px] md:text-[42px] lg:text-[50px] italic font-medium text-black leading-tight">
                                Contact Us
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-9 mt-8">
                            <Link href="/proposal" className="border-2 border-black rounded-3xl p-8 flex flex-col items-center justify-between min-h-[280px] hover:bg-primary-lightBlue hover:border-transparent transition-all duration-500 ease-in-out cursor-pointer group w-full sm:w-[calc(50%+22px)] md:w-[calc(33.333%+16px)] lg:w-[calc(25%+13px)] lg:h-[280px] xl:w-[calc(20%+11.2px)] hover:scale-105">
                                <div className="flex flex-col items-center flex-grow justify-center">
                                    <div className="relative w-8 h-8 group-hover:scale-125 transition-transform duration-500 ease-out">
                                        <div className="w-full h-full icon-color-3183B7">
                                            <Image
                                                src="/images/icon-resources.svg"
                                                alt="Resources icon"
                                                fill
                                                className="object-contain icon-color-3183B7"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-black text-xl my-5 font-semibold text-center group-hover:scale-110 group-hover:text-white transition-all duration-500 ease-out">
                                        Request Proposal
                                    </h3>

                                    <div className="group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                        <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="https://www.homewisedocs.com/login" target="_blank" rel="noopener noreferrer" className="border-2 border-black rounded-3xl p-8 flex flex-col items-center justify-between min-h-[280px] hover:bg-primary-lightBlue hover:border-transparent transition-all duration-500 ease-in-out cursor-pointer group w-full sm:w-[calc(50%+22px)] md:w-[calc(33.333%+16px)] lg:w-[calc(25%+13px)] lg:h-[280px] xl:w-[calc(20%+11.2px)] hover:scale-105">
                                <div className="flex flex-col items-center flex-grow justify-center">
                                    <div className="relative w-8 h-8 group-hover:scale-125 transition-transform duration-500 ease-out">
                                        <div className="w-full h-full icon-color-3183B7">
                                            <Image
                                                src="/images/icon-resources.svg"
                                                alt="Resources icon"
                                                fill
                                                className="object-contain icon-color-3183B7"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-black text-lg my-5 font-semibold text-center group-hover:scale-110 group-hover:text-white transition-all duration-500 ease-out">
                                        Rescale Documents
                                    </h3>

                                    <div className="group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                        <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/contractor-application" className="border-2 border-black rounded-3xl p-8 flex flex-col items-center justify-between min-h-[280px] hover:bg-primary-lightBlue hover:border-transparent transition-all duration-500 ease-in-out cursor-pointer group w-full sm:w-[calc(50%+22px)] md:w-[calc(33.333%+16px)] lg:w-[calc(25%+13px)] lg:h-[280px] xl:w-[calc(20%+11.2px)] hover:scale-105">
                                <div className="flex flex-col items-center flex-grow justify-center">
                                    <div className="relative w-8 h-8 group-hover:scale-125 transition-transform duration-500 ease-out">
                                        <div className="w-full h-full icon-color-3183B7">
                                            <Image
                                                src="/images/icon-maintenance.svg"
                                                alt="Maintenance icon"
                                                fill
                                                className="object-contain icon-color-3183B7"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-black text-lg my-5 font-semibold text-center group-hover:scale-110 group-hover:text-white transition-all duration-500 ease-out">
                                        Contractor Application
                                    </h3>
                                    <div className="group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                        <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/general-inquiry" className="border-2 border-black rounded-3xl p-8 flex flex-col items-center justify-between min-h-[280px] hover:bg-primary-lightBlue hover:border-transparent transition-all duration-500 ease-in-out cursor-pointer group w-full sm:w-[calc(50%+22px)] md:w-[calc(33.333%+16px)] lg:w-[calc(25%+13px)] lg:h-[280px] xl:w-[calc(20%+11.2px)] hover:scale-105">
                                <div className="flex flex-col items-center flex-grow justify-center">
                                    <div className="relative w-8 h-8 group-hover:scale-125 transition-transform duration-500 ease-out">
                                        <div className="w-full h-full icon-color-3183B7">
                                            <Image
                                                src="/images/icon-laptop.svg"
                                                alt="Laptop icon"
                                                fill
                                                className="object-contain icon-color-3183B7"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-black text-lg my-5 font-semibold text-center group-hover:scale-110 group-hover:text-white transition-all duration-500 ease-out">
                                        General Inquiries
                                    </h3>

                                    <div className="group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                        <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}