'use client'
import Link from 'next/link';

export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (Fixed at the Top) */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#2E7D32]">EcoBot</div>
          <div className="flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-green-500 transition-colors font-bold">
                  Home
                </Link>
                <Link href="/awareness" className="text-gray-700 hover:text-green-600 transition-colors font-bold">
                  Awareness
                </Link>
                <Link href="/explore" className="text-gray-800 hover:text-green-700 transition-colors font-bold">
                  Explore
                </Link>
                <Link href="/chatbot" className="text-gray-900 hover:text-green-800 transition-colors font-bold">
                  EcoBot
                </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 container mx-auto px-6">
        {/* Introduction Section */}
  

        {/* Canada Initiatives & Policies Section */}
      
      </main>
    </div>
  );
}
