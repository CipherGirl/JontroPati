import { Badge } from '@mantine/core';
import React from 'react';

const Portfolio = () => {
  return (
    <div className=" min-h-[calc(100vh-64px)] mx-10 flex flex-col items-center">
      <h1 className="my-10">Portolio</h1>
      <div className=" flex flex-col mb-20">
        <div class="flex flex-col items-baseline justify-between md:flex-row max-w-7xl gap-4 ">
          <div class="w-full md:w-3/4">
            <h1 className="font-bold text-orange-500">Hasna Hena Mow</h1>
            <h3 className="font-semibold">
              MERN Stack Developer | Open Source Contributor
            </h3>
            <p>
              I am a recent graduate student developing myself to pursue a
              career as a Software Engineer.
            </p>
            <div
              className="flex items-baseline gap-2"
              style={{ flexWrap: 'wrap' }}
            >
              <span>Tech Stacks:</span>
              <Badge color="yellow">javaSctipt</Badge>
              <Badge>React</Badge>
              <Badge color="lime">Node</Badge>
              <Badge color="orange">Express</Badge>
              <Badge color="green">Mongo</Badge>
              <Badge color="red">HTML</Badge>
              <Badge color="yellow">CSS</Badge>
            </div>
          </div>
          <div class="">
            <h2
              className="text-lg font-semibold"
              style={{ textAlign: 'right' }}
            >
              Get In Touch
            </h2>
            <p style={{ textAlign: 'right' }}>
              Email: hasnahenamow@gmail.com
              <br />
              Github:{' '}
              <a
                href="https://github.com/CipherGirl"
                target="_blank"
                rel="noreferrer"
              >
                www.github.com/CipherGirl
              </a>
              <br /> LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/in/hasna-hena-mow/"
                target="_blank"
                rel="noreferrer"
              >
                @hasna-hena-mow
              </a>
            </p>
          </div>
        </div>
        <div class="py-4 my-4">
          <div class="w-full border border-black" />
        </div>
        <h2 className="text-xl font-semibold text-orange-500">Experience</h2>
        <h3 h3 className="font-semibold mt-5">
          Intellibus | Major League Hacking Fellowship
        </h3>
        <p>
          Worked with Intellibus as part of MLH Fellowship | January 2022 to
          April 2022{' '}
        </p>
        <p className="text-justify mt-2">
          Collaborating with the Intellibus team on a closed source project.
          Learning through the process of different aspects of Software
          Development. <br />
          Introduced to new tech and tools. Project Techs: AWS Services,
          Terraform, Twillio, Nextjs Application etc.
        </p>
        <h3 h3 className="font-semibold mt-5">
          Firefox Profiler | Outreachy x Mozilla Internship
        </h3>
        <p>
          Internationalization and Localization feature for Firefox Profiler |
          December 2020 to March 2021
        </p>
        <p className="text-justify mt-2">
          Collaborated with Firefox-Profiler team to implement localization
          using tools like Fluent Packages, React.js, Redux for store
          management. <br />
          Assisted in improving testing to support newly added localization
          feature using tools like React Testing Library, Jest.
          <br /> Project Github Link, My contributions, Blog Posts, Outreachy
        </p>
        <h2 className="text-xl font-semibold text-orange-500 mt-10">
          Recent Work
        </h2>

        <h3 className="font-semibold mt-5">
          JontroPati | Power/Hand Tools Manufacturer (Manufacturer Website)
          <a
            href="https://jontropati.firebaseapp.com/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-external-link inline-flex ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
              <line x1="10" y1="14" x2="20" y2="4"></line>
              <polyline points="15 4 20 4 20 9"></polyline>
            </svg>
          </a>
        </h3>
        <p>Developed with MERN Stack</p>
        <p className="text-justify mt-2">
          Manufacturer website that has collections of products that user can
          buy. Users can register to the site, update their profile, leave a
          review, <br /> order and pay for products.
          <br /> Admin can access products, orders and manage them as well.
          Admin can make other users admin and revoke admin access too.
          <br />
          Tech/Tools Used: React, Node, Mongo, Firebase, Stripe, Mantine,
          Tailwind etc.
        </p>
        <h3 className="font-semibold mt-5">
          Aroma Central | Inventory of Fragrance Products (Warehouse Inventory
          Website)
          <a
            href="https://aroma-central.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-external-link inline-flex ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
              <line x1="10" y1="14" x2="20" y2="4"></line>
              <polyline points="15 4 20 4 20 9"></polyline>
            </svg>
          </a>
        </h3>
        <p>Developed with MERN Stack</p>
        <p className="text-justify mt-2">
          Inventory website that has collections of products that user can
          stock. Users can register to the site, update stock.
          <br />
          Tech/Tools Used: React, Node, Mongo, Firebase, Mantine, Tailwind etc.
        </p>
        <h3 className="font-semibold mt-5">
          Qaiba Homes | Realtor Website Template (Independant Service Provider)
          <a
            href="https://qaibahomes.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-external-link inline-flex ml-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
              <line x1="10" y1="14" x2="20" y2="4"></line>
              <polyline points="15 4 20 4 20 9"></polyline>
            </svg>
          </a>
        </h3>
        <p>Developed with React</p>
        <p className="text-justify mt-2">
          Simple react bootstrap website that has sample collections of services
          that user can book. Users can register to the site, book for services.
          <br />
          Tech/Tools Used: React, Firebase, Bootstrap etc.
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
