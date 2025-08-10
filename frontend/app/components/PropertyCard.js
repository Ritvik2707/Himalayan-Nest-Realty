import Image from "next/image";

export default function PropertyCard({ id, title, price, location, image }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <Image src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="font-bold text-xl">{title}</h2>
                <p className="text-gray-600">{location}</p>
                <p className="text-blue-600 font-semibold">₹ {price.toLocaleString()}</p>
                <a href={`/property/${id}`} className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                    View Details
                </a>
            </div>
        </div>
    );
}
