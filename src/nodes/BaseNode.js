import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const defaultNodeStyle = { width: 240 };

function toHandleSpec(h) {
  if (typeof h === 'string') return { id: h, label: h };
  return { id: h?.id, label: h?.label ?? h?.id };
}

function calcTopPct(idx, total) {
  if (!total) return '50%';
  return `${((idx + 1) * 100) / (total + 1)}%`;
}

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  style,
  children,
}) => {
  const removeNode = useStore((s) => s.removeNode);
  const inputSpecs = inputs.map(toHandleSpec).filter((h) => h?.id);
  const outputSpecs = outputs.map(toHandleSpec).filter((h) => h?.id);

  return (
    <div className="base-node" style={{ ...defaultNodeStyle, ...style }}>
      {inputSpecs.map((h, idx) => (
        <Handle
          key={`in-${h.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={{ top: calcTopPct(idx, inputSpecs.length) }}
        />
      ))}

      <div className="base-node__title">
        <span className="base-node__titleText">{title}</span>
        <button
          type="button"
          aria-label="Delete node"
          title="Delete node"
          className="base-node__delete"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeNode(id);
          }}
        >
          ×
        </button>
      </div>
      <div className="base-node__body">{children}</div>

      {outputSpecs.map((h, idx) => (
        <Handle
          key={`out-${h.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={{ top: calcTopPct(idx, outputSpecs.length) }}
        />
      ))}
    </div>
  );
};

