import Editor from '@monaco-editor/react';
import './CodeEditor.css';

export default function CodeEditor({ value, onChange }) {
  return (
    <div className="code-editor">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
