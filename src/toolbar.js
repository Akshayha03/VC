// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='languageDetector' label='Language Detector' />
                <DraggableNode type='textFormatter' label='Text Formatter' />
                <DraggableNode type='translator' label='Translator' />
                <DraggableNode type='llmEnhancer' label='LLM Enhancer' />
                <DraggableNode type='translationOutput' label='Output' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
