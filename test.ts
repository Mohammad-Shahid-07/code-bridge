import babel from "@babel/core";
export function transformToJSON(jsCode) {
  const ast = babel.parse(jsCode, { sourceType: "module" });

  // Extract relevant information from the AST
  const files = [];
  babel.traverse(ast, {
    enter(path) {
      if (path.isProgram()) {
        // Example: Extract file content from the program body
        const content = jsCode; // or use path.node.body to get specific content
        files.push({ name: "page.tsx", content });
      }
    },
  });

  const jsonData = {
    name: "new-password",
    files,
    type: "app:(auth)",
  };

  return JSON.stringify(jsonData, null, 2); // Indent JSON for readability
}

// Example usage:
const jsCode = `
import { NewPasswordForm } from '@/components/auth/NewPasswordForm';
import React from 'react';

const Page = () => {
  return (
    <NewPasswordForm />
  );
};

export default Page;
`;

const jsonString = transformToJSON(jsCode);
console.log(jsonString);
