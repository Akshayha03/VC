// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode id={id} title="LLM" inputs={['system', 'prompt']} outputs={['response']}>
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
