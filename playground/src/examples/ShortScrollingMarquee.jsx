import React from 'react';
import Marquee from '../../../docs/static/lib';
import ExampleCard from '../components/ExampleCard';

function ShortScrollingMarquee() {
  return (
    <ExampleCard
      description="Default - Short text scrolls"
      marqueeComponent={(
        <Marquee direction="right">
          Short & Sweet!
        </Marquee>
      )}
    />
  );
}

export default ShortScrollingMarquee;
