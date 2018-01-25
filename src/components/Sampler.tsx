import * as React from 'react'

import { Arbitrary } from '../../src/types'
import { monospaceFontFamily } from './style'

export interface SamplerProps {
  generator: Arbitrary<any>
  children: (sample: any, point: number) => React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export interface SamplerState {
  point: number
}

export default class Sampler extends React.Component<
  SamplerProps,
  SamplerState
> {
  public state = {
    point: 0,
  }

  public render() {
    const { generator, children, className, style = {} } = this.props
    const { point } = this.state

    const rendered = children(generator(point), point)

    return (
      <div style={{ ...samplerCSS, ...style }} className={className}>
        <div style={inputCSS}>
          <span style={numberCSS}>{point.toFixed(5)}</span>
          <input
            type="range"
            value={point}
            min={0}
            max={1}
            step={0.00001}
            onChange={this.onChange}
            style={sliderCSS}
          />
        </div>
        {rendered}
      </div>
    )
  }

  private onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const point = ev.target.value
    this.setState(s => ({ ...s, point: parseFloat(point) }))
  }
}

const samplerCSS: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const inputCSS: React.CSSProperties = {
  display: 'flex',
}

const numberCSS: React.CSSProperties = {
  fontFamily: monospaceFontFamily,
}

const sliderCSS: React.CSSProperties = {
  width: '100%',
}
