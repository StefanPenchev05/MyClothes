import React from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const designs = [
    { id: 1, title: 'Design Title', description: 'Description of the design', price: 24.00 },
    // ... more designs
  ];

  const location = useLocation();
  const avatar = location.state.avatar;

  return (
    <div className="bg-white">
      <div className="max-w-screen-lg mx-auto p-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img src={avatar} className='w-20 h-20 rounded-full'/>
          <h1 className="text-3xl font-bold">Your Name</h1>
          <p className="text-sm">Your Location</p>
          <div className="flex mt-2">
            <div className="mr-4">
              <span className="font-semibold">Total Designs</span>  {/* You should fetch this data */}
            </div>
            <div className="mr-4">
              <span className="font-semibold">Orders</span>  {/* You should fetch this data */}
            </div>
            <div>
              <span className="font-semibold">Following</span>  {/* You should fetch this data */}
            </div>
          </div>
          <div className="flex mt-4">
            <button className="bg-black text-white px-4 py-2 mr-2 rounded">Follow</button>
            <button className="border border-black px-4 py-2 rounded">Message</button>
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {designs.map(design => (
            <div key={design.id} className="border rounded shadow p-4 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{design.title}</h3>
                <p className="text-sm text-gray-600">{design.description}</p>
              </div>
              <div className="mt-4">
                <span className="text-gray-900">${design.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-black text-white px-8 py-2 rounded">Load more</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
