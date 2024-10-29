import React, { useState, useEffect } from 'react';
import "../components/PixelGrid/PixelGrid.css";
import { useNavigate } from 'react-router-dom';
//************************************************************************************/

const Users = () => {

  const fixedCols = 95;
  const fixedRows = 75;
  const [pixelSize, setPixelSize] = useState(0);
  const initialGrid = Array(fixedRows * fixedCols).fill({ color: '#ccc', image: null });
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
//************************************************************************************/  
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

//************************************************************************************/
  // Function to convert API response to flat array with pixel number as index
  const convertAPIResponseToIndexedArray = (apiResponse, defaultColor = "#ccc", gridSize = 7125) => {
    // Initialize a flat array with default pixel objects
    const flatArray = Array.from({ length: gridSize }, () => ({
        image: null,  // Default image as null
        color: defaultColor,          // Default color for all pixels
    }));
  
    // Loop through each pixel object in the API response
    apiResponse?.forEach((pixelObj) => {
      const pixelData = Object.values(pixelObj)[0]; // Extract pixel data object
      const pixelIndex = parseInt(pixelData.pixel_number, 10); // Convert pixel_number to index
  
      // Place the pixel data at the corresponding index in the flat array
      flatArray[pixelIndex] = {
        image: pixelData.img || null,  // Use image from API or null if not provided
        status : pixelData.status,
        email: pixelData.email,
        phone: pixelData.phone,
        country: pixelData.country,
        link: pixelData.link,
        description: pixelData.description || null,
        unit: pixelData.unit,
        color: pixelData.color,          // Default color (or modify if necessary)
        type: pixelData.type,
        partial_img: pixelData.partial_img || null
      };
    });
  
    return flatArray; // Return the flat array with pixels indexed by pixel_number
  };

/*****************************************************************************************/
const handlePixelClick = async (index) => {
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
          //image: reader.result, // Store the image data URL
          partial_img: URL.createObjectURL(file), // Set the image to be displayed
        };

       //sendPixelData(index, file); // Upload the image to the server
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      console.log("file", file);
       // Send the pixel data to the backend
       await sendPixelData(index, file);
    }
  };
  input.click(); // Trigger the file input dialog    
};

/***************************************************************************************** */
    // Function to send pixel data to the backend
  const sendPixelData = async (index, file) => {
    const formData = new FormData();
    formData.append("pixel", index);
    formData.append("partial_img", file);

    try {
      const response = await fetch("https://pixelsback.localproductsnetwork.com/api/add/partial/img", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      // Fetch the updated pixel data after the upload
      await fetchPixelData(); // Refresh the grid with the latest data
      const data = await response.json();
      //console.log("Image uploaded successfully:", data);
    } catch (error) {
      //console.error("Error sending pixel data:", error);
    }
  };
//************************************************************************************/
const fetchPixelData = async () => {
  try {
    const response = await fetch("https://pixelsback.localproductsnetwork.com/api/all/pixels");
    const data = await response.json();
    const localStorageData = convertAPIResponseToIndexedArray(data);

    setGrid(localStorageData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching pixel data:", error);
    setLoading(false);
  }
};
//************************************************************************************/
  // Fetch pixel data when the component mounts
  useEffect(() => {
    fetchPixelData();
  }, []);

  // Log the updated `grid` state after it's changed
// useEffect(() => {
//   console.log("Grid state updated:", grid);
// }, [grid]);
//************************************************************************************/
  if (loading) {
    return <div className="flex items-center justify-center">جاري تحميل المربعات &#128512; ...</div>;
  }
  /**
   * color: "#ccc"
country: "قطر"
description: "Desc"
email: "lara@gmail.com"
image: "2024.08.21_اهل غزة في مصر.jpg"
link: "jobs.ps"
partial_img: null
phone: "0599857842"
status: "Approved"
type: "special"
unit: "8ad9266d-0212-486d-b689-3e635ad54c33"
   */
//************************************************************************************/
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
              backgroundColor: pixel.status === "pending" ? '#ff0' : "#ccc",
              backgroundImage: pixel.partial_img ? `url(https://pixelsback.localproductsnetwork.com/public/PartialImages/${pixel.partial_img})` : "none",
              //backgroundImage: pixel.partial_img ? `url(${pixel.partial_img})` : "none",
              backgroundSize: pixel.backgroundSize || 'cover',
              backgroundPosition: pixel.backgroundPosition || 'center',
              transition: 'background-size 0.3s ease, background-position 0.3s ease',
            }}
            title={`إعلان ${index}`} // Add the tooltip text here
            onDoubleClick={() => handlePixelClick(index)} // Upload image on double-click
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Users;
