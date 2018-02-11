<div align="center">
  🌈 🦄 🐺 🐕 🐀 🦍 🚶‍♂️ 🧜‍♀️ 🌊 ⛵️ 🚢
</div>

# Arbitrary

Generate sample data with more control than just random.

Useful for navigating space of possibilities for your data, code, and ideas. The salt n' pepper to your:

* React component development
* Interactive documentation
* Property-based testing
* Generative designs in Sketch

## Examples

### Random Values

Use with `Math.random` to get unpredictable values:

```js
import { number, record } from 'arbitrary'

const samplePosition = record({
  lat: number({ min: -90, max: 90 }),
  lng: number({ min: -180, max: 180 }),
})

const randomPosition = samplePosition(Math.random())
```

### React Development

Visually test your app as you code with live tweaking.

### Storybook

Use React Storybook to offer interactive documentation and generated examples!

### Property-based Testing

Cheap, simple property-based testing!

```js
import { array, number } from 'arbitrary'

function isSorted(arr) {
  const [befores, afters] = [arr.slice(0, -1), arr.slice(1)]

  const inOrder = (el, i) => befores[i] <= afters[i]
  return befores.every(inOrder)
}

const sampleNumbers = array(number())

// Will throw an error, as `Array.prototype.sort` doesn't actually work with numbers
for (let i = 0; i < 10000; i++) {
  const sorted = sampleNumbers(i).sort()

  if (!isSorted(sorted)) {
    throw new Error("`Array.prototype.sort` doesn't work with numbers!")
  }
}
```

Please note that actual property-based testing libraries, such as [jsverify](https://github.com/jsverify/jsverify), offer better coverage and confidence. With that said, Arbitrary can still be useful for quick sanity checks due its incredibly minimal API.

### Generative Designs in Sketch

Want to see your design in many fonts, colors, content, styles, and layouts? Arbitrary and React Sketchapp have got you!

## Why Not Random?

* **Not random.** Generates arbitrary data from numbers. Give the same number; get the same data
* **Preserves locality.** Give it closer numbers? Get similar data. Give it numbers further apart? Get different data.

This added control makes it a great foundation for advanced development and testing tools.

## Future Goals

* Recursive data
  * State transition trees
  * Time series data
  * Graphs
  * Lists
* Plug n' play for [`prop-types`](https://github.com/facebook/prop-types)
* Debugging tools
  * Hilbert curve of examples
  * Transition trees
