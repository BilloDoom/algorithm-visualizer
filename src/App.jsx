import { useState, useRef } from 'react';
import { parse } from './compiler/parser';
import { transpile } from './compiler/transpiler';

import CodeEditor from './components/codeEditor/CodeEditor';
import Header from './components/header/Header';
import VizArea from './components/vizArea/VizArea';
import Logger from './components/logger/Logger';

export default function App() {
  const [code, setCode] = useState('// write your algorithm here');
  const [logs, setLogs] = useState([]);
  const vizRef = useRef();

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

  /*
  const handleRun = () => {
    const output = [];
    const originalLog = console.log;

    console.log = (...args) => {
      output.push(args.join(' '));
    };

    try {
      // Trigger visualization execution inside VizArea
      vizRef.current?.runVisualization();
    } catch (err) {
      output.push(`Runtime Error: ${err.message}`);
    } finally {
      console.log = originalLog;
      setLogs(output);
    }
  };
*/

  const handleRun = () => {
    try {
      vizRef.current?.runVisualization();
    } catch (err) {
      setLogs((prev) => [...prev, `Runtime Error: ${err.message}`]);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onCompile={handleCompile} onPlay={handleRun} />
      <div style={{ display: 'flex', flex: 1 }}>
        <VizArea ref={vizRef} code={code} onLog={(msg) => setLogs((prev) => [...prev, msg])} />
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
