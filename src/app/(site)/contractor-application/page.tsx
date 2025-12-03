'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

interface FormData {
    companyName: string;
    typeOfService: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    website: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    mobilePhone: string;
    officeNumber: string;
    licenseName: string;
    licenseNumber: string;
    licenseType: string;
    reference1Name: string;
    reference1Title: string;
    reference1Phone: string;
    reference1BusinessType: string;
    reference2Name: string;
    reference2Title: string;
    reference2Phone: string;
    reference2BusinessType: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function ContractorApplication() {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        typeOfService: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        website: '',
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        mobilePhone: '',
        officeNumber: '',
        licenseName: '',
        licenseNumber: '',
        licenseType: '',
        reference1Name: '',
        reference1Title: '',
        reference1Phone: '',
        reference1BusinessType: '',
        reference2Name: '',
        reference2Title: '',
        reference2Phone: '',
        reference2BusinessType: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormEmpty = (): boolean => {
        return !formData.companyName.trim() &&
               !formData.typeOfService.trim() &&
               !formData.streetAddress.trim() &&
               !formData.city.trim() &&
               !formData.state.trim() &&
               !formData.zipCode.trim() &&
               !formData.firstName.trim() &&
               !formData.lastName.trim() &&
               !formData.title.trim() &&
               !formData.email.trim() &&
               !formData.officeNumber.trim() &&
               !formData.reference1Name.trim() &&
               !formData.reference1Title.trim() &&
               !formData.reference1Phone.trim() &&
               !formData.reference1BusinessType.trim() &&
               !formData.reference2Name.trim() &&
               !formData.reference2Title.trim() &&
               !formData.reference2Phone.trim() &&
               !formData.reference2BusinessType.trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const formatPhoneNumber = (value: string): string => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formatted = formatPhoneNumber(value);
        
        setFormData(prev => ({
            ...prev,
            [name]: formatted
        }));
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.typeOfService.trim()) {
            newErrors.typeOfService = 'Type of service is required';
        }
        if (!formData.streetAddress.trim()) {
            newErrors.streetAddress = 'Street address is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Zip code is required';
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.officeNumber.trim()) {
            newErrors.officeNumber = 'Office number is required';
        }
        if (!formData.reference1Name.trim()) {
            newErrors.reference1Name = 'Reference 1 name is required';
        }
        if (!formData.reference1Title.trim()) {
            newErrors.reference1Title = 'Reference 1 title is required';
        }
        if (!formData.reference1Phone.trim()) {
            newErrors.reference1Phone = 'Reference 1 phone is required';
        }
        if (!formData.reference1BusinessType.trim()) {
            newErrors.reference1BusinessType = 'Reference 1 type of business is required';
        }
        if (!formData.reference2Name.trim()) {
            newErrors.reference2Name = 'Reference 2 name is required';
        }
        if (!formData.reference2Title.trim()) {
            newErrors.reference2Title = 'Reference 2 title is required';
        }
        if (!formData.reference2Phone.trim()) {
            newErrors.reference2Phone = 'Reference 2 phone is required';
        }
        if (!formData.reference2BusinessType.trim()) {
            newErrors.reference2BusinessType = 'Reference 2 type of business is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData({
            companyName: '',
            typeOfService: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            website: '',
            firstName: '',
            lastName: '',
            title: '',
            email: '',
            mobilePhone: '',
            officeNumber: '',
            licenseName: '',
            licenseNumber: '',
            licenseType: '',
            reference1Name: '',
            reference1Title: '',
            reference1Phone: '',
            reference1BusinessType: '',
            reference2Name: '',
            reference2Title: '',
            reference2Phone: '',
            reference2BusinessType: '',
        });
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            console.log('Form Data:', formData);
            
            setTimeout(() => {
                setIsSubmitting(false);
                
                setTimeout(() => {
                    toast.success('We have received your contractor application and will contact you shortly.', {
                        position: 'top-right',
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    
                    setTimeout(() => {
                        resetForm();
                    }, 3000);
                }, 100);
            }, 2000);
        } else {
            console.log('Validation failed. Please fix the errors.');
        }
    };

