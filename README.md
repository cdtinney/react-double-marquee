# react-double-marquee
> A React marquee component that smoothly loops content, twice.

## Contents

- [Contents](#contents)
- [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Props](#props)
- [Developing](#developing)
  - [Installing](#installing)
  - [Building](#building)
  - [Linting](#linting)
- [License](#license)

## Getting Started

### Usage

Install as a dependency:

```
$ npm install --save react-double-marquee
```

Then, import it into your components:

```javascript
import Marquee from 'react-double-marquee';

export default function FooComponent() {
  return (
    <Marquee>
      {'Some really really really really really long text'}
    </Marquee>
  );
}
```

### Props

| Key | Type | Default | Description |
| - | - | - | - |
| `speed` | `Number` | 0.04 | Movement speed, in pixels/millisecond. |
| `delay` | `Number` | 3000 | Time until animation begins, in milliseconds. |
| `childMargin` | `Number` | 10 | Horizontal margin between children, in pixels. |
| `children` | React node | Children to render within the marquee. | 

## Developing

First, clone the repository.

### Installing

Install dependencies:

```
$ npm install
```

### Building

To build the package bundle:

```
$ npm run build
```

To build the bundle with live rebuilding:

```
$ npm run watch
```

### Linting

To run the linter:

```
$ npm run lint
```

## License

MIT
