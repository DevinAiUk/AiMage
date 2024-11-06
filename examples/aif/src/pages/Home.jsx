import React from 'react';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  return (
    <div className="p-8 bg-white text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AIFunnels.org</h1>
      <p className="text-lg mb-6">Revolutionizing digital marketing with AI.</p>
      <p className="text-lg mb-6">Create high-converting funnels in minutes.</p>
      <p className="text-lg mb-10">Join 10,000+ marketers worldwide.</p>
      <Link
        to="/funnels"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        Create Your First Funnel
      </Link>
    </div>
  );
};

export default HomePage;
