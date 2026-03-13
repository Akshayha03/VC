import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const LanguageDetectorNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [detected, setDetected] = useState(data?.detected_language ?? 'auto');

  return (
    <BaseNode
      id={id}
      title="Detect Language"
      inputs={['text']}
      outputs={['detected_language']}
    >
      <label>
        Detected:
        <select
          value={detected}
          onChange={(e) => {
            const next = e.target.value;
            setDetected(next);
            updateNodeField(id, 'detected_language', next);
          }}
        >
          <option value="auto">Auto</option>
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

