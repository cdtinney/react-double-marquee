const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// An adapter for tests is required in order to use
// React 16 with Enzyme
configure({
  adapter: new Adapter(),
});
