'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { Button } from './ui/button';
import CodeEditor from './CodeEditor';

const Transformer = ({ data }: { data?: string }) => {
  const [tsCode, setTsCode] = useState<string>('');
  const [jsonData, setJsonData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const tsCodeRef = useRef(tsCode);
  const jsonDataRef = useRef(jsonData);

  useEffect(() => {
    tsCodeRef.current = tsCode;
  }, [tsCode]);

  useEffect(() => {
    jsonDataRef.current = jsonData;
  }, [jsonData]);

  useEffect(() => {
    if (data) {
      setTsCode(data);
    }
  }, [data]);

  const handleConvertToJSON = useCallback(() => {
    if (!tsCodeRef.current.trim()) {
      setError('TypeScript code cannot be empty.');
      return;
    }

    try {
      const parsedData = {
        content: tsCodeRef.current,
      };
      const jsonString = JSON.stringify(parsedData, null, 2);
      setJsonData(jsonString);
      scrollTo(
        document.documentElement.scrollHeight,
        document.documentElement.scrollHeight
      );
      setError('');
    } catch (error) {
      setError('Error converting to JSON.');
    }
  }, []);

  const handleConvertToTS = useCallback(() => {
    if (!jsonDataRef.current.trim()) {
      setError('JSON data cannot be empty.');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonDataRef.current);
      const tsContent = parsedJson.content;
      setTsCode(tsContent);
      scrollTo(0, 0);
      setError('');
    } catch (error) {
      setError('Error converting to TypeScript.');
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'y' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleConvertToJSON();
      }
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleConvertToTS();
      }
      if (e.key === 't' && (e.metaKey || e.altKey)) {
        e.preventDefault();
        handleCopy(tsCodeRef.current);
      }
      if (e.key === 'j' && (e.metaKey || e.altKey)) {
        e.preventDefault();
        handleCopy(jsonDataRef.current);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [handleConvertToJSON, handleConvertToTS]);

  const handleClear = () => {
    setTsCode('');
    setJsonData('');
    setError('');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="container mx-auto py- px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        TS/JSON Converter
      </h2>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="gap-6">
        <div className="">
          <div>
            <h3 className="text-xl font-semibold mb-4">TypeScript Code</h3>
            <div className="flex justify-between mb-4">
              <Button
                onClick={handleClear}
                variant={'outline'}

                // className=" px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Clear
              </Button>
              <Button
                onClick={handleConvertToJSON}
                disabled={!tsCode.trim()}
                variant={'secondary'}
                className={` px-4 py-2 rounded-md ${
                  !tsCode.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'
                }`}
              >
                Convert to JSON
              </Button>
              <Button
                onClick={() => handleCopy(tsCode)}
                className="bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500"
              >
                {copied ? <CopyCheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>

          <CodeEditor
            code={tsCode}
            language="javascript"
            onChange={setTsCode}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">JSON Data</h3>
          <div className="flex justify-between mb-4">
            <Button
              variant={'link'}
              onClick={() => handleCopy(jsonData)}
              className=" text-white px-4 py-2 rounded-md hover:bg-slate-800"
            >
              {copied ? <CopyCheckIcon /> : <CopyIcon />}
            </Button>
            <Button onClick={handleConvertToTS} disabled={!jsonData.trim()}>
              Convert to TypeScript
            </Button>
          </div>
          <CodeEditor code={jsonData} language="json" onChange={setJsonData} />
        </div>
      </div>
    </div>
  );
};

export default Transformer;
