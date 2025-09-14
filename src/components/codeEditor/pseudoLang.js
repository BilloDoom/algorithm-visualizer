import * as monaco from 'monaco-editor';

export function registerPseudolang(monacoInstance) {
  // --- Register language ---
  monacoInstance.languages.register({ id: 'pseudolang' });

  // --- Syntax highlighting ---
  monacoInstance.languages.setMonarchTokensProvider('pseudolang', {
    keywords: ['def', 'if', 'while', 'for', 'return', 'true', 'false'],
    tokenizer: {
      root: [
        [/\b(def|if|while|for|return|true|false)\b/, 'keyword'],
        [/"[^"]*"/, 'string'],
        [/[0-9]+/, 'number'],
        [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
        [/[:=]/, 'operator'],
      ],
    },
  });

  // --- Auto-closing brackets & quotes ---
  monacoInstance.languages.setLanguageConfiguration('pseudolang', {
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '{', close: '}' },
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

        // Built-in functions
        {
          label: 'print',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'print(${1:value})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'drawBox',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'drawBox(${1:label})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'drawCircle',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'drawCircle(${1:x}, ${2:y}, ${3:radius})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'drawRect',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'drawRect(${1:x}, ${2:y}, ${3:width}, ${4:height})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'highlight',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'highlight(${1:node})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },

        // Scaffolds
        {
          label: 'def function',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'def ${1:name}(${2:params}):',
            '    ${3:pass}',
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'if ${1:condition}:',
            '    ${2:pass}',
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'while',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'while ${1:condition}:',
            '    ${2:pass}',
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'for ${1:i} in range(${2:n}):',
            '    ${3:pass}',
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      ];
      return { suggestions };
    },
  });

  // --- Error underlines (very basic validation) ---
  monacoInstance.editor.onDidCreateModel(model => {
    if (model.getModeId() === 'pseudolang') {
      model.onDidChangeContent(() => {
        const text = model.getValue();
        const markers = [];

        // Simple example: unmatched parentheses
        const openParens = (text.match(/\(/g) || []).length;
        const closeParens = (text.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: 'Unmatched parentheses',
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 1,
            endColumn: 1,
          });
        }

        // Apply markers
        monaco.editor.setModelMarkers(model, 'pseudolang-checker', markers);
      });
    }
  });
}
