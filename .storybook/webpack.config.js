const path = require( 'path' )
const makeDefaultConfig = require( '@storybook/react/dist/server/config/defaults/webpack.config.js' )

module.exports = function( baseConfig, env ) {
  const config = makeDefaultConfig( baseConfig, env )

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve( __dirname, '../src' ),
    loader: require.resolve( 'ts-loader' ),
  })
  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
