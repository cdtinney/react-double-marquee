import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function DefaultLeftMarquee() {
  return (
    <ExampleCard
      description="Default - Left"
      marqueeComponent={(
        <Marquee direction="left">
          This is a very long and boring sentence with no meaning whatsoever
        </Marquee>
      )}
    />
  );
}
