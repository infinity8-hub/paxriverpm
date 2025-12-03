'use client';
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";
import './style.css'

export default function OwnerResources() {
    return (
        <div className="page-container">
            <div className="content-wrapper">
                <h1 className="page-heading">
                    Unit Owner Resources
                </h1>
                <div className="container-grid">
                    <Link href="https://brodie.cincwebaxis.com/" target="_blank" rel="noopener noreferrer" className="resource-card group">
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="w-full h-full icon-color-3183B7">
                                    <Image
                                        src="/images/owner-resources/icon-payment.svg"
                                        alt="Resources icon"
                                        fill
                                        className="object-contain icon-color-3183B7"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="card-text-wrapper">
                                <span className="card-text">
                                    Unit Owner
                                </span>
                                <br />
                                <span className="card-text">
                                    Login
                                </span>
                            </div>
                            <div className="card-arrow group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </Link>

                    <Link href="https://www.homewisedocs.com/login" target="_blank" rel="noopener noreferrer" className="resource-card group">
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="w-full h-full icon-color-3183B7">
                                    <Image
                                        src="/images/owner-resources/icon-resources.svg"
                                        alt="Resources icon"
                                        fill
                                        className="object-contain icon-color-3183B7"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="card-text-wrapper">
                                <span className="card-text">
                                    Rescale
                                </span>
                                <br />
                                <span className="card-text">
                                    Docuemnts
                                </span>
                            </div>
                            <div className="card-arrow group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </Link>

                    <Link href="https://www.homewisedocs.com/login" target="_blank" rel="noopener noreferrer" className="resource-card group">
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="w-full h-full icon-color-3183B7">
                                    <Image
                                        src="/images/owner-resources/icon-laptop.svg"
                                        alt="Maintenance icon"
                                        fill
                                        className="object-contain icon-color-3183B7"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="card-text-wrapper">
                                <span className="card-text">
                                    Send Us A
                                </span>
                                <br />
                                <span className="card-text">
                                    Message
                                </span>
                            </div>
                            <div className="card-arrow group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </Link>

                    <Link href="https://brodiemgmt.com/request-maintenance/" target="_blank" rel="noopener noreferrer" className="resource-card group">
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="w-full h-full icon-color-3183B7">
                                    <Image
                                        src="/images/owner-resources/icon-maintenance.svg"
                                        alt="Laptop icon"
                                        fill
                                        className="object-contain icon-color-3183B7"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="card-text-wrapper">
                                <span className="card-text">
                                    Request
                                </span>
                                <br />
                                <span className="card-text">
                                    Maintenace
                                </span>
                            </div>
                            <div className="card-arrow group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </Link>
                    <a href="mailto:info@paxriverpm.com" className="resource-card group">
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="w-full h-full icon-color-3183B7">
                                    <Image
                                        src="/images/owner-resources/icon-accounting.svg"
                                        alt="Laptop icon"
                                        fill
                                        className="object-contain icon-color-3183B7"
                                        unoptimized
                                    />
                                </div>
                            </div>
                            <div className="card-text-wrapper">
                                <span className="card-text">
                                    Contract
                                </span>
                                <br />
                                <span className="card-text">
                                    Accounting
                                </span>
                            </div>
                            <div className="card-arrow group-hover:scale-[1.2] transition-transform duration-500 ease-out">
                                <FaArrowRightLong className="text-black text-3xl group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
