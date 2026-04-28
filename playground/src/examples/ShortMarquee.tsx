import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function ShortMarquee() {
  return (
    <ExampleCard
      description="Scroll only on overflow"
      marqueeComponent={(
        <Marquee scrollWhen="overflow" delay={0}>
          Short & Sweet!
        </Marquee>
      )}
    />
  );
}
