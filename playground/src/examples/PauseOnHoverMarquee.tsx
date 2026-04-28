import Marquee from '../../../src';
import ExampleCard from '../components/ExampleCard';

export default function PauseOnHoverMarquee() {
  return (
    <ExampleCard
      description="Pause on hover"
      marqueeComponent={(
        <Marquee pauseOnHover delay={0}>
          Hover me to pause the scroll
        </Marquee>
      )}
    />
  );
}
