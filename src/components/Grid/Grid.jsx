import React from 'react'

const Grid = () => {
// Create an array with 10,000 elements
const cells = Array.from({ length: 10000 });

return (
  <div className="grid grid-cols-100 grid-rows-100 w-screen h-screen">
    {cells.map((_, index) => (
      <div
        key={index}
        className="border border-gray-300" // Optional: Add borders to see the grid items clearly
        style={{ aspectRatio: '1' }} // Maintain square shape
      ></div>
    ))}
  </div>
);
};

export default Grid