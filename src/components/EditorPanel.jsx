import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import SandboxRunner from './SandboxRunner';

const EditorPanel = () => {
  const [compiledCode, setCompiledCode] = useState('');
  const [code, setCode] = useState(`# Your code here\nprint("Hello")`);

  const handleChange = (value) => {
    setCode(value);
  };

  const handleCompile = async () => {
    try {
      const response = await axios.post('http://localhost:3001/compile', {
        code
      });

      if (response.data.success) {
        console.log("js compiled successfully");
        setCompiledCode(response.data.compiled);
      } else {
        console.error("js compilation failed");
      }
    } catch (err) {
      console.error("server error");
    }
  };



  return (
    <div className="editor-panel">
      <button onClick={handleCompile}>Compile</button>
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
      />
      {compiledCode && (
        <SandboxRunner code={compiledCode} />
      )}
    </div>
  );
};

export default EditorPanel;
