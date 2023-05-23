import React from "react";

const Item = ({ text, onClick, rowIndex, columnIndex, isSelected }) => {
  const backgroundColor = isSelected ? 'rgba(255, 184, 184, 0.55)' : 'initial';

  return (
    <div
      style={{ backgroundColor }}
      onClick={() => {onClick(rowIndex, columnIndex)}}
      className="item">{text}
    </div>
  )
};

export default Item;
