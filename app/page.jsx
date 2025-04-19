
import Navbar from '@/components/Navbar';
import { BarChart3, FileText } from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NGO Impact Tracker</h1>
          <p className="text-xl text-gray-600 mb-8">
            Track and report the impact of NGO work across India
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <Link href="/report" className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              <FileText className="mr-3 h-6 w-6" />
              <span className="text-lg font-medium">Submit Monthly Report</span>
            </Link>
            
            <Link href="/dashboard" className="flex items-center justify-center bg-purple-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              <BarChart3 className="mr-3 h-6 w-6" />
              <span className="text-lg font-medium">View Impact Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}