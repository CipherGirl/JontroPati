import { Highlight } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Banner = () => {
  const navigate = useNavigate();
  return (
    <section class="max-w-7xl flex flex-col md:flex-row items-center px-2">
      <div class="flex flex-col md:flex items-center md:items-start p-4 ">
        <Highlight
          style={{ fontSize: '4rem' }}
          highlight="Pati"
          weight={900}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(45, '#f4900c'),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          JontroPati
        </Highlight>
        <h2 class="font-bold text-lg mb-4">Better Tools. Better World.</h2>
        <p className="text-justify mt-3">
          Providing superior products to users worldwide through continuous
          innovation, we are determined to become a global leader in power tools
          and outdoor power equipment in the lithium-ion, intelligent and
          digital era.
        </p>
        <button
          class="px-6 py-3 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-full mt-6 shadow-md focus:shadow-sm transition duration-150 ease-in-out"
          onClick={() => navigate('/products')}
        >
          Products
        </button>
      </div>
      <img
        class="mt-10 ml-0 md:ml-10 h-full md:w-[600px] shadow-xl rounded-md hover:scale-110 transition-all ease-in-out duration-100"
        src="https://images.unsplash.com/photo-1567361808960-dec9cb578182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1195&q=80"
        alt="tools"
      />
    </section>
  );
};
