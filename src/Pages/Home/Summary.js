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
        <div className=" flex flex-col md:flex-row items-center gap-10 md:gap-18">
          <div className={summaryGroupCSS}>
            <Customer />
            <div className="text-center font-medium text-xl md:text-2xl mt-5">
              <CountUp start={0} end={200} duration={3} delay={0.5} />
              <span>+ Customers</span>
            </div>
          </div>

          <div className={summaryGroupCSS}>
            <Revenue />
            <div className="text-center font-medium text-xl md:text-2xl mt-5">
              <CountUp start={0} end={100} duration={3} delay={0.5} />
              <span>M+ Annual Revenue</span>
            </div>
          </div>

          <div className={summaryGroupCSS}>
            <Rating />
            <div className="text-center font-medium text-xl md:text-2xl mt-5">
              <CountUp start={0} end={30} duration={3} delay={0.5} />
              <span>K+ Reviews</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
