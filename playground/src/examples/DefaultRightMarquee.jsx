import React from 'react';
import Marquee from '../../../docs/static/lib';
import ExampleCard from '../components/ExampleCard';

function DefaultRightMarquee() {
  return (
    <ExampleCard
      description="Right direction"
      marqueeComponent={(
        <Marquee>
          This is a very long and boring sentence with no meaning whatsoever
        </Marquee>
      )}
    />
  );
}

export default DefaultRightMarquee;
