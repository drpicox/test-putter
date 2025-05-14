'use client';

import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as Monaco from 'monaco-editor';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode, updateCode } from '@/store/codeSlice';
import { incrementKeystrokes } from '@/store/keystrokesSlice';

// This component can now be used without props
const CodeEditor: React.FC = () => {
  const dispatch = useDispatch();
  const code = useSelector(selectCode);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    
    // Add keydown event listener to track keystrokes
    editor.onKeyDown((e: Monaco.IKeyboardEvent) => {
      // Only count actual keystrokes (not navigation, etc)
      const nonCountingKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Home', 'End', 'PageUp', 'PageDown',
        'Control', 'Alt', 'Shift', 'Meta',
        'Escape', 'Tab',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
      ];
      
      if (!nonCountingKeys.includes(e.code)) {
        dispatch(incrementKeystrokes());
      }
    });
  };

  const handleCodeChange = (value: string | undefined) => {
    dispatch(updateCode(value || ''));
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="javascript"
        value={code} // Use value instead of defaultValue to make it controlled
        onChange={handleCodeChange}
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