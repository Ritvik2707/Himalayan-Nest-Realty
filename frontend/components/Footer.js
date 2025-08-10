import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800/70 shadow-md mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">© 2023 Himalayan Nest. All rights reserved.</span>
                    <div className="flex space-x-4">
                        <a href="/privacy" target='_' className="text-gray-700 hover:text-green-700">Privacy Policy</a>
                        <a href="/terms" target='_' className="text-gray-700 hover:text-green-700">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
