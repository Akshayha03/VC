import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const LLMEnhancerNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [strength, setStrength] = useState(data?.enhance_strength ?? 'medium');

  return (
    <BaseNode
      id={id}
      title="Enhance Translation"
      inputs={['translated_text']}
      outputs={['final_text']}
    >
      <label>
        Strength:
        <select
          value={strength}
          onChange={(e) => {
            const next = e.target.value;
            setStrength(next);
            updateNodeField(id, 'enhance_strength', next);
          }}
        >
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="strong">Strong</option>
        </select>
      </label>
    </BaseNode>
  );
};

