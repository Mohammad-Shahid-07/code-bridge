"use client";
import React, { useState, useRef } from "react";
import { editor } from "monaco-editor";
import Monaco from "@monaco-editor/react";

const MyCodeEditor = ({
  code,
  language,
  onChange,
}: {
  code: string;
  language: string;
  onChange: (value: string) => void;
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="w-full h-full rounded-lg border border-gray-300 overflow-hidden">
      <Monaco
        language={language}
        height={"90vh"}
        theme="vs-dark"
        value={code}
        options={{
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

const Transformer = () => {
  const [tsCode, setTsCode] = useState<string>("");
  const [jsonData, setJsonData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleConvertToJSON = () => {
    if (!tsCode.trim()) {
      setError("TypeScript code cannot be empty.");
      return;
    }

    try {
      const parsedData = {
        content: tsCode,
      };
      const jsonString = JSON.stringify(parsedData, null, 2);
      setJsonData(jsonString);
      setError("");
    } catch (error) {
      setError("Error converting to JSON.");
    }
  };

  const handleConvertToTS = () => {
    if (!jsonData.trim()) {
      setError("JSON data cannot be empty.");
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonData);
      const tsContent = parsedJson.content;
      setTsCode(tsContent);
      setError("");
    } catch (error) {
      setError("Error converting to TypeScript.");
    }
  };

  const handleClear = () => {
    setTsCode("");
    setJsonData("");
    setError("");
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleCopy = (code: string) => {
    if (editorRef.current) {
      const editorValue = editorRef.current.getValue();
      navigator.clipboard.writeText(editorValue);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">TS/JSON Converter</h2>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">TypeScript Code</h3>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleClear}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Clear
            </button>
            <button
              onClick={handleConvertToJSON}
              disabled={!tsCode.trim()}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                !tsCode.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              Convert to JSON
            </button>
            <button
              onClick={() => handleCopy(tsCode)}
              className="bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500"
            >
              Copy
            </button>
          </div>
          <MyCodeEditor
            code={tsCode}
            language="javascript"
            onChange={setTsCode}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">JSON Data</h3>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleCopy(jsonData)}
              className="bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500"
            >
              Copy
            </button>
            <button
              onClick={handleConvertToTS}
              disabled={!jsonData.trim()}
              className={`bg-green-500 text-white px-4 py-2 rounded-md ${
                !jsonData.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
            >
              Convert to TypeScript
            </button>
          </div>
          <MyCodeEditor
            code={jsonData}
            language="json"
            onChange={setJsonData}
          />
        </div>
      </div>

      <div className="mt-28">
        <h3 className="text-xl font-semibold mb-4">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-auto p-4">
            <pre className="text-sm">{tsCode}</pre>
          </div>
          <div className="border rounded-lg overflow-auto p-4">
            <pre className="text-sm">{jsonData}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transformer;
