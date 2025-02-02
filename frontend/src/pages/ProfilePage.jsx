import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';
import OrderHistory from '../components/OrderHistory';
import ProfileInfo from '../components/ProfileInfo';
import { userOrders } from '../hooks/user.order';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { orders, loading } = userOrders();
  const user = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className="bg-white shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
            alt="Profile Background"
          />
        </div>
        
        <div className="flex flex-col items-center -mt-20">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            className="w-40 border-4 border-white rounded-full"
            alt="Profile"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{user.name || 'User'}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 mx-2 rounded-t-lg ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 mx-2 rounded-t-lg ${
              activeTab === 'orders'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Orders
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mx-2 rounded-t-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'orders' ? (
          <OrderHistory orders={orders} loading={loading} navigate={navigate} />
        ) : (
          <ProfileInfo user={user} />
        )}
      </div>
    </div>
  );
}