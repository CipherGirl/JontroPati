import { Highlight } from '@mantine/core';
import React from 'react';

const Footer = () => {
  return (
    <footer class="w-full ">
      <div class="px-8 py-12 mx-auto max-w-7xl">
        <div class="grid grid-cols-3 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-20">
          <div class="col-span-1">
            <a
              href="https://cip"
              class="text-xl font-sans font-extrabold leading-none  select-none logo"
            >
              <Highlight
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
            </a>
            <p class="my-4 text-xs leading-normal text-gray-500">
              Best products, trusted by thousands.
            </p>
          </div>
          <nav class="col-span-1">
            <p class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Product
            </p>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Features
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Integrations
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Documentation
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              FAQs
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Pricing
            </a>
          </nav>
          <nav class="col-span-1">
            <p class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              About
            </p>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Our Story
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Company
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Privacy
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Blog
            </a>
          </nav>
          <nav class="col-span-1">
            <p class="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Contact
            </p>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Advertising
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Press
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Email
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Partners
            </a>
            <a
              href="https://ciphergirl.github.io"
              class="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary"
            >
              Jobs
            </a>
          </nav>
        </div>
        <div class="flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
          <p class="mb-6 text-sm text-left text-gray-600 md:mb-0">
            {`© Copyright ${new Date().getFullYear()} JontroPati. All Rights Reserved.`}
          </p>
          <div class="flex items-start justify-start space-x-6 md:items-center md:justify-center">
            <a
              href="#_"
              class="text-sm text-gray-600 transition hover:text-primary"
            >
              Terms
            </a>
            <a
              href="#_"
              class="text-sm text-gray-600 transition hover:text-primary"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
