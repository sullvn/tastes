import * as React from 'react'
import { monospaceFontFamily } from '../../src/components/style'

interface PreviewProps {
  code: string
  sample: any
}

export default function Preview({ code, sample }: PreviewProps) {
  return (
    <div style={previewCSS}>
      <pre style={codeCSS}>
        <code style={{ fontFamily: monospaceFontFamily }}>{code}</code>
      </pre>
      <pre style={sampleCSS}>
        <samp style={{ fontFamily: monospaceFontFamily }}>
          {JSON.stringify(sample, undefined, 2)}
        </samp>
      </pre>
    </div>
  )
}

const previewCSS: React.CSSProperties = {
  display: 'flex',
}

const codeCSS: React.CSSProperties = {
  marginRight: '3em',
}

const sampleCSS: React.CSSProperties = {
  flexGrow: 1,
}
