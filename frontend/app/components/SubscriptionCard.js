export default function SubscriptionCard({ name, price, features }) {
    return (
        <div className="border rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-blue-600 text-xl font-semibold mt-2">₹ {price}</p>
            <ul className="mt-4 space-y-2">
                {features.map((f, i) => (
                    <li key={i} className="text-gray-600">✔ {f}</li>
                ))}
            </ul>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Subscribe</button>
        </div>
    );
}
