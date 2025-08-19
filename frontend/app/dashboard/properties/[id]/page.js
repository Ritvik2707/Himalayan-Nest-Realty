"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getPropertyById, updateProperty, deleteProperty } from "../../../../handlers/PropertyHandlers";
import { fetchImageUrl } from "../../../../handlers/ImageHandlers";
import EditProperty from "../../../components/dashboard/EditProperty";
import { Eye, MessageCircleMore, MoveLeft } from "lucide-react";

export default function PropertyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const propertyId = params?.id;
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (propertyId) {
            loadProperty();
        }
    }, [propertyId]);

    const loadProperty = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await getPropertyById(propertyId);
            if (result && result.success) {
                // console.log('Fetched property:', result.data?.property);
                setProperty(result.data?.property || null);
            } else {
                setError(result?.error || "Property not found");
            }
        } catch (err) {
            setError("Failed to load property");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async () => {
        // TODO: Implement status toggle API call
        const result = await updateProperty(propertyId, { isActive: !property.isActive });
        if (result && result.success) {
            alert(`Property ${property.isActive ? 'Deactivated' : 'Activated'} successfully`);
            setProperty(prev => ({ ...prev, isActive: !prev.isActive }));
        } else {
            alert(result.error || 'Failed to update property status');
        }
        console.log(`Toggle status for property ${propertyId} from ${property.isActive} to ${!property.isActive}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            const result = await deleteProperty(propertyId);
            if (result && result.success) {
                alert("Property deleted successfully");
                router.push("/dashboard/properties");
            } else {
                alert(result?.error || "Failed to delete property");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div> */}
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <h3 className="text-lg font-medium text-red-600 mb-2">{error || "Property not found"}</h3>
                <button
                    onClick={() => router.push("/dashboard/properties")}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Back to Properties
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 hover:text-gray-900"
                    >
                        <MoveLeft className="w-4 h-4 mr-2" />
                        Back to Properties
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{property.category}</span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{property.purpose === 'rent' ? 'For Rent' : 'For Sale'}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{property.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleStatusToggle}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${property.isActive
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                    >
                        {property.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit Property
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Images Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(property.images && property.images.length > 0 ? property.images : [fetchImageUrl(property.image)]).map((img, idx) => (
                    <div key={idx} className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                            src={img || '/logos/default-property.jpg'}
                            alt={`Property Image ${idx + 1}`}
                            fill sizes="(max-width: 700px) 100vw, (min-width: 400px) 50vw"
                            className="object-cover"
                            onError={e => e.target.src = '/logos/default-property.jpg'}
                        // unoptimized
                        />
                    </div>
                ))}
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <span className="block text-gray-500 text-xs mb-1">Location</span>
                        <span className="text-lg font-semibold text-gray-900">{property.location}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs mb-1">Price</span>
                        <span className="text-lg font-bold text-green-700">₹{property.price}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs mb-1">Created At</span>
                        <span className="text-gray-700">{new Date(property.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs mb-1">Last Updated</span>
                        <span className="text-gray-700">{new Date(property.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <span className="block text-gray-500 text-xs mb-1">Description</span>
                        <span className="text-gray-700 whitespace-pre-line">{property.description}</span>
                    </div>
                    <div className="flex items-center space-x-6 mt-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            {property.views || 0} views
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <MessageCircleMore className="w-4 h-4 mr-1" />
                            {property.queries || 0} queries
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editMode && (
                <EditProperty
                    property={property}
                    onClose={() => setEditMode(false)}
                    onUpdate={updated => {
                        setProperty(updated);
                        setEditMode(false);
                    }}
                />
            )}
        </div>
    );
}
