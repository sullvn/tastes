import * as React from 'react'

import SamplerSlider, {
  SamplerSliderProps,
} from '../../src/components/SamplerSlider'
import Preview from './Preview'

interface PreviewSamplerProps extends Pick<SamplerSliderProps, 'sampler'> {
  code: (input: string) => string
}

export default function PreviewSampler(props: PreviewSamplerProps) {
  const { code, sampler } = props

  return (
    <SamplerSlider sampler={sampler} style={previewSamplerCSS}>
      {(sample, point) => (
        <Preview code={code(point.toFixed(8))} sample={sample} />
      )}
    </SamplerSlider>
  )
}

const previewSamplerCSS: React.CSSProperties = {
  fontSize: '12px',
  margin: '2em',

  borderRadius: '.2em',
  overflow: 'hidden',
  boxShadow: '0 0 4px rgb(0, 0, 0, 0.2)',
}
