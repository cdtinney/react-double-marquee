import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// An adapter for tests is required in order to use
// React 16 with Enzyme
configure({
  adapter: new Adapter(),
});
