import text from './test.mdx';
import { readTxt } from '../../utils/siteFunctions';
import { useRef } from 'react';

const TextComponent = () => {
  const contentRef = useRef(null);
  const contentElement = contentRef.current
  // const output = readTxt(contentRef, text);
  return readTxt(contentRef, text)
  // return <div ref={contentRef}>{output}</div>
}

export default TextComponent;