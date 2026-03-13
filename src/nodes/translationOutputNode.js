import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TranslationOutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('translationOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode id={id} title="Output" inputs={['final_text']}>
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

