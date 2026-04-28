import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function LoopMarquee() {
  return (
    <ExampleCard
      description="Stop after a fixed number of loops"
      marqueeComponent={(
        <Marquee loop={3} delay={0}>
          This stops after 3 loops
        </Marquee>
      )}
    />
  );
}
