<div align="center">
  🍎 🍉 🍊 🍑 🍌 🍋 🍐 🥦 🥣 🍙 🍇 🍆
</div>

# Tastes

[![Build Status](https://travis-ci.org/awfulaxolotl/tastes.svg?branch=master)](https://travis-ci.org/awfulaxolotl/tastes)

Code and create with generative samples. Generate example data with more control than just random.

Useful for navigating and refining the space of possibilities for your data, code, and ideas. The salt n' pepper to your:

- React component development
- Interactive documentation
- Property-based testing
- Generative designs in Sketch

## Install

```sh
yarn add tastes # or npm install tastes --save
```

## Examples

### Generative Designs in Sketch

Want to see your design in many fonts, colors, content, styles, and layouts? Tastes and React Sketchapp have got you!

[Example Code](https://github.com/awfulaxolotl/tastes/blob/master/examples/react-sketchapp/src/example.js)

![Sketch example](https://i.imgur.com/De7dSUr.png)

### Storybook

Use React Storybook to offer interactive documentation and generated examples!

[Example Code](https://github.com/awfulaxolotl/tastes/blob/master/stories/components.stories.tsx)

![Storybook example](https://media.giphy.com/media/cftt7oANbJpwmG86D4/giphy.gif)

### React Development

Visually test your app as you code with live tweaking.

[Example Code](https://github.com/awfulaxolotl/tastes/blob/master/examples/react/pages/index.js)

![React example](https://media.giphy.com/media/4blbf3ycx6sY7GRxzt/giphy.gif)

### Random Values

Use with [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) to get unpredictable values:

```js
import { real, record } from 'tastes'

const position = record({
  lat: real({ min: -90, max: 90 }),
  lng: real({ min: -180, max: 180 }),
})

const randomPosition = position([Math.random(), Math.random()])
```

## Why Not Random?

- **Not random.** Generates deterministic sample data from numbers. Give the same number; get the same data.
- **Preserves locality.** Give it closer numbers? Get similar data. Give it numbers further apart? Get different data.

This added control makes it a great foundation for advanced development and testing tools.

## Future Goals

- Recursive data
  - State transition trees
  - Time series data
  - Graphs
  - Lists
- Custom probability distributions
- Plug n' play for [`prop-types`](https://github.com/facebook/prop-types)
- Debugging tools
  - Hilbert curve of examples
  - Transition trees
