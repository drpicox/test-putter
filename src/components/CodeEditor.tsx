'use client';

import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onKeystroke: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onKeystroke }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Add keydown event listener to track keystrokes
    editor.onKeyDown((e: any) => {
      // Only count actual keystrokes (not navigation, etc)
      const nonCountingKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Home', 'End', 'PageUp', 'PageDown',
        'Control', 'Alt', 'Shift', 'Meta',
        'Escape', 'Tab',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
      ];
      
      if (!nonCountingKeys.includes(e.code)) {
        onKeystroke();
      }
    });
  };

  return (
    <div className="h-[400px] w-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          formatOnPaste: true,
          tabSize: 2,
        }}
        theme="vs-light"
      />
    </div>
  );
};

export default CodeEditor;