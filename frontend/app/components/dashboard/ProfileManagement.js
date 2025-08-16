"use client";
import React, { useState, useContext, useEffect } from 'react';
import { useAppContext } from '@/app/context/AppContext';

const ProfileManagement = () => {
    const { user, updateUser } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        bio: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                company: user.company || '',
                bio: user.bio || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', content: '' });

        try {
            // Here you would call your API to update user profile
            // For now, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update context with new user data
            updateUser({
                ...user,
                ...formData
            });

            setMessage({
                type: 'success',
                content: 'Profile updated successfully!'
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({
                type: 'error',
                content: 'Failed to update profile'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            company: user?.company || '',
            bio: user?.bio || ''
        });
        setIsEditing(false);
        setMessage({ type: '', content: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    {message.content && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Header */}
                        <div className="flex items-center space-x-6 pb-6 border-b border-gray-200">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {user?.name || 'Dealer Name'}
                                </h3>
                                <p className="text-gray-600">{user?.email}</p>
                                <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Verified Dealer
                                </span>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing
                                        ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                        : 'bg-gray-50'
                                        }`}
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
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing
                                        ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                        : 'bg-gray-50'
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing
                                        ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                        : 'bg-gray-50'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Company/Agency
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing
                                        ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                        : 'bg-gray-50'
                                        }`}
                                    placeholder="Enter your company name"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                Bio/Description
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows="4"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing
                                    ? 'focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                    : 'bg-gray-50'
                                    }`}
                                placeholder="Tell us about yourself and your real estate experience..."
                            ></textarea>
                        </div>

                        {/* Account Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Account Information</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Account Type
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
                                        Dealer Account
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Member Since
                                    </label>
                                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Password Change Section */}
                    {!isEditing && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h4>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h5 className="font-medium text-gray-900">Password</h5>
                                    <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                                </div>
                                <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;
