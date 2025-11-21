'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage first
      let authStatus = localStorage.getItem('adminAuthenticated') === 'true';
      
      // If not found in localStorage, check cookies
      if (!authStatus) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'adminAuthenticated' && value === 'true') {
            authStatus = true;
            // Sync with localStorage
            localStorage.setItem('adminAuthenticated', 'true');
            break;
          }
        }
      }
      
      setIsAuthenticated(authStatus);
      
      // If not authenticated and trying to access protected pages, redirect to login
      const protectedRoutes = ['/dashboard', '/inventory', '/billing', '/customers', '/reports', '/settings'];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      
      if (!authStatus && isProtectedRoute) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    // Remove cookie
    document.cookie = "adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Billing', href: '/billing', icon: ShoppingCart },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  // Don't show layout on login page
  if (pathname === '/login') {
    return <div>{children}</div>;
  }

  // Show login redirect if not authenticated and trying to access protected pages
  const protectedRoutes = ['/dashboard', '/inventory', '/billing', '/customers', '/reports', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (!isAuthenticated && isProtectedRoute) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="bg-amber-600 text-white p-2 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">Gold Shop Admin</span>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button 
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Topbar */}
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-between flex-1 px-4">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">Shop Manager</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                      AU
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;