import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function DefaultRightMarquee() {
  return (
    <ExampleCard
      description="Default - Right"
      marqueeComponent={(
        <Marquee>
          This is a very long and boring sentence with no meaning whatsoever
        </Marquee>
      )}
    />
  );
}
