import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropdownItem = ({ children, onClick }) => {
  return (
    <div 
      className="w-full p-2 m-px rounded-lg cursor-pointer hover:bg-blue-50 text-gray-700" 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Dropdown = ({ buttonText, content }) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState("100%"); // Armazena a posição como string

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    if (!open) {
      const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;

      // Calcula a posição e a armazena no estado
      if (spaceRemaining < contentHeight) {
        setDropdownTop(`-${contentHeight + 10}px`); // Move para cima
      } else {
        setDropdownTop("100%"); // Posição padrão abaixo do botão
      }
    }
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        ref={buttonRef}
        onClick={toggleDropdown}
        // Removi a estilização daqui para o buttonText controlar o visual
      >
        {buttonText}
      </div>

      <div
        ref={contentRef}
        style={{ top: dropdownTop }}
        className={`absolute right-0 min-w-full flex flex-col items-center mt-2 bg-white rounded-md shadow-lg transition-all duration-150 ease-in-out
          ${open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"}`}
      >
        {content}
      </div>
    </div>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;