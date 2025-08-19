"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../context/AppContext'
import { logoutUser } from '../../handlers/AuthHandlers'
import Image from 'next/image'
import './styles.css'
import { Building, House, Info, Mail, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, setLoading } = useAppContext();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const result = await logoutUser();

      if (result && result.success) {
        // Clear user data and redirect
        setUser(null);
        router.push('/');
      } else {
        console.error('Logout failed:', result?.error || result?.message);
        // Still clear user data locally even if server logout fails
        setUser(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user data locally on error
      setUser(null);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Image src={'/logos/himalayan-logo.png'} alt="Himalayan Nest Logo" width={40} height={40} className="mr-2 w-auto" />
            <Link href="/" className="text-2xl font-bold text-green-700">
              Himalayan Nest
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Properties
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-700 font-medium transition-colors">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Welcome, {user.firstName || user.name || 'User'}
                </span>

                <Link href="/dashboard" className="block mx-3 my-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-medium text-center transition-colors">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-medium transition-colors">
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-700 focus:outline-none focus:text-green-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700 font-medium border-t">
                    Welcome, {user.firstName || user.name || 'User'}
                  </div>

                  <Link href="/dashboard" className="block mx-3 my-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-medium text-center transition-colors">
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block mx-3 my-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium text-center transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block mx-3 my-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-medium text-center transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export const MobileMenu = () => {
  return (
    <div className="h-16 flex space-x-4 justify-around items-center sm:hidden fixed bottom-0 left-0 w-screen bg-white z-50 shadow-xl border-t">
      <Link href="/" className="flex flex-col items-center text-xs text-gray-600 hover:text-green-700 transition-colors">
        <House className="w-5 h-5 mb-1" strokeWidth={2.25} />
        Home
      </Link>

      <Link href="/properties" className="flex flex-col items-center text-xs text-gray-600 hover:text-green-700 transition-colors">
        <Building className="w-5 h-5 mb-1" strokeWidth={2.25} />
        Properties
      </Link>

      <Link href="/about" className="flex flex-col items-center text-xs text-gray-600 hover:text-green-700 transition-colors">
        <Info className="w-5 h-5 mb-1" strokeWidth={2.25} />
        About
      </Link>

      <Link href="/contact" className="flex flex-col items-center text-xs text-gray-600 hover:text-green-700 transition-colors">
        <Mail className="w-5 h-5 mb-1" strokeWidth={2.25} />
        Contact
      </Link>
    </div>
  )
}

export default Navbar
