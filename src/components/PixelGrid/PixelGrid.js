import React from 'react';
import './PixelGrid.css';

const PixelGrid = ({ rows, cols }) => {
  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid.push(<div key={`${i}-${j}`} className="pixel"></div>);
      }
    }
    return grid;
  };

  return <div className="grid-container">{createGrid()}</div>;
};

export default PixelGrid;