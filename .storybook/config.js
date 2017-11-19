import { configure } from '@storybook/react'


const req = require.context( '../src', true, /\.stories\.tsx$/ )

function loadStories() {
  req.keys().forEach( fileName => req( fileName ))
}

configure( loadStories, module )
