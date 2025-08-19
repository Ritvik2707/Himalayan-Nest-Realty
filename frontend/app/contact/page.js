"use client";
import React, { useState } from 'react'
import EnquiryForm from '../components/EnquiryForm'
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('contact');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Us</h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Get in touch with us for any queries, property listings, or assistance you need.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
                {/* Tabs */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-sm">
                        <button
                            className={`px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${activeTab === 'contact'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-600 hover:text-green-600'
                                }`}
                            onClick={() => setActiveTab('contact')}
                        >
                            Contact Information
                        </button>
                        <button
                            className={`px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base ${activeTab === 'enquiry'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-600 hover:text-green-600'
                                }`}
                            onClick={() => setActiveTab('enquiry')}
                        >
                            Send Enquiry
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'contact' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Get in Touch</h2>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" strokeWidth={2.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Address</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            Himalayan Nest Real Estate<br />
                                            Main Market, Roorkee<br />
                                            Uttarakhand - 247667, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" strokeWidth={2.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            +91 98765 43210<br />
                                            +91 87654 32109
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" strokeWidth={2.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            info@himalayannest.com<br />
                                            support@himalayannest.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" strokeWidth={2.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Office Hours</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            Monday - Saturday: 9:00 AM - 7:00 PM<br />
                                            Sunday: 10:00 AM - 5:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map or Additional Info */}
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Locations</h2>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Main Office - Roorkee</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">Primary office serving IIT Roorkee area and surrounding regions</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Branch Office - Haridwar</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">Serving Haridwar and nearby spiritual destinations</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Branch Office - Dehradun</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">Capital city office for premium properties</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Service Area - Rishikesh</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">Yoga capital properties and riverside locations</p>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">Quick Response Guarantee</h3>
                                <p className="text-green-700 text-xs sm:text-sm">
                                    We guarantee to respond to all enquiries within 2 hours during business hours.
                                    For urgent matters, please call us directly.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'enquiry' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Send us an Enquiry</h2>
                            <EnquiryForm />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contact
