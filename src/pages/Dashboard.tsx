
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthNavbar from '../components/AuthNavbar';

// Mock API data types
interface ApiStatus {
  status: string;
  lastChecked: string;
}

interface ActivityLog {
  id: number;
  action: string;
  timestamp: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API data
        setApiStatus({
          status: 'healthy',
          lastChecked: new Date().toISOString()
        });
        
        setActivityLogs([
          {
            id: 1,
            action: 'Logged in',
            timestamp: new Date(Date.now() - 5 * 60000).toISOString()
          },
          {
            id: 2,
            action: 'Updated profile',
            timestamp: new Date(Date.now() - 60 * 60000).toISOString()
          },
          {
            id: 3,
            action: 'Created account',
            timestamp: new Date(Date.now() - 24 * 60 * 60000).toISOString()
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Account overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-lg font-medium">{user?.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Account ID</p>
                  <p className="text-lg font-medium">#{user?.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>API Status</CardTitle>
              <CardDescription>Backend connection status</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : apiStatus ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      apiStatus.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <p className="text-lg font-medium capitalize">{apiStatus.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last checked</p>
                    <p className="text-lg font-medium">{formatDate(apiStatus.lastChecked)}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      {apiStatus.status === 'healthy' 
                        ? 'All systems operational' 
                        : 'Some systems are experiencing issues'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Failed to load API status</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : activityLogs.length > 0 ? (
                <ul className="space-y-4">
                  {activityLogs.map((log) => (
                    <li key={log.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <span className="font-medium">{log.action}</span>
                      <span className="text-sm text-gray-500">{formatDate(log.timestamp)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recent activity found</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Django & React Auth Tutorial</h2>
          <p className="text-gray-600 mb-4">
            This dashboard demonstrates a protected route that can only be accessed by authenticated users.
            In the backend, this would be secured with Django's permission classes and JWT validation.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Next steps in the tutorial series:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Implementing the actual Django backend with Django REST Framework</li>
              <li>Setting up JWT authentication in Django</li>
              <li>Creating user models and serializers</li>
              <li>Building protected API endpoints</li>
              <li>Connecting the React frontend to the Django backend</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
