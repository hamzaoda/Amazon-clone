import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

function Success() {
  const router = useRouter();

  const goToOrders = () => {
    router.push('/orders');
  };

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />
      <main className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-3xl'>Thank you, your Order has been Confirmed</h1>
          </div>
          <p>Thank you for shopping with us. We'll send a confirmation of the items shipped. If you would like to check your orders, please click on the link below.</p>
          {/* Add onClick to the button to navigate when clicked */}
          <button onClick={goToOrders} className='button mt-8'>Go To My Orders</button>
        </div>
      </main>
    </div>
  );
}

export default Success;
