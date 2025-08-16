"use client";
import React, { useState, useEffect } from 'react';

const QueriesManagement = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockQueries = [
            {
                id: 1,
                property: {
                    id: 1,
                    title: "2 BHK Apartment in Prime Location",
                    location: "Dehradun"
                },
                user: {
                    name: "Amit Sharma",
                    email: "amit@example.com",
                    phone: "+91 9876543210"
                },
                message: "I'm interested in this property. Can we schedule a visit?",
                status: "pending",
                createdAt: "2024-01-15T10:30:00Z",
                respondedAt: null,
                response: null
            },
            {
                id: 2,
                property: {
                    id: 2,
                    title: "3 BHK House for Sale",
                    location: "Haridwar"
                },
                user: {
                    name: "Priya Gupta",
                    email: "priya@example.com",
                    phone: "+91 9876543211"
                },
                message: "What's the final price for this house? Is there any room for negotiation?",
                status: "responded",
                createdAt: "2024-01-14T15:45:00Z",
                respondedAt: "2024-01-14T18:30:00Z",
                response: "Thank you for your interest. The listed price is final, but we can discuss payment terms."
            },
            {
                id: 3,
                property: {
                    id: 3,
                    title: "Plot for Sale in Rishikesh",
                    location: "Rishikesh"
                },
                user: {
                    name: "Rajesh Kumar",
                    email: "rajesh@example.com",
                    phone: "+91 9876543212"
                },
                message: "Is this plot approved for residential construction? What are the documents available?",
                status: "pending",
                createdAt: "2024-01-13T09:15:00Z",
                respondedAt: null,
                response: null
            }
        ];

        setTimeout(() => {
            setQueries(mockQueries);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredQueries = queries.filter(query => {
        if (filter === 'all') return true;
        return query.status === filter;
    });

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            responded: 'bg-green-100 text-green-800',
            closed: 'bg-gray-100 text-gray-800'
        };
        return badges[status] || badges.pending;
    };

    const handleRespond = async (queryId) => {
        if (!responseText.trim()) {
            setMessage({
                type: 'error',
                content: 'Please enter a response message'
            });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: '', content: '' });

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update the query status and response
            setQueries(prev => prev.map(query =>
                query.id === queryId
                    ? {
                        ...query,
                        status: 'responded',
                        response: responseText,
                        respondedAt: new Date().toISOString()
                    }
                    : query
            ));

            setMessage({
                type: 'success',
                content: 'Response sent successfully!'
            });
            setSelectedQuery(null);
            setResponseText('');
        } catch (error) {
            setMessage({
                type: 'error',
                content: 'Failed to send response'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Property Inquiries</h2>
                <div className="flex items-center space-x-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="all">All Queries</option>
                        <option value="pending">Pending</option>
                        <option value="responded">Responded</option>
                    </select>
                </div>
            </div>

            {message.content && (
                <div className={`p-4 rounded-lg ${message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.content}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {filteredQueries.length === 0 ? (
                    <div className="p-8 text-center">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Queries Found</h3>
                        <p className="text-gray-600">
                            {filter === 'all'
                                ? "You haven't received any property inquiries yet."
                                : `No ${filter} queries found.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredQueries.map((query) => (
                            <div key={query.id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {query.user.name}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(query.status)}`}>
                                                {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>📧 {query.user.email}</p>
                                            <p>📱 {query.user.phone}</p>
                                            <p>🏠 <span className="font-medium">{query.property.title}</span> - {query.property.location}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 text-right">
                                        <p>{formatDate(query.createdAt)}</p>
                                        {query.respondedAt && (
                                            <p className="text-green-600">
                                                Responded: {formatDate(query.respondedAt)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <p className="text-gray-800">{query.message}</p>
                                </div>

                                {query.response && (
                                    <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                                        <p className="text-sm font-medium text-green-800 mb-2">Your Response:</p>
                                        <p className="text-green-700">{query.response}</p>
                                    </div>
                                )}

                                {query.status === 'pending' && (
                                    <div className="space-y-3">
                                        {selectedQuery === query.id ? (
                                            <div className="space-y-3">
                                                <textarea
                                                    value={responseText}
                                                    onChange={(e) => setResponseText(e.target.value)}
                                                    placeholder="Type your response here..."
                                                    rows="4"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedQuery(null);
                                                            setResponseText('');
                                                        }}
                                                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleRespond(query.id)}
                                                        disabled={isSubmitting}
                                                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${isSubmitting
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : 'bg-green-600 hover:bg-green-700'
                                                            }`}
                                                    >
                                                        {isSubmitting ? 'Sending...' : 'Send Response'}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setSelectedQuery(query.id)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Respond
                                                </button>
                                                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    Call
                                                </button>
                                                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    Email
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueriesManagement;
