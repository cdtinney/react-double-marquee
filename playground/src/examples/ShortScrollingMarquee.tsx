import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function ShortScrollingMarquee() {
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
