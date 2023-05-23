import React, { useState, useEffect } from "react";

const Editor = ({ text, onClick }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onClick(inputValue);
    setInputValue('');
  };

  return (
    <div className="editor">
      <input type="text" value={inputValue} onChange={handleInputChange}  />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default Editor;
