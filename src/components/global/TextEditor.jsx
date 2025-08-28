import { useEffect, useRef } from 'react';

const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const savedRange = useRef(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      savedRange.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedRange.current) {
      selection.removeAllRanges();
      selection.addRange(savedRange.current);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      saveSelection();
    }
  };

  const applyFormat = (command, value = null) => {
    restoreSelection();
    document.execCommand(command, false, value);
    handleInput();
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-md shadow-sm">
      <div className="flex flex-wrap p-2 border-b border-gray-300 gap-1">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('bold');
          }}
          className="p-1 font-bold text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('italic');
          }}
          className="p-1 italic text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('underline');
          }}
          className="p-1 underline text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          U
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('strikeThrough');
          }}
          className="p-1 line-through text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          S
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('insertUnorderedList');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 3a1 1 0 100 2h12a1 1 0 100-2H4zm-1 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('insertOrderedList');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V2zm0 6a1 1 0 011-1h10a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm1 4a1 1 0 00-1 1v1a1 1 0 001 1h10a1 1 0 001-1v-1a1 1 0 00-1-1H5z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('justifyLeft');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('justifyCenter');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('justifyRight');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('justifyFull');
          }}
          className="p-1 text-gray-700 hover:bg-gray-200 rounded-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <input
          type="color"
          onInput={(e) => applyFormat('foreColor', e.target.value)}
          className="w-8 h-8 rounded-sm p-0 border-0 cursor-pointer"
          title="Cor do Texto"
        />
        <input
          type="color"
          onInput={(e) => applyFormat('backColor', e.target.value)}
          className="w-8 h-8 rounded-sm p-0 border-0 cursor-pointer"
          title="Cor de Fundo"
        />
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        className="min-h-[150px] p-2 overflow-y-auto outline-none"
      />
    </div>
  );
};

export default TextEditor;