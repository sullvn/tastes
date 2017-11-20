import * as React from 'react'

import { Arbitrary } from '../../src/types';


interface PreviewProps {
  generator: Arbitrary<any>
}

interface PreviewState {
  input: number
}


export default class Preview extends React.Component<PreviewProps, PreviewState> {
  public state = {
    input: 0,
  }

  public render() {
    const { generator } = this.props
    const { input } = this.state

    return (
      <section>
        <input
          type="range"
          min={ 0 }
          max={ 1 }
          step={ 0.00001 }
          onChange={ this.onChange }
        />
        <pre>
          <samp>
            { JSON.stringify( generator( input ), undefined, 2 ) }
          </samp>
        </pre>
      </section>
    )
  }

  private onChange = ( ev: React.ChangeEvent<HTMLInputElement> ) => {
    const input = ev.target.value
    this.setState( s => ({ ...s, input }))
  }
}
