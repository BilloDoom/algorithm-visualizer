import peg from 'peggy';
import grammar from './grammar/pseudolang.pegjs?raw';
import { preprocess } from './preprocess.js';

const parser = peg.generate(grammar);

export function parse(code) {
  const preprocessed = preprocess(code);

  //console.log(JSON.stringify(parser.parse(preprocessed), null, 2));

  return parser.parse(preprocessed);
}
