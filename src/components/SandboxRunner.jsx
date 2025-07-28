import { useEffect, useRef } from 'react';

const SandboxRunner = ({ compiledCode }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && compiledCode) {
      iframeRef.current.contentWindow.postMessage(compiledCode, '*');
    }
  }, [compiledCode]);

  return (
    <iframe
      ref={iframeRef}
      src="sandbox.html"
      sandbox="allow-scripts"
      style={{ width: '100%', height: '200px', border: '1px solid #ccc' }}
      title="sandbox"
    />
  );
};

export default SandboxRunner;
