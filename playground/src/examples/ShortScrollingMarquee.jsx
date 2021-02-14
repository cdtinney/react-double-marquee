import React from 'react';
import Marquee from '../../../docs/static/lib';
import ExampleCard from '../components/ExampleCard';

function ShortScrollingMarquee() {
  return (
    <ExampleCard
      description="Short text - Always scroll"
      marqueeComponent={(
        <Marquee direction="right">
          Short & Sweet!
        </Marquee>
      )}
    />
  );
}

export default ShortScrollingMarquee;
