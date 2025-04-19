'use client';

import Navbar from '@/components/Navbar';
import { Activity, Calendar, DollarSign, Loader2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedNGO, setSelectedNGO] = useState('');
  const [ngoList, setNgoList] = useState([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth]);
  
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      let url = '/api/dashboard';
      if (selectedMonth) {
        url += `?month=${selectedMonth}`;
      }
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
        
        // Extract unique NGOs for the filter dropdown
        const ngos = result.data.reports.reduce((acc, report) => {
          if (!acc.some(ngo => ngo.id === report.ngoId)) {
            acc.push({ id: report.ngoId, name: report.ngoName });
          }
          return acc;
        }, []);
        
        setNgoList(ngos);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const getFilteredReports = () => {
    if (!dashboardData) return [];
    
    return dashboardData.reports.filter(report => {
      if (selectedNGO && report.ngoId !== selectedNGO) {
        return false;
      }
      return true;
    });
  };
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">NGO Impact Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="month-select" className="form-label">Filter by Month</label>
              <input
                id="month-select"
                type="month"
                className="form-input"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="ngo-select" className="form-label">Filter by NGO</label>
              <select
                id="ngo-select"
                className="form-input"
                value={selectedNGO}
                onChange={(e) => setSelectedNGO(e.target.value)}
              >
                <option value="">All NGOs</option>
                {ngoList.map((ngo) => (
                  <option key={ngo.id} value={ngo.id}>
                    {ngo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        ) : dashboardData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card bg-blue-50 border-l-4 border-blue-500">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">NGOs Reporting</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalNGOs}</p>
                  </div>
                </div>
              </div>
              
              <div className="card bg-green-50 border-l-4 border-green-500">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">People Helped</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalPeopleHelped.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="card bg-purple-50 border-l-4 border-purple-500">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Events Conducted</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalEventsConducted.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="card bg-amber-50 border-l-4 border-amber-500">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-amber-600">Funds Utilized</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.totalFundsUtilized)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Detailed Reports</h2>
                <div className="text-sm text-gray-500">
                  {selectedMonth ? `Showing data for ${selectedMonth}` : 'Showing all-time data'}
                  {selectedNGO ? ` filtered by NGO ID: ${selectedNGO}` : ''}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">People Helped</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funds (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredReports().length > 0 ? (
                      getFilteredReports().map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.ngoName}</div>
                            <div className="text-sm text-gray-500">ID: {report.ngoId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(report.month).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.peopleHelped.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{report.eventsConducted.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(report.fundsUtilized)}</div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <Activity className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500 text-lg">No reports found for the selected filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Unable to load dashboard data. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}