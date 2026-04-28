import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import DefaultRightMarquee from './examples/DefaultRightMarquee';
import DefaultLeftMarquee from './examples/DefaultLeftMarquee';
import ShortMarquee from './examples/ShortMarquee';
import ShortScrollingMarquee from './examples/ShortScrollingMarquee';
import PauseOnHoverMarquee from './examples/PauseOnHoverMarquee';
import LoopMarquee from './examples/LoopMarquee';

function Index() {
  return (
    <div className="page">
      <Header />
      <div className="examples">
        <DefaultRightMarquee />
        <DefaultLeftMarquee />
        <ShortScrollingMarquee />
        <ShortMarquee />
        <PauseOnHoverMarquee />
        <LoopMarquee />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<Index />);
}
