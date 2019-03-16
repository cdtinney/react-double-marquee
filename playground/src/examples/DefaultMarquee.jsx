import React from 'react';
import Marquee from '../../public/static/lib';
import ExampleCard from '../components/ExampleCard';

function DefaultMarquee() {
  return (
    <ExampleCard
      description="Default"
      marqueeComponent={(
        <Marquee>
          This is a very long and boring sentence with no meaning whatsoever
        </Marquee>
      )}
    />
  );
}

export default DefaultMarquee;
