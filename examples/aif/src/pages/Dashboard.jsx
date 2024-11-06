import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { listFunnels } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: funnels, isLoading, error } = useQuery(listFunnels);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {funnels.length === 0 ? (
        <p>No funnels found. Start by creating one!</p>
      ) : (
        funnels.map((funnel) => (
          <div
            key={funnel.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{funnel.title}</div>
            <Link
              to={`/funnel/${funnel.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              View Funnel
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardPage;
