<div align="center">
  🍎 🍉 🍊 🍑 🍌 🍋 🍐 🥦 🥣 🍙 🍇 🍆
</div>

# Tastes

Code and create with generative samples. Generate example data with more control than just random.

Useful for navigating and refining the space of possibilities for your data, code, and ideas. The salt n' pepper to your:

* React component development
* Interactive documentation
* Property-based testing
* Generative designs in Sketch

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
import { number, record } from 'tastes'

const positionSampler = record({
  lat: number({ min: -90, max: 90 }),
  lng: number({ min: -180, max: 180 }),
})

const randomPosition = positionSampler(Math.random())
```

### Property-based Testing

Cheap, simple property-based testing!

```js
import { array, number } from 'tastes'

function isSorted(arr) {
  const [befores, afters] = [arr.slice(0, -1), arr.slice(1)]

  const inOrder = (el, i) => befores[i] <= afters[i]
  return befores.every(inOrder)
}

const numbersSampler = array(number())

// Will throw an error, as `Array.prototype.sort` doesn't actually work with numbers
for (let i = 0; i < 10000; i++) {
  const sorted = numbersSampler(i).sort()

  if (!isSorted(sorted)) {
    throw new Error("`Array.prototype.sort` doesn't work with numbers!")
  }
}
```

Please note that actual property-based testing libraries, such as [jsverify](https://github.com/jsverify/jsverify), offer better coverage and confidence. With that said, Tastes can still be useful for quick sanity checks due its incredibly minimal API.

## Why Not Random?

* **Not random.** Generates deterministic sample data from numbers. Give the same number; get the same data.
* **Preserves locality.** Give it closer numbers? Get similar data. Give it numbers further apart? Get different data.

This added control makes it a great foundation for advanced development and testing tools.

## Future Goals

* Recursive data
  * State transition trees
  * Time series data
  * Graphs
  * Lists
* Custom probability distributions
* Plug n' play for [`prop-types`](https://github.com/facebook/prop-types)
* Debugging tools
  * Hilbert curve of examples
  * Transition trees
