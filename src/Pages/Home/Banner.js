import { Highlight } from '@mantine/core';
import React from 'react';

export const Banner = () => {
  return (
    <section class="max-w-7xl flex flex-col md:flex-row items-center px-2">
      <div class="flex flex-col md:flex-1 items-center md:items-start p-4 ">
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
        <button class="px-6 py-3 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-full mt-6 shadow-md focus:shadow-sm transition duration-150 ease-in-out">
          Products
        </button>
      </div>
      <div class="mx-0 md:mx-10">
        <div class="flex-1">
          <img
            class="h-3/4 md:h-[500px] object-cover"
            src="https://ksassets.timeincuk.net/wp/uploads/sites/56/2007/05/tool-kit.jpg"
            alt="tools"
          />
        </div>
      </div>
    </section>
  );
};
