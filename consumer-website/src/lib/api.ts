// API utility functions for connecting to the backend

const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://gold-shopy.onrender.com') + '/api'
  : 'https://gold-shopy.onrender.com/api';

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to parse error response as JSON
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // If JSON parsing fails, try to get text response
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (textError) {
          // If all parsing fails, use the default error message
        }
      }
      throw new Error(errorMessage);
    }
    
    // Handle successful responses with no content
    if (response.status === 204) {
      return {};
    }
    
    return await response.json();
  } catch (error) {
    // Log the error with the URL for debugging
    console.error(`API request failed for ${url}:`, error);
    
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      // For network errors, provide more context
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Network error: Unable to connect to ${url}. Please check your internet connection and server status.`);
      }
      throw new Error(`Request failed: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Auth API
export const authApi = {
  register: (userData: { name: string; email: string; password: string; phone?: string }) =>
    apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getProfile: (token: string) =>
    apiRequest('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  
  updateProfile: (token: string, userData: Partial<{ name: string; email: string; phone: string }>) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    }),
  
  rememberMeLogin: (token: string) =>
    apiRequest('/users/remember-me', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
};

// Product API
export const productApi = {
  getAllProducts: (params?: Record<string, string | number>) => {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    const url = `/products${queryParams ? `?${queryParams}` : ''}`;
    return apiRequest(url);
  },
  
  getProductById: (id: string) => apiRequest(`/products/${id}`),
  
  searchProducts: (query: string) => apiRequest(`/products/search?q=${query}`),
  
  getProductsByCategory: (categoryName: string, itemName: string) => 
    apiRequest(`/products/${categoryName}/${itemName}`),
};

// Cart API
export const cartApi = {
  getCart: (token: string) =>
    apiRequest('/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  
  addToCart: (token: string, productId: string, quantity: number = 1) =>
    apiRequest('/cart/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }),
  
  updateCartItem: (token: string, productId: string, quantity: number) =>
    apiRequest('/cart/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }),
  
  removeFromCart: (token: string, productId: string) =>
    apiRequest('/cart/remove', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    }),
  
  clearCart: (token: string) =>
    apiRequest('/cart/clear', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Wishlist API
export const wishlistApi = {
  getWishlist: (token: string) =>
    apiRequest('/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  
  addToWishlist: (token: string, productId: string) =>
    apiRequest('/wishlist/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    }),
  
  removeFromWishlist: (token: string, productId: string) =>
    apiRequest('/wishlist/remove', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    }),
  
  moveFromWishlistToCart: (token: string, productId: string) =>
    apiRequest('/wishlist/move-to-cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    }),
};

// Order API
export const orderApi = {
  createOrder: (token: string, orderData: any) =>
    apiRequest('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }),
  
  getUserOrders: (token: string) =>
    apiRequest('/orders/myorders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  
  getOrderById: (token: string, orderId: string) =>
    apiRequest(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};