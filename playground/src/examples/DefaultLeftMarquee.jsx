import React from 'react';
import Marquee from '../../../docs/static/lib';
import ExampleCard from '../components/ExampleCard';

function DefaultLeftMarquee() {
  return (
    <ExampleCard
      description="Default Text - Left Direction"
      marqueeComponent={(
        <Marquee direction="left">
          This is a very long and boring sentence with no meaning whatsoever
        </Marquee>
      )}
    />
  );
}

export default DefaultLeftMarquee;
