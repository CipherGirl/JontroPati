import { Center } from '@mantine/core';
import React from 'react';

const Blog = () => {
  return (
    <div className="w-3/4 m-auto">
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold mb-3">
          How will you improve the performance of a React Application?
        </h1>
        <p className="text-justify">
          <ul className="flex flex-col gap-3">
            <li>
              <span className="font-semibold">
                {' '}
                Use a Production build before deployment:
              </span>{' '}
              By default, whenever we run a React app, it gives many helpful
              warnings, which are very useful in development. However, they also
              make the React app larger and slower, so we should use the
              production version when wwe deploy the app. So it is recommended
              to use development mode while working on the React app, and
              production mode is to be used when the app is deployed for the
              users.
            </li>
            <li>
              <span className="font-semibold">
                Avoid Adding Extra Nodes to the DOM by using React Fragment
              </span>
              When we need to render the multiple elements in a component or
              return a group of related items, using a div or another element to
              enclose the elements could add a node in the DOM. So to avoid
              this, we can use React Fragmentin React, which will not add any
              other nodes to the DOM.
            </li>
            <li>
              <span className="font-semibold">Immutable Data Structures</span>
              The term Immutability refers to something whose value or state
              cannot be changed. So, in programming, a variable is immutable
              when its value cannot change after it’s created. So, using
              immutability would mean that we instead make new copies of
              objects/arrays instead of changing the data. If we use immutable
              data in our React app, the diffing algorithm used by React for
              tracking the changes to our app becomes cheap.
            </li>
            <li>
              <span className="font-semibold">Avoid Anonymous Functions</span>
              This is because the anonymous functions that aren’t assigned an
              identifier (via const/let/var) are not persistent whenever a
              component inevitably gets rendered again. So, as a result of this,
              instead of allocating a single piece of memory only once, like
              when named functions are being used, JavaScript allocates new
              memory each time this component is re-rendered.
            </li>
            <li>
              <span className="font-semibold">
                App’s loading time improvement by lazy loading
              </span>
              Using lazy loading in an app provides better performance and load
              time. When using lazy loading, we reduce the number of resources
              that need to be loaded on the page initially. If the number of
              requests for resources is lesser, it results in lesser consumption
              and competition for the limited network bandwidth available to
              users. As a result of this, the device can download and process
              the remaining resources much faster. Therefore, the page becomes
              usable much sooner with less load time than one without lazy
              loading.
            </li>
          </ul>
        </p>
      </div>
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold mb-3">
          What are the different ways to manage a state in a React application?
        </h1>
        <p className="text-justify">
          We can use React Hooks and Redux to manage states in React
          Application.
        </p>
      </div>
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold my-3">
          How does prototypical inheritance work?
        </h1>
        <p className="text-justify">
          Simply put, prototypical inheritance refers to the ability to access
          object properties from another object. We use a JavaScript prototype
          to add new properties and methods to an existing object constructor.
          We can then essentially tell our JS code to inherit properties from a
          prototype. Prototypical inheritance allows us to reuse the properties
          or methods from one JavaScript object to another through a reference
          pointer functi
        </p>
      </div>
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold my-3">
          {`Why you do not set the state directly in React. For example, if you
          have const [products, setProducts] = useState([]). Why you do not set
          products = [...] instead, you use the setProducts`}
        </h1>
        <p className="text-justify">
          React, keeps a track record of all its virtual DOM. Whenever a change
          happens, all the components are rendered and this new virtual DOM is
          then compared with the old virtual DOM. Only the differences found are
          then reflected in the original DOM. So, it’s obvious from the
          statement that if we mutate the state directly, it will change the
          reference of the state in the previous virtual DOM as well. So, React
          won’t be able to see that there is a change of the state and so it
          won’t be reflected in the original DOM until we reload. The problem is
          more obvious when we extend a component with React.PureComponent
          instead of React.component , where React tries to optimize some time
          by not rendering components if no changes are found. Also, mutating
          the state directly can lead to odd bugs and components that are hard
          to optimize.
        </p>
      </div>
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold my-3">
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h1>
        <p className="text-justify">
          To filter an array of objects only by property we can use object
          destructuring in map method:
          <br />
          <code className="text-green-600">{`products.map(({ name }) => ({ name }));`}</code>{' '}
          This will return an array of objects that will include only 'name'
          property of objects inside of 'products' array.
        </p>
      </div>
      <div className="shadow-lg my-3 py-5 px-10">
        <h1 className="text-xl font-bold my-3">
          What is a unit test? Why should write unit tests?
        </h1>
        <p className="text-justify">
          Unit Testing is a type of software testing where individual units or
          components of a software are tested. The purpose is to validate that
          each unit of the software code performs as expected. Unit Testing is
          done during the development (coding phase) of an application by the
          developers. Unit Tests isolate a section of code and verify its
          correctness.
          <br />
          Unit Testing is important because software developers sometimes try
          saving time doing minimal unit testing and this is myth because
          inappropriate unit testing leads to high cost Defect fixing during
          System Testing, Integration Testing and even Beta Testing after
          application is built. If proper unit testing is done in early
          development, then it saves time and money in the end.
        </p>
      </div>
    </div>
  );
};

export default Blog;
