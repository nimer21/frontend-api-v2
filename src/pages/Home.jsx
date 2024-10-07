import { useEffect, useState } from "react";
import "../components/PixelGrid/./PixelGrid.css";
import { Button, Form, Modal } from "react-bootstrap";
const Home = () => {
  const localStorageKey = "pixelGridImages";

  const fixedCols = 95; // Number of columns    77
  const fixedRows = 75; // Number of rows       65  => 5005
  const [pixelSize, setPixelSize] = useState(0);

  // Load grid from local storage or initialize it
  const initialGrid =
    //JSON.parse(localStorage.getItem(localStorageKey)) ||
    Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
  const [grid, setGrid] = useState(initialGrid);
  const [loading, setLoading] = useState(true); // State to show loading status

  const [showModalImage, setShowModalImage] = useState(false);
  const [showModalImageLG, setShowModalImageLG] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPixel, setSelectedPixel] = useState();

  const handleImageClick = (index) => {
    setSelectedPixel(index);
    setShowModalImage(true);
  };
  const handleCloseModal = () => {
    setShowModalImage(false);
    setShowModalImageLG(false);
    setSelectedImage(null);
    setSelectedPixel(null);
  };
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
    window.addEventListener("resize", calculatePixelSize);

    return () => window.removeEventListener("resize", calculatePixelSize);
  }, [fixedCols, fixedRows]);

  /********************************************************************************************************** */
const convertAPIResponseToIndexedArray = (apiResponse, defaultColor = "#ccc", gridSize = 7125) => {
  const flatArray = Array.from({ length: gridSize }, () => ({
      image: null,  
      color: defaultColor,          
  }));

  apiResponse.forEach((pixelObj) => {
    const pixelData = Object.values(pixelObj)[0]; 
    const pixelIndex = parseInt(pixelData.pixel_number, 10); 

    flatArray[pixelIndex] = {
      image: pixelData.img || null,  
      status : "Approved",
      email: pixelData.email,
      phone: pixelData.phone,
      country: pixelData.country,
      link: pixelData.link,
      description: pixelData.description || null,
      unit: pixelData.unit,
      color: defaultColor,         
      type: pixelData.type,
      partial_img: pixelData.partial_img || null
    };
  });

  return flatArray; 
};
/***************************************************************************************** */
  useEffect(() => {
    const fetchPixelData = async () => {
      try {
        const response = await fetch('https://pixelsback.localproductsnetwork.com/api/approved/pixels', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pixel data');
        }
        const data = await response.json();

        if (data && data.length > 0) {
         const localStorageData = convertAPIResponseToIndexedArray(data);
         const approvedGrid = localStorageData || Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
          //console.log(approvedGrid);

          setGrid(localStorageData); 
        } else {
          const newGrid = Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null }); 
          setGrid(newGrid);
          //console.log("data ",data[1].data); //
        }

        setLoading(false); 
      } catch (error) {
        console.error('Error fetching pixel data:', error);

        const newGrid = Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
        setGrid(newGrid);

        setLoading(false); 
      }
    };

    fetchPixelData();
  }, []); 

  if (loading) {
    return <div>Loading pixel grid...</div>;
  }
  /***************************************************************************************** */
  return (
    <div>
      <div className="flex justify-center">
      <p className="mr-7 mb-2 font-semibold text-lg flex justify-center">شبكة المنتجات المحلية</p>
      <p className="mr-7 mb-2 font-semibold text-lg flex justify-center">Local Products Network</p>
      </div>
      {/********************************************************************************************/}
  
      <Modal show={showModalImage} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="flex justify-between">
          <div className="w-9/12">
            <p className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold text-center">
              {grid[selectedPixel]?.email}
            </p>
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              disabled={true}
              placeholder={grid[selectedPixel]?.description}
              name="description"
              no-resize
              className="p-2 bg-slate-100 border rounded max-h-32"
            />
            <a href={grid[selectedPixel]?.link} 
            className="flex border border-solid mt-20 content-center items-center justify-center" 
            target="_blank">إضغط&nbsp;
            <p className="text-red-600 inline-block font-semibold">هنـا&nbsp;</p>
            للإنتقال للموقع</a>
          </div>

          {selectedPixel ? (
            <img
              src={"https://pixelsback.localproductsnetwork.com/public/PixelsImages/"+grid[selectedPixel]?.image}
              className="rounded-md object-cover"
              alt="Selected"
              style={{ width: "250px", height: "350px", marginRight:"9px" }}
            />
          ) : (
            "No image selected."
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalImageLG} onHide={handleCloseModal} size="sm">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="flex justify-between">
        {selectedPixel ? (
            <img
              src={"https://pixelsback.localproductsnetwork.com/public/PixelsImages/"+grid[selectedPixel]?.image}
              alt="Selected"
              className="object-cover rounded-md hover:scale-105 duration-500"
              style={{ width: "55px", height: "50px", marginRight:"9px",  marginLeft:"9px"}}
            />
          ) : (
            "No image selected."
          )}

          <div className="w-9/12 flex flex-col">

           <Form.Label className=""></Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              name="advCoName"
              value={grid[selectedPixel]?.email}
              autoFocus
              className="text-primary border rounded font-extrabold text-center mb-4"
            >
            </Form.Control>
           
            

            <a href={grid[selectedPixel]?.link} className="text-center" target="_blank">إضغط&nbsp;
            <p className="text-red-600 inline-block">هنـا</p> للإنتقال للموقع</a>

           
          </div>         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${fixedCols}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${fixedRows}, ${pixelSize}px)`,
          width: `${fixedCols * pixelSize}px`,
          height: `${fixedRows * pixelSize}px`,
          margin: "auto",
        }}
      >
        {grid.map((pixel, index) => (
          <div
            key={index}
            className="pixel border-0"
            style={{
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: pixel.image ? "transparent" : pixel.color,
              backgroundImage: pixel.image ? `url(https://pixelsback.localproductsnetwork.com/public/PixelsImages/${pixel.image})` : "none",
              backgroundSize: pixel.backgroundSize || "cover",
              backgroundPosition: pixel.backgroundPosition || "center",
              transition:
                "background-size 0.3s ease, background-position 0.3s ease",
            }}
            title={`خلية رقم ${index}`} 
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
