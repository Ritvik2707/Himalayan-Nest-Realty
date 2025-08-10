"use client";
import React, { useState } from 'react'
import { submitEnquiry } from '../../handlers/EnquiryHandlers'

const EnquiryForm = ({ propertyId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyType: '',
        budget: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', content: '' });

        try {
            const enquiryData = {
                ...formData,
                propertyId
            };

            const result = await submitEnquiry(enquiryData);

            if (result && result.success) {
                // Handle successful submission
                setMessage({
                    type: 'success',
                    content: result.message || 'Thank you for your enquiry! We will get back to you soon.'
                });
                // Clear form on success
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    propertyType: '',
                    budget: ''
                });
            } else {
                // Handle submission failure
                const errorMessage = result?.error || result?.message || 'Failed to submit enquiry. Please try again.';
                setMessage({
                    type: 'error',
                    content: errorMessage
                });
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            setMessage({
                type: 'error',
                content: 'Something went wrong. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            {message.content && (
                <div className={`mb-6 p-4 rounded-md ${message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.content}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                            Property Type
                        </label>
                        <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            <option value="">Select property type</option>
                            <option value="flat">Flat</option>
                            <option value="house">House</option>
                            <option value="plot">Plot</option>
                            <option value="pg">PG</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                            Budget Range
                        </label>
                        <input
                            type="text"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="e.g., 10-15 Lakh or 8000-12000/month"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            placeholder="Tell us about your requirements..."
                        ></textarea>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Note:</strong> All fields marked with * are required.
                    </p>
                    <p className="text-sm text-gray-600">
                        We respect your privacy and will not share your information with third parties.
                        We will contact you within 2 hours during business hours.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
            </form>
        </div>
    );
}

export default EnquiryForm
