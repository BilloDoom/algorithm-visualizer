import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const EditorPanel = () => {
  const [code, setCode] = useState(`# Your code here\nprint("Hello")`);

  const handleChange = (value) => {
    setCode(value);
  };

  return (
    <div className="editor-panel">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditorPanel;
