import * as React from 'react'
import { Arbitrary } from 'src'
import { monospaceFontFamily, padding } from './style'

/**
 * Render arbitrary samples in realtime with an interactive slider.
 */
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
          <span style={numberCSS}>{point.toFixed(8)}</span>
          <input
            type="range"
            value={point}
            min={0}
            max={0.99999999}
            step={0.00000001}
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

export interface SamplerProps {
  /**
   * Arbitrary generator to render in the sampler
   */
  generator: Arbitrary<any>

  /**
   * Renderer of samples to React nodes
   */
  children: (sample: any, point: number) => React.ReactNode

  style?: React.CSSProperties
  className?: string
}

export interface SamplerState {
  point: number
}

const samplerCSS: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const inputCSS: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding,
  color: 'rgb(100, 100, 100)',
  backgroundColor: 'rgb(249, 249, 249)',
}

const numberCSS: React.CSSProperties = {
  fontFamily: monospaceFontFamily,
}

const sliderCSS: React.CSSProperties = {
  width: '100%',
}
