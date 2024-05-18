'use client';
import Monaco from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';

const CodeEditor = ({
  code,
  language,
  onChange,
}: {
  code: string;
  language: string;
  onChange: (value: string) => void;
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const [wordWrap, setWordWrap] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'z' && (e.metaKey || e.altKey)) {
        e.preventDefault();
        setWordWrap((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="w-full h-full rounded-lg border border-gray-300 overflow-hidden">
      <Monaco
        language={language}
        height={'90vh'}
        theme="vs-dark"
        value={code}
        options={{
          minimap: { enabled: true },
          automaticLayout: true,
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          wordWrap: wordWrap ? 'on' : 'off',
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
