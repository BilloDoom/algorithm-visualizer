import { useState } from 'react';
import { parse } from './compiler/parser';
import { transpile } from './compiler/transpiler';
import { drawingAPI } from './compiler/runtime';

import CodeEditor from './components/codeEditor/CodeEditor';
import Header from './components/header/Header';
import VizArea from './components/vizArea/VizArea';
import Logger from './components/logger/Logger';

export default function App() {
  const [code, setCode] = useState('// write your algorithm here');
  const [logs, setLogs] = useState([]);

  const handleCompile = () => {
    try {
      const ast = parse(code);
      const js = transpile(ast);
      console.log('Transpiled JS:\n', js);
    } catch (err) {
      console.error('Compile Error:', err.message);
      setLogs([`Error: ${err.message}`]);
    }
  };

  const handleRun = () => {
    const output = [];
    const originalLog = console.log;

    console.log = (...args) => {
      output.push(args.join(' '));
    };

    try {
      const ast = parse(code);
      const js = transpile(ast);

      const sandbox = {
        ...drawingAPI,
        print: (...args) => console.log(...args),
      };

      const userFunc = new Function(...Object.keys(sandbox), js);
      userFunc(...Object.values(sandbox));
    } catch (err) {
      output.push(`Runtime Error: ${err.message}`);
    } finally {
      console.log = originalLog;
      setLogs(output);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onCompile={handleCompile} onPlay={handleRun} />
      <div style={{ display: 'flex', flex: 1 }}>
        <VizArea />
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <Logger logs={logs} />
        </div>
      </div>
    </div>
  );
}
