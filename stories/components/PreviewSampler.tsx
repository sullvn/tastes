import * as React from 'react'

import Sampler, { SamplerProps } from '../../src/components/Sampler'
import Preview from './Preview'

interface PreviewSamplerProps extends Pick<SamplerProps, 'generator'> {
  code: (input: string) => string
}

export default function PreviewSampler(props: PreviewSamplerProps) {
  const { code, generator } = props

  return (
    <Sampler generator={generator} style={previewSamplerCSS}>
      {(sample, point) => (
        <Preview code={code(point.toFixed(5))} sample={sample} />
      )}
    </Sampler>
  )
}

const previewSamplerCSS: React.CSSProperties = {
  fontSize: '12px',
}
