import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserTypescript from 'prettier/parser-typescript';

export const   formatCode = async(
  code: string,
  parser: 'babel' | 'typescript' | 'json'
) => {
  try {
    return await prettier.format(code, {
      parser,
      plugins: [parserBabel, parserTypescript],
    });
  } catch (error) {
    console.error('Error formatting code:', error);
    return code; // return the original code if formatting fails
  }
};
