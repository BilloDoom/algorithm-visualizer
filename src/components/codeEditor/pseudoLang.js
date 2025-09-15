import * as monaco from 'monaco-editor';

export function registerPseudolang(monacoInstance) {
  // --- Register language ---
  monacoInstance.languages.register({ id: 'pseudolang' });

  // --- Syntax highlighting ---
  monacoInstance.languages.setMonarchTokensProvider('pseudolang', {
    keywords: ['def', 'if', 'while', 'for', 'return', 'true', 'false'],
    tokenizer: {
      root: [
        // Keywords
        [/\b(def|if|while|for|return|true|false)\b/, 'keyword'],

        // Strings
        [/"[^"]*"/, 'string'],

        // Numbers
        [/[0-9]+/, 'number'],

        // Function calls (identifier followed by "(")
        [/[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/, 'function'],

        // Identifiers
        [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],

        // Operators
        [/[:=]/, 'operator'],

        // Comments
        [/\/\/.*$/, 'comment'],
      ],
    },
  });

  // --- Theme override for pseudolang ---
  monacoInstance.editor.defineTheme('pseudolang-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955' },   // green
      { token: 'function', foreground: 'DCDCAA' },  // yellow-ish
      { token: 'keyword', foreground: '569CD6' },   // blue
      { token: 'string', foreground: 'CE9178' },    // orange
      { token: 'number', foreground: 'B5CEA8' },    // light green
    ],
    colors: {},
  });

  // Apply theme automatically
  monacoInstance.editor.setTheme('pseudolang-theme');

  // --- Auto-closing brackets & quotes ---
  monacoInstance.languages.setLanguageConfiguration('pseudolang', {
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '"', close: '"' },
    ],
  });

  // --- Completions (keywords, builtins, scaffolds) ---
  monacoInstance.languages.registerCompletionItemProvider('pseudolang', {
    provideCompletionItems: () => {
      const suggestions = [
        // Keywords
        ...['def', 'if', 'while', 'for', 'return'].map(keyword => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword + ' ',
        })),

        //#region Built-in functions
        {
          label: 'createCamera3D',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'createCamera3D(${1:px}, ${2:py}, ${3:pz}, ${4:lx}, ${5:ly}, ${6:lz})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'createCamera2D',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'createCamera2D(${1:x}, ${2:y}, ${3:zoom})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'print',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'print(${1:value})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'drawBox',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'drawBox(${1:x}, ${2:y}, ${3:z}, ${4:w}, ${5:h}, ${6:d})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      ];
      return { suggestions };
    },
  });
}
