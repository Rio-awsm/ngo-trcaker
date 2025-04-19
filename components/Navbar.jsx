import { BarChart3, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">NGO Impact Tracker</h1>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/report" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                <FileText className="mr-2 h-5 w-5" />
                Submit Report
              </Link>
              <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                <BarChart3 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}