# react-double-marquee
> A React marquee component that smoothly loops content.

[![npm version](https://badge.fury.io/js/react-double-marquee.svg)](https://www.npmjs.com/package/react-double-marquee) ![npm downloads](https://img.shields.io/npm/dy/react-double-marquee)
[![CI](https://github.com/cdtinney/react-double-marquee/actions/workflows/ci.yml/badge.svg)](https://github.com/cdtinney/react-double-marquee/actions/workflows/ci.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Lo-fi demo:

![Example](https://raw.githubusercontent.com/cdtinney/react-double-marquee/master/docs/static/example.gif)

View the [demos page](https://cdtinney.github.io/react-double-marquee/) for live examples.

## Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
- [Developing](#developing)
  - [Installing](#installing)
  - [Building](#building)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Releasing](#releasing)
- [License](#license)

## Getting Started

### Installation

```
npm install react-double-marquee
```

### Usage

Import the component and wrap it in an element that constrains its width:

```tsx
import Marquee from 'react-double-marquee';

export default function MyComponent() {
  return (
    <div style={{ width: '200px', whiteSpace: 'nowrap' }}>
      <Marquee>
        Some really really really really really long text
      </Marquee>
    </div>
  );
}
```

With pause on hover and loop control:

```tsx
<Marquee pauseOnHover loop={3}>
  This will pause on hover and stop after 3 loops
</Marquee>
```

### Props

| Prop           | Type                       | Default     | Description                                                                 |
| -------------- | -------------------------- | ----------- | --------------------------------------------------------------------------- |
| `speed`        | `number`                   | `0.04`      | Movement speed, in pixels/millisecond.                                      |
| `delay`        | `number`                   | `3000`      | Time until animation begins, in milliseconds.                               |
| `direction`    | `'left' \| 'right'`       | `'right'`   | Horizontal scroll direction.                                                |
| `childMargin`  | `number`                   | `15`        | Horizontal margin between children, in pixels.                              |
| `children`     | `React.ReactNode`          | `null`      | Children to render within the marquee.                                      |
| `scrollWhen`   | `'always' \| 'overflow'`   | `'always'`  | Scroll always, or only when content overflows the container.                |
| `pauseOnHover` | `boolean`                  | `false`     | Pause the animation when the mouse hovers over the marquee.                 |
| `loop`         | `number`                   | `Infinity`  | Number of times the marquee loops before stopping.                          |

### TypeScript

Type definitions are included. You can import the props interface:

```tsx
import Marquee, { MarqueeProps } from 'react-double-marquee';
```

## Developing

First, clone the repository.

### Installing

```
npm install
```

### Building

To build the package bundle:

```
npm run build
```

To run the demos with live reload:

```
npm run dev
```

Then, open `http://localhost:8001` to view the demo docs.

To build the static docs website (e.g. for GitHub Pages):

```
npm run docs
```

### Testing

```
npm test
```

With watch mode:

```
npm run test:watch
```

With coverage:

```
npm run test:coverage
```

### Linting

```
npm run lint
```

### Releasing

Releases are automated via GitHub Actions and [`semantic-release`](https://github.com/semantic-release/semantic-release) from the `main` branch.

## License

MIT