    return (
        <div className="bg-white text-black">
            <div className="max-w-[90%] mx-auto px-7 sm:px-10 lg:px-9 py-16">
                <div className="w-full">
                    <div className="space-y-8 w-full">
                        <div className="space-y-4">
                            <h1 className="text-[33px] md:text-[42px] lg:text-[50px] italic font-medium text-black leading-tight">
                                Contractor Application
                            </h1>
                            <p className="text-black text-sm leading-relaxed">
                                If you are interested in being considered as a contractor for any of our properties, please submit this form.
                            </p>
                        </div>

                        <form className="proposal-form space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <h2 className="section-title text-lg font-semibold">Company Information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            COMPANY NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Enter company name"
                                            className={`form-input ${errors.companyName ? 'form-input-error' : ''}`}
                                        />
                                        {errors.companyName && <div className="form-error">{errors.companyName}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TYPE OF SERVICE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="typeOfService"
                                            value={formData.typeOfService}
                                            onChange={handleChange}
                                            placeholder="Enter type of service"
                                            className={`form-input ${errors.typeOfService ? 'form-input-error' : ''}`}
                                        />
                                        {errors.typeOfService && <div className="form-error">{errors.typeOfService}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">
                                        STREET ADDRESS <span className="form-asterisk">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                        className={`form-input ${errors.streetAddress ? 'form-input-error' : ''}`}
                                    />
                                    {errors.streetAddress && <div className="form-error">{errors.streetAddress}</div>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="form-label">
                                            CITY <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter city"
                                            className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                                        />
                                        {errors.city && <div className="form-error">{errors.city}</div>}
                                    </div>

                                    <div className="md:col-span-1">
                                        <label className="form-label">
                                            STATE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter state"
                                            className={`form-input ${errors.state ? 'form-input-error' : ''}`}
                                        />
                                        {errors.state && <div className="form-error">{errors.state}</div>}
                                    </div>

                                    <div className="md:col-span-1">
                                        <label className="form-label">
                                            ZIP CODE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            placeholder="Enter zip"
                                            className={`form-input ${errors.zipCode ? 'form-input-error' : ''}`}
                                        />
                                        {errors.zipCode && <div className="form-error">{errors.zipCode}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">
                                        WEBSITE
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="Enter website"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="section-title text-lg font-semibold">Primary Contact</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            FIRST NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                            className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                                        />
                                        {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            LAST NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                                        />
                                        {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            TITLE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter title"
                                            className={`form-input ${errors.title ? 'form-input-error' : ''}`}
                                        />
                                        {errors.title && <div className="form-error">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            EMAIL <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                                        />
                                        {errors.email && <div className="form-error">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            MOBILE PHONE
                                        </label>
                                        <input
                                            type="text"
                                            name="mobilePhone"
                                            value={formData.mobilePhone}
                                            onChange={handlePhoneChange}
                                            placeholder="Enter format XXX-XXX-XXXX"
                                            maxLength={12}
                                            className="form-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            OFFICE NUMBER <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="officeNumber"
                                            value={formData.officeNumber}
                                            onChange={handlePhoneChange}
                                            placeholder="Enter format XXX-XXX-XXXX"
                                            maxLength={12}
                                            className={`form-input ${errors.officeNumber ? 'form-input-error' : ''}`}
                                        />
                                        {errors.officeNumber && <div className="form-error">{errors.officeNumber}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="section-title text-lg font-semibold">Primary State License</h2>
                                
                                <div>
                                    <label className="form-label">
                                        NAME (as it appears on license)
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseName"
                                        value={formData.licenseName}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        className="form-input"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            LICENSE NUMBER
                                        </label>
                                        <input
                                            type="text"
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                            placeholder="Enter license number"
                                            className="form-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TYPE OF LICENSE
                                        </label>
                                        <input
                                            type="text"
                                            name="licenseType"
                                            value={formData.licenseType}
                                            onChange={handleChange}
                                            placeholder="Enter type of license"
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="section-title text-lg font-semibold">Reference #1</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference1Name"
                                            value={formData.reference1Name}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className={`form-input ${errors.reference1Name ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference1Name && <div className="form-error">{errors.reference1Name}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TITLE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference1Title"
                                            value={formData.reference1Title}
                                            onChange={handleChange}
                                            placeholder="Enter title"
                                            className={`form-input ${errors.reference1Title ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference1Title && <div className="form-error">{errors.reference1Title}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            PHONE NUMBER <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference1Phone"
                                            value={formData.reference1Phone}
                                            onChange={handlePhoneChange}
                                            placeholder="Enter format XXX-XXX-XXXX"
                                            maxLength={12}
                                            className={`form-input ${errors.reference1Phone ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference1Phone && <div className="form-error">{errors.reference1Phone}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TYPE OF BUSINESS <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference1BusinessType"
                                            value={formData.reference1BusinessType}
                                            onChange={handleChange}
                                            placeholder="Enter type of business"
                                            className={`form-input ${errors.reference1BusinessType ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference1BusinessType && <div className="form-error">{errors.reference1BusinessType}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="section-title text-lg font-semibold">Reference #2</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference2Name"
                                            value={formData.reference2Name}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className={`form-input ${errors.reference2Name ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference2Name && <div className="form-error">{errors.reference2Name}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TITLE <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference2Title"
                                            value={formData.reference2Title}
                                            onChange={handleChange}
                                            placeholder="Enter title"
                                            className={`form-input ${errors.reference2Title ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference2Title && <div className="form-error">{errors.reference2Title}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            PHONE NUMBER <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference2Phone"
                                            value={formData.reference2Phone}
                                            onChange={handlePhoneChange}
                                            placeholder="Enter format XXX-XXX-XXXX"
                                            maxLength={12}
                                            className={`form-input ${errors.reference2Phone ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference2Phone && <div className="form-error">{errors.reference2Phone}</div>}
                                    </div>

                                    <div>
                                        <label className="form-label">
                                            TYPE OF BUSINESS <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="reference2BusinessType"
                                            value={formData.reference2BusinessType}
                                            onChange={handleChange}
                                            placeholder="Enter type of business"
                                            className={`form-input ${errors.reference2BusinessType ? 'form-input-error' : ''}`}
                                        />
                                        {errors.reference2BusinessType && <div className="form-error">{errors.reference2BusinessType}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="form-submit-btn"
                                    disabled={isSubmitting || isFormEmpty()}
                                >
                                    {isSubmitting ? 'Sending..' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
