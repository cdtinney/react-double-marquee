import { ReactElement } from 'react';
import type { MarqueeProps } from '../../../src';

interface ExampleCardProps {
  description: string;
  marqueeComponent: ReactElement<MarqueeProps>;
}

export default function ExampleCard({ description, marqueeComponent }: ExampleCardProps) {
  return (
    <div className="card">
      <div className="card__description">
        <div>{description}</div>
        <pre className="card__props">
          {JSON.stringify({ props: marqueeComponent.props }, null, 2)}
        </pre>
      </div>
      <div className="card__marquee-outer">
        <div className="card__marquee-inner">{marqueeComponent}</div>
      </div>
    </div>
  );
}
