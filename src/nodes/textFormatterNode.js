import { useMemo, useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextFormatterNode = ({ id, data }) => {
  const defaultTemplate = useMemo(
    () => 'Translate the following text to English: {{text}}',
    []
  );
  const [template, setTemplate] = useState(data?.template ?? defaultTemplate);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const onChange = (e) => {
    const next = e.target.value;
    setTemplate(next);
    updateNodeField(id, 'template', next);
  };

  return (
    <BaseNode
      id={id}
      title="Text Formatter"
      inputs={['raw_text']}
      outputs={['formatted_prompt']}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Prompt template:
        <textarea
          value={template}
          onChange={onChange}
          rows={4}
          style={{ resize: 'none' }}
        />
      </label>
    </BaseNode>
  );
};

