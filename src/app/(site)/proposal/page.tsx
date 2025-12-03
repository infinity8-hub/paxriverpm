'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

interface FormData {
    communityName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    numberOfUnits: string;
    communityType: string;
    selfManagementYears: string;
    professionalManagementYears: string;
    onSiteStaff: string;
    boardMemberInfo: string;
    boardPresidentInfo: string;
    specialRequirements: string;
    communityAmenities: string;
    annualBudget: string;
    reserveBudget: string;
    deadlineDate: string;
    contactName: string;
    contactEmail: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function Proposal() {
    const [formData, setFormData] = useState<FormData>({
        communityName: '',
        address: '',
        city: '',
        state: 'Maryland',
        zipCode: '',
        numberOfUnits: '',
        communityType: '',
        selfManagementYears: '',
        professionalManagementYears: '',
        onSiteStaff: 'yes',
        boardMemberInfo: '',
        boardPresidentInfo: '',
        specialRequirements: '',
        communityAmenities: '',
        annualBudget: '',
        reserveBudget: '',
        deadlineDate: '',
        contactName: '',
        contactEmail: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormEmpty = (): boolean => {
        return !formData.communityName.trim() &&
               !formData.address.trim() &&
               !formData.city.trim() &&
               !formData.zipCode.trim() &&
               !formData.numberOfUnits.trim() &&
               !formData.communityType &&
               !formData.selfManagementYears.trim() &&
               !formData.professionalManagementYears.trim() &&
               !formData.specialRequirements.trim() &&
               !formData.communityAmenities.trim() &&
               !formData.annualBudget.trim() &&
               !formData.reserveBudget.trim() &&
               !formData.deadlineDate &&
               !formData.contactName.trim() &&
               !formData.contactEmail.trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (e.target.type === 'number') {
            const numValue = parseFloat(value);
            if (value.includes('-') || (!isNaN(numValue) && numValue < 0)) {
                return;
            }
        }
        
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

    const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '.') {
            e.preventDefault();
        }
    };

    const handleNumberPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData('text');
        if (pastedText.includes('-') || parseFloat(pastedText) < 0) {
            e.preventDefault();
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            onSiteStaff: e.target.value
        }));
    };

    const handleDateChange = (date: Date | null) => {
            setDeadlineDate(date);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            setFormData(prev => ({
                ...prev,
                deadlineDate: formattedDate
            }));
            if (errors.deadlineDate) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.deadlineDate;
                    return newErrors;
                });
            }
        } else {
            setFormData(prev => ({
                ...prev,
                deadlineDate: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.communityName.trim()) {
            newErrors.communityName = 'Community name is required';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.state) {
            newErrors.state = 'State is required';
        }
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'Zip code is required';
        }
        if (!formData.numberOfUnits.trim()) {
            newErrors.numberOfUnits = 'Number of units is required';
        }
        if (!formData.communityType) {
            newErrors.communityType = 'Community type is required';
        }
        if (!formData.selfManagementYears.trim()) {
            newErrors.selfManagementYears = 'Self-management years is required';
        }
        if (!formData.professionalManagementYears.trim()) {
            newErrors.professionalManagementYears = 'Professional management years is required';
        }
        if (!formData.specialRequirements.trim()) {
            newErrors.specialRequirements = 'Special requirements is required';
        }
        if (!formData.communityAmenities.trim()) {
            newErrors.communityAmenities = 'Community amenities is required';
        }
        if (!formData.annualBudget.trim()) {
            newErrors.annualBudget = 'Annual budget is required';
        }
        if (!formData.reserveBudget.trim()) {
            newErrors.reserveBudget = 'Reserve budget is required';
        }
        if (!formData.deadlineDate) {
            newErrors.deadlineDate = 'Deadline date is required';
        }
        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Contact name is required';
        }
        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData({
            communityName: '',
            address: '',
            city: '',
            state: 'Maryland',
            zipCode: '',
            numberOfUnits: '',
            communityType: '',
            selfManagementYears: '',
            professionalManagementYears: '',
            onSiteStaff: 'yes',
            boardMemberInfo: '',
            boardPresidentInfo: '',
            specialRequirements: '',
            communityAmenities: '',
            annualBudget: '',
            reserveBudget: '',
            deadlineDate: '',
            contactName: '',
            contactEmail: '',
        });
        setDeadlineDate(null);
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
                    toast.success('We have received your proposal request and will be in touch with you shortly.', {
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
                            <h2 className="text-black italic text-xl font-semibold tracking-wide">
                                Request a Proposal
                            </h2>
                            <h1 className="text-[33px] md:text-[42px] lg:text-[50px] italic font-medium text-black leading-tight">
                                What are your property management needs?
                            </h1>
                            <p className="text-black text-sm leading-relaxed">
                                Just fill out the form below and one of our specialists will respond with a free assessment of your management needs.
                            </p>
                        </div>

                        <form className="proposal-form space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">
                                    NAME OF COMMUNITY <span className="form-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="communityName"
                                    value={formData.communityName}
                                    onChange={handleChange}
                                    placeholder="Enter community name"
                                    className={`form-input ${errors.communityName ? 'form-input-error' : ''}`}
                                />
                                {errors.communityName && <div className="form-error">{errors.communityName}</div>}
                            </div>

                            <div>
                                <label className="form-label">
                                    COMMUNITY ADDRESS <span className="form-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                    className={`form-input ${errors.address ? 'form-input-error' : ''}`}
                                />
                                {errors.address && <div className="form-error">{errors.address}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="form-label">
                                        CITY <span className="form-asterisk">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter City"
                                        className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                                    />
                                    {errors.city && <div className="form-error">{errors.city}</div>}
                                </div>

                                <div>
                                    <label className="form-label">
                                        STATE <span className="form-asterisk">*</span>
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`form-select ${errors.state ? 'form-select-error' : ''}`}
                                    >
                                        <option value="Maryland">Maryland</option>
                                        <option value="Virginia">Virginia</option>
                                        <option value="DC">District of Columbia</option>
                                    </select>
                                    {errors.state && <div className="form-error">{errors.state}</div>}
                                </div>

                                <div>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">
                                        NUMBER OF UNITS <span className="form-asterisk">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="numberOfUnits"
                                        value={formData.numberOfUnits}
                                        onChange={handleChange}
                                        onKeyDown={handleNumberKeyDown}
                                        onPaste={handleNumberPaste}
                                        min="0"
                                        step="1"
                                        placeholder="Enter number"
                                        className={`form-input ${errors.numberOfUnits ? 'form-input-error' : ''}`}
                                    />
                                    {errors.numberOfUnits && <div className="form-error">{errors.numberOfUnits}</div>}
                                </div>

                                <div>
                                    <label className="form-label">
                                        TYPE OF COMMUNITY <span className="form-asterisk">*</span>
                                    </label>
                                    <select
                                        name="communityType"
                                        value={formData.communityType}
                                        onChange={handleChange}
                                        className={`form-select ${errors.communityType ? 'form-select-error' : ''}`}
                                    >
                                        <option value="">Select One</option>
                                        <option value="condo">Condominium</option>
                                        <option value="hoa">HOA</option>
                                        <option value="coop">Co-op</option>
                                        <option value="apartment">Apartment</option>
                                    </select>
                                    {errors.communityType && <div className="form-error">{errors.communityType}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{ marginBottom: '1rem' }}>
                                    HOW MANY YEARS WITH CURRENT MANAGEMENT COMPANY?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            SELF-MANAGEMENT <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="selfManagementYears"
                                            value={formData.selfManagementYears}
                                            onChange={handleChange}
                                            onKeyDown={handleNumberKeyDown}
                                            onPaste={handleNumberPaste}
                                            min="0"
                                            step="1"
                                            placeholder="Enter years"
                                            className={`form-input ${errors.selfManagementYears ? 'form-input-error' : ''}`}
                                        />
                                        {errors.selfManagementYears && <div className="form-error">{errors.selfManagementYears}</div>}
                                    </div>
                                    <div>
                                        <label className="form-label">
                                            PROFESSIONAL MANAGEMENT <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="professionalManagementYears"
                                            value={formData.professionalManagementYears}
                                            onChange={handleChange}
                                            onKeyDown={handleNumberKeyDown}
                                            onPaste={handleNumberPaste}
                                            min="0"
                                            step="1"
                                            placeholder="Enter years"
                                            className={`form-input ${errors.professionalManagementYears ? 'form-input-error' : ''}`}
                                        />
                                        {errors.professionalManagementYears && <div className="form-error">{errors.professionalManagementYears}</div>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">
                                    DO YOU HAVE ON-SITE STAFF?
                                </label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="onSiteStaff"
                                            value="yes"
                                            checked={formData.onSiteStaff === 'yes'}
                                            onChange={handleRadioChange}
                                            className="form-radio"
                                        />
                                        <span className="text-black">Yes</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="onSiteStaff"
                                            value="no"
                                            checked={formData.onSiteStaff === 'no'}
                                            onChange={handleRadioChange}
                                            className="form-radio"
                                        />
                                        <span className="text-black">No</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">
                                    IF YOU ARE A CURRENT MEMBER OF THE BOARD OF DIRECTORS, INDICATE YOUR NAME AND YOUR POSITION
                                </label>
                                <input
                                    type="text"
                                    name="boardMemberInfo"
                                    value={formData.boardMemberInfo}
                                    onChange={handleChange}
                                    placeholder="Enter name and position"
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="form-label">
                                    IF NOT, PLEASE PROVIDE THE NAME, ADDRESS, AND PHONE # OF YOUR BOARD PRESIDENT
                                </label>
                                <textarea
                                    name="boardPresidentInfo"
                                    value={formData.boardPresidentInfo}
                                    onChange={handleChange}
                                    placeholder="Enter board president contact info"
                                    rows={4}
                                    className="form-textarea"
                                />
                            </div>

                            <div>
                                <label className="form-label">
                                    LIST ANY SPECIAL REQUIREMENTS HERE <span className="form-asterisk">*</span>
                                </label>
                                <textarea
                                    name="specialRequirements"
                                    value={formData.specialRequirements}
                                    onChange={handleChange}
                                    placeholder="Enter special requirements"
                                    rows={4}
                                    className={`form-textarea ${errors.specialRequirements ? 'form-textarea-error' : ''}`}
                                />
                                {errors.specialRequirements && <div className="form-error">{errors.specialRequirements}</div>}
                            </div>

                            <div>
                                <label className="form-label">
                                    DESCRIBE COMMUNITY AMENITIES <span className="form-asterisk">*</span>
                                </label>
                                <textarea
                                    name="communityAmenities"
                                    value={formData.communityAmenities}
                                    onChange={handleChange}
                                    placeholder="Enter community amenities"
                                    rows={4}
                                    className={`form-textarea ${errors.communityAmenities ? 'form-textarea-error' : ''}`}
                                />
                                {errors.communityAmenities && <div className="form-error">{errors.communityAmenities}</div>}
                            </div>

                            <div>
                                <label className="form-label">
                                    ANNUAL BUDGET AMOUNT <span className="form-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="annualBudget"
                                    value={formData.annualBudget}
                                    onChange={handleChange}
                                    placeholder="Enter annual budget"
                                    className={`form-input ${errors.annualBudget ? 'form-input-error' : ''}`}
                                />
                                {errors.annualBudget && <div className="form-error">{errors.annualBudget}</div>}
                            </div>

                            <div>
                                <label className="form-label">
                                    RESERVE BUDGET AMOUNT <span className="form-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="reserveBudget"
                                    value={formData.reserveBudget}
                                    onChange={handleChange}
                                    placeholder="Enter reserve budget"
                                    className={`form-input ${errors.reserveBudget ? 'form-input-error' : ''}`}
                                />
                                {errors.reserveBudget && <div className="form-error">{errors.reserveBudget}</div>}
                            </div>

                            <div>
                                <label className="form-label">
                                    DEADLINE DATE FOR PROPOSAL <span className="form-asterisk">*</span>
                                </label>
                                <DatePicker
                                    selected={deadlineDate}
                                    onChange={handleDateChange}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select a date"
                                    minDate={new Date()}
                                    className={`form-input ${errors.deadlineDate ? 'form-input-error' : ''}`}
                                    wrapperClassName="w-full"
                                />
                                {errors.deadlineDate && <div className="form-error">{errors.deadlineDate}</div>}
                            </div>

                            <div>
                                <label className="form-label" style={{ marginBottom: '1rem', color: '#000', fontSize: '20px' }}>
                                    Please Send Management Proposal to
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">
                                            NAME <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            placeholder="Enter name"
                                            className={`form-input ${errors.contactName ? 'form-input-error' : ''}`}
                                        />
                                        {errors.contactName && <div className="form-error">{errors.contactName}</div>}
                                    </div>
                                    <div>
                                        <label className="form-label">
                                            EMAIL <span className="form-asterisk">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            className={`form-input ${errors.contactEmail ? 'form-input-error' : ''}`}
                                        />
                                        {errors.contactEmail && <div className="form-error">{errors.contactEmail}</div>}
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
