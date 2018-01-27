import * as React from 'react'
import { monospaceFontFamily, padding } from '../../src/components/style'

interface PreviewProps {
  code: React.ReactNode
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
  flexWrap: 'wrap',
}

const codeCSS: React.CSSProperties = {
  flexGrow: 1,
  margin: 0,
  padding,
  color: 'rgb(70, 70, 70)',
  backgroundColor: 'rgb(242, 242, 242)',
}

const sampleCSS: React.CSSProperties = {
  flexGrow: 1,
  margin: 0,
  padding,
  color: 'rgb(0, 0, 0)',
  backgroundColor: 'rgb(234, 234, 234)',
}
