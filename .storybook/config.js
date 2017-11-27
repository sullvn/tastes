import { configure } from '@storybook/react'


const req = require.context( '../stories', true, /\.stories\.jsx$/ )

function loadStories() {
  req.keys().forEach( fileName => req( fileName ))
}

configure( loadStories, module )
