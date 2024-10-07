import React, { useState, useEffect } from 'react';
import "../components/PixelGrid/PixelGrid.css";
import SummaryApi from '../common';

const Users = ({ rows, cols }) => {
  const localStorageKey = 'pixelGridImages';

  const fixedCols = 95; 
  const fixedRows = 75; 
  const [pixelSize, setPixelSize] = useState(0);
  const initialGrid = JSON.parse(localStorage.getItem(localStorageKey)) || 
                      Array(fixedRows * fixedCols).fill({ color: '#ccc', image: null });
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    const calculatePixelSize = () => {
      const screenWidth = window.innerWidth-45;
      const screenHeight = window.innerHeight-45;

      const calculatedPixelWidth = Math.floor(screenWidth / fixedCols);
      const calculatedPixelHeight = Math.floor(screenHeight / fixedRows);

      const size = Math.min(calculatedPixelWidth, calculatedPixelHeight);
      setPixelSize(size);

    };

    calculatePixelSize();
    window.addEventListener('resize', calculatePixelSize);

    return () => window.removeEventListener('resize', calculatePixelSize);
  }, [fixedCols, fixedRows]);

  

  const transferPixelsToBackend = async () => {
    const pixelData = localStorage.getItem(localStorageKey);
  
    if (!pixelData) {
      console.error('No pixel data found in localStorage');
      return;
    }
    const dataToSend = {
      pixels: JSON.parse(pixelData), 
    };
    console.log("dataToSend =>  ",dataToSend); 
    console.log("dataToSend.pixels.Array(7125) =>  ",dataToSend.pixels[0].color);
  
    try {
      const response = await fetch(SummaryApi.add_partial_img.url, { //'https://demo1.art-feat.com/api/add/partial/img'
        method: SummaryApi.add_partial_img.method, 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          pixel: 3,
          partial_img: dataToSend.pixels[3].image,
        }), 
        
      });
  
      if (!response.ok) {
        throw new Error('Failed to send pixel data');
      }
  
      const result = await response.json();
      console.log('Pixel data successfully sent:', result);
    } catch (error) {
      console.error('Error sending pixel data:', error);
    }
  };
  
  const handlePixelClick = (index) => {
    console.log('Selected pixel index:', index); 
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {    
          const newGrid = [...grid];
          newGrid[index] = {
            ...newGrid[index],
            image: reader.result, 
          };
          setGrid(newGrid);
        };
        reader.readAsDataURL(file); 
        console.log("file", file);
      }
    };
    input.click(); 
  };


  const handlePixelColorClick = (index) => {
    console.log('Selected pixel index:', index); 
    const newGrid = [...grid];
    newGrid[index] = {
      ...newGrid[index],
      color: newGrid[index].color === '#ff0' ? '#00BF00' : newGrid[index].color === '#00BF00'? '#ff0' : "#ccc" 
    };
    setGrid(newGrid);
  };


  const handlePixelReset = (index) => {
    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], image: null, country: null, color: "#ccc", name: null, date: null,
      description: null, email:null, mobile:null, url:null, width: null, height: null};
    setGrid(newGrid);
  };

  const handleResetAll = () => {
    const newGrid = grid.map(pixel => ({ ...pixel, image: null }));
    setGrid(newGrid);
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(grid));
  }, [grid]);
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${fixedCols}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${fixedRows}, ${pixelSize}px)`,
          width: `${fixedCols * pixelSize}px`,
          height: `${fixedRows * pixelSize}px`,
          margin: 'auto',
        }}
      >
        {grid.map((pixel, index) => (
          <div
            key={index}
            className="pixel"
            style={{
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: pixel.image ? 'transparent' : pixel.color,
              backgroundImage: pixel.image ? `url(${pixel.image})` : 'none',
              backgroundSize: pixel.backgroundSize || 'cover',
              backgroundPosition: pixel.backgroundPosition || 'center',
              transition: 'background-size 0.3s ease, background-position 0.3s ease',
            }}
            title={`مربع ${index}`} 
            onClick={() => handlePixelColorClick(index)} 
            onDoubleClick={() => handlePixelClick(index)} 
            onContextMenu={(e) => {
              e.preventDefault();
              handlePixelReset(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Users;
