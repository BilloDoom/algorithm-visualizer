import Editor from '@monaco-editor/react';
import { registerPseudolang } from './pseudoLang';
import './CodeEditor.css';

export default function CodeEditor({ value, onChange }) {
  function handleEditorMount(editor, monacoInstance) {
    registerPseudolang(monacoInstance);
  }

  return (
    <div className="code-editor">
      <Editor
        height="100%"
        defaultLanguage="pseudolang"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleEditorMount}
      />
    </div>
  );
}
