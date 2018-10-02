<div align="center">
  🍎 🍉 🍊 🍑 🍌 🍋 🍐 🥦 🥣 🍙 🍇 🍆
</div>

# Tastes

[![Build Status](https://travis-ci.org/awfulaxolotl/tastes.svg?branch=master)](https://travis-ci.org/awfulaxolotl/tastes)

**Tastes** is a Javascript library for visualizing software behavior using intelligent sampling.

Useful for navigating and refining the space of possibilities for your data, code, and ideas. The salt n' pepper to your:

- React component development
- Interactive documentation
- Property-based testing
- Generative designs in Sketch

## Install

```sh
yarn add tastes # or npm install tastes --save
```

## A Quick Bite

Let's use Tastes to prototype different versions of a minimal poster.

[Code on Runkit](https://runkit.com/awfulaxolotl/a-quick-bite-of-tastes/1.0.1)

```js
// 1. Define the variables we want to play with
import { integer, record } from 'tastes'

const hue = integer({ min: 0, max: 360 })
const poster = record({
  fgHue: hue,
  bgHue: hue,
  headerPt: integer({ min: 20, max: 32 }),
  bodyPt: integer({ min: 12, max: 20 }),
})

// 2. We can checkout the specific poster design at
//    `(0.4, 0.2, 0.75, 0)` in the sample space.
console.log(poster([0.4, 0.2, 0.75, 0]))

// 3. But that's too manual. Let's just ask for 30 random
//    sample poster designs.
import { sampleRandom, take } from 'tastes'

for (const s of take(30, sampleRandom(poster))) {
  console.log(s)
}

// 4. But random designs may not be the best examples.
//    Let's check out carefully selected "representative"
//    samples instead.
import { sampleBatch } from 'tastes'

// Use detail of order 3
for (const s of sampleBatch(poster, 3)) {
  // `console.log` is used in abscence of
  // a proper rendering function
  console.log(s)
}
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
