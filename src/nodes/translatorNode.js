import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TranslatorNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [targetLang, setTargetLang] = useState(data?.target_language ?? 'en');

  return (
    <BaseNode
      id={id}
      title="Translator Node"
      inputs={['formatted_prompt']}
      outputs={['translated_text']}
    >
      <label>
        Target:
        <select
          value={targetLang}
          onChange={(e) => {
            const next = e.target.value;
            setTargetLang(next);
            updateNodeField(id, 'target_language', next);
          }}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
        </select>
      </label>
    </BaseNode>
  );
};

