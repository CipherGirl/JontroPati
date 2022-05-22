import { useSetState } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import handleViewport from 'react-in-viewport';
import CountUp from 'react-countup';
import { Text } from '@mantine/core';
import { ReactComponent as Customer } from '../../Assets/customer.svg';
import { ReactComponent as Revenue } from '../../Assets/growth.svg';
import { ReactComponent as Rating } from '../../Assets/review.svg';

export const Summary = () => {
  const ViewportBlock = handleViewport(SummaryBlock);
  return (
    <div className="">
      <h1 className="text-center font-bold mb-20 text-2xl md:text-4xl">
        {' '}
        About Our Business
      </h1>
      <ViewportBlock />
    </div>
  );
};

const SummaryBlock = (props: { inViewport: boolean }) => {
  const { inViewport, forwardedRef } = props;
  const [start, setStart] = useState(false);
  const summaryGroupCSS = 'flex flex-col items-center max-w-[200px]';

  useEffect(() => {
    inViewport ? setStart(true) : setStart(false);
  }, [inViewport]);

  return (
    <div ref={forwardedRef}>
      {start && (
        <div className=" flex flex-col md:flex-row items-center gap-10 md:gap-48">
          <div className={summaryGroupCSS}>
            <Customer />
            <CountUp end={200} duration={1.5} delay={0.2} useEasing>
              {({ countUpRef }) => (
                <p className="text-center font-medium text-xl md:text-2xl mt-5">
                  <span ref={countUpRef}></span>+ Customers
                </p>
              )}
            </CountUp>
          </div>
          <div className={summaryGroupCSS}>
            <Revenue />
            <CountUp end={100} duration={1.5} delay={0.2} useEasing>
              {({ countUpRef }) => (
                <p className="text-center font-medium text-xl md:text-2xl mt-5">
                  <span ref={countUpRef}></span>M+ Annual Revenue
                </p>
              )}
            </CountUp>
          </div>
          <div className={summaryGroupCSS}>
            {' '}
            <Rating />
            <CountUp end={30} duration={1.5} delay={0.2} useEasing>
              {({ countUpRef }) => (
                <p className="text-center font-medium text-xl md:text-2xl mt-5">
                  <span ref={countUpRef}></span>K+ Reviews
                </p>
              )}
            </CountUp>
          </div>
        </div>
      )}
    </div>
  );
};
