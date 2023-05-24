/**
 * 1. При клике на правый плюс добавить колонку +
 * 2. При клике на нижний плюс добавить строку +
 * 3. При клике на ячейку выделить ячейку цветом и вывести значение в поле ввода +
 * 4. При нажатии 'Сохранить' изменить значение выбранной ячейки и очистить поле ввода +
 * 5. Оптимизировать код, перерисовываться должна только выделенная ячейка и та, что была выделена до нее +
 */

import React, { useEffect, useState, useCallback } from "react";
import Item from "./Item";
import Editor from "./Editor";
import "./styles.css";
import _ from "lodash";

export default function App() {
  const [data, setData] = useState({});
  const [rows, setRows] = useState(_.range(1));
  const [columns, setColumns] = useState(_.range(1));
  const [selectedCell, setSelectedCell] = useState(null);
  const [prevSelectedCell, setPrevSelectedCell] = useState(null);
  const [selectedCellValue, setSelectedCellValue] = useState('')

  // добавить строку
  const increaseRows = useCallback(() => {
    setRows(prevRows => [...prevRows, _.last(prevRows) + 1]);
  }, []);

  // добавить колонку
  const increaseColumns = useCallback(() => {
    setColumns(prevColumns => [...prevColumns, _.last(prevColumns) + 1]);
  }, []);

  // сохранить параметры выделенной ячейки при клике на неё
  const handleClickCell = useCallback((rowIndex, columnIndex) => {
    setPrevSelectedCell(selectedCell);
    setSelectedCell({ rowIndex, columnIndex });
  }, [selectedCell]);

  // получить значение выделенной ячейки
  useEffect(() => {
    setSelectedCellValue(data[`${selectedCell?.rowIndex}-${selectedCell?.columnIndex}`])
  }, [selectedCell]);

  // изменить значение выделенной ячейки
  const handleSave = useCallback(
    (text) => {
      const cellKey = `${selectedCell?.rowIndex}-${selectedCell?.columnIndex}`;
      const prevCellKey = `${prevSelectedCell?.rowIndex}-${prevSelectedCell?.columnIndex}`;
      setData((prevData) => ({ ...prevData, [cellKey]: text }));

      if (prevCellKey !== cellKey) {
        setData((prevData) => ({ ...prevData, [prevCellKey]: text }));
      }
    },
    [selectedCell, prevSelectedCell]
  );

  return (
    <div className="App">
      <h1>Таблица</h1>
      <Editor text={selectedCellValue || ""} onClick={handleSave}  />
      <div className="list">
        <div className="header">
          {_.map(columns, (j) => (
            <div key={j} className="column">{j}</div>
          ))}
          <button onClick={increaseColumns} className="column-add">+</button>
        </div>
        {_.map(rows, (i) => (
          <div className="row">
            <div className="row-index">{i}</div>
            {_.map(columns, (j) => (
              <Item
                key={`${i}-${j}`}
                text={data[`${i}-${j}`]}
                rowIndex={i}
                columnIndex={j}
                onClick={handleClickCell}
                isSelected={selectedCell?.rowIndex === i && selectedCell?.columnIndex === j}
              />
            ))}
          </div>
        ))}
        <div className="row">
          <button onClick={increaseRows} className="row-add">+</button>
        </div>
      </div>
    </div>
  );
}
