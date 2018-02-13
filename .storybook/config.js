import { configure } from '@storybook/react'

const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(fileName => req(fileName))
}

configure(loadStories, module)
