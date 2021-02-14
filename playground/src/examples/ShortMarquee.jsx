import React from 'react';
import Marquee from '../../../docs/static/lib';
import ExampleCard from '../components/ExampleCard';

function ShortMarquee() {
  return (
    <ExampleCard
      description="Short text - Scroll on overflow"
      marqueeComponent={(
        <Marquee scrollWhen="overflow" delay={0}>
          Short & Sweet!
        </Marquee>
      )}
    />
  );
}

export default ShortMarquee;
