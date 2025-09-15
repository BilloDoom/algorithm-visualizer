import { parse } from './parser.js';
import { transpile } from './transpiler.js';

/**
 * Compile pseudolang into JS and run it inside a sandbox.
 * @param {string} code - The pseudolang source code
 * @param {object} runtime - Runtime API (print, drawBox, cameras, etc.)
 */
export function compileAndRun(code, runtime = {}) {
  const ast = parse(code);
  const jsCode = transpile(ast);

  const func = new Function(...Object.keys(runtime), jsCode);
  func(...Object.values(runtime));

  return { transpiled: jsCode };
}
