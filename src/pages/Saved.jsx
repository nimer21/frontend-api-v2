import { useState, useEffect } from "react";
import "../components/PixelGrid/./PixelGrid.css";
import { Button, Form, Modal } from "react-bootstrap";
import countries from "./../helpers/countries";
import { useSelector } from "react-redux";
import SummaryApi from "../common";
 
const Saved = ({ rows, cols }) => {
  const localStorageKey = "pixelGridImages";

  const user = useSelector(state => state?.user?.user);

  const fixedCols = 95; 
  const fixedRows = 75; 
  const [pixelSize, setPixelSize] = useState(0);
  const initialGrid =
    JSON.parse(localStorage.getItem(localStorageKey)) ||
    Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
  
  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid.push(
          <div key={`${i}-${j}`} className="pixel">
          </div>
        );
      }
    }
    return grid;
  };
  const [grid, setGrid] = useState(initialGrid); // default color for each pixel

  const [gridTemp, setGridTemp] = useState(initialGrid); // default color for each pixel

  const [selectedGrid, setSelectedGrid] = useState([]);

  const [selectedPixels, setSelectedPixels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  
  const [data, setData] = useState({
    selectedSquares: "",
    advImage: [],
    email: "",
    mobile:"",
    country: "",
    url: "",
    description: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const { selectedSquares, advImage, country, url, description } = data;
    if (
      !advImage.length ||
      !email ||
      !mobile ||
      !country ||
      !url ||
      !description
    ) {
      alert("جميع الحقول مطلوبة");
      return;
    }
  };
  //************************************************************************************ */
  useEffect(() => {
  }, [selectedPixels]);

  useEffect(() => {
    const calculatePixelSize = () => {
      const screenWidth = window.innerWidth-45;
      const screenHeight = window.innerHeight-45;
      console.log("screenWidth=====", screenWidth);
      console.log("screenHeight=====", screenHeight);

      const calculatedPixelWidth = Math.floor(screenWidth / fixedCols);
      const calculatedPixelHeight = Math.floor(screenHeight / fixedRows);

      const size = Math.min(calculatedPixelWidth, calculatedPixelHeight);
      console.log("Size=====", size);
      setPixelSize(size);
    };

    calculatePixelSize();
    window.addEventListener("resize", calculatePixelSize);

    return () => window.removeEventListener("resize", calculatePixelSize);
  }, [fixedCols, fixedRows]);
  const handlePixelClick = (index) => {
    if (selectedPixels.includes(index)) {
      setSelectedPixels(selectedPixels.filter((i) => i !== index));
    } else {
      setSelectedPixels([...selectedPixels, index]);
    }


    const newGrid = [...gridTemp];
    newGrid[index] = {
      ...newGrid[index],
      color: newGrid[index].color === "#ccc" ? "#000" : "#ccc",
    };
    setGridTemp(newGrid);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { selectedSquares, advCoName, advImage,email,mobile, country, url, description } = data;

    if (
      !advImage.length ||
      !advCoName ||
      !email ||
      !mobile ||
      !country ||
      !url ||
      !description
    ) {
      alert("جميع الحقول مطلوبة");
      return;
    }

    const newGrid2 = [...gridTemp];

    selectedPixels.forEach((index) => {
      newGrid2[index] = {
        ...newGrid2[index],
        advCoName: data.advCoName,
        country: data.country,
        color: "#ff0",
        email: data.email,
        mobile:data.mobile,
        url: data.url,
        description: data.description,
        name: user?.name,
        date: new Date().toLocaleString() + "",
      };
    });

    setGrid(newGrid2);
    setGridTemp(newGrid2);

    setData({
      selectedSquares: "",
      advImage: [],
      email:"",
      mobile:"",
      country: "",
      url: "",
      description: "",
    });

    setSelectedImage(null);
    setSelectedCountry("");
    setSelectedPixels([]); // Take Care Nimer

    handleCloseModal();
  };
  const handleOpenModal = () => {
    if (selectedPixels.length === 0) {
      alert("برجاء إختيار مربع واحد على الأقل.");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);

        setData((prev) => {
          return {
            ...prev,
            advImage: [...prev.advImage, reader.result],
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleReservedPixels = (selectedIndexes) => {
    setShowModal(false);
  };
  const handlePixelReset = (index) => {
    const newGrid = [...grid];
    newGrid[index] = {
      ...newGrid[index],
      image: null,
      advCoName: null,
      email:"",
      mobile:"",
      country: null,
      color: null,
      url: "",
      desc: null,
    };
    setGrid(newGrid);
  };
  //************************************************************************************ */

  const handleResetAll = () => {
    setGrid(newGrid2);
    setSelectedGrid([]);
  };
//************************************************************************************
  const fetchData = async () => {
    const response = await fetch(SummaryApi.request_pixels.url, {
      method: SummaryApi.request_pixels.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };
  //************************************************************************************ */

  useEffect(() => {
    fetchData();
  }, [grid]);
  //************************************************************************************ */

  return (
    <>
      <div className="flex mb-2 mr-5">

        <Button variant="primary" onClick={handleOpenModal}>
          إرسال المربعات المحجوزة
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        animation={true}
        size="lg"
        keyboard={false} 
        scrollable={false}
        restoreFocus={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body
         >
          هل أنت متأكد أنك تريد حجز المربعات؟{" "}
 <div className="grid grid-cols-6 border border-solid bg-primary font-bold text-white rounded-sm p-1">
  {selectedPixels.map((number) => <div key={number}>{number}</div>)}</div>

          <Form
            onSubmit={handleSubmit}
            className="grid p-4 gap-2 overflow-y-scroll h-full pb-5">

            <div className="flex">
              <Form.Group controlId="formImageUpload">
                <Form.Label>تحميل صورة الإعلان</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <div className="mt-2 w-32 h-32 mx-auto relative overflow-hidden">
                <img
                  src={
                    selectedImage || "https://picsum.photos/400/300?random=21"
                  }
                  alt="Advertising Image"
                  className="object-cover rounded-md hover:scale-105 duration-500"
                />
              </div>
            </div>            
            <Form.Label>إسم الشركة / المنتج: </Form.Label>
              <Form.Control
                type="text"
                placeholder="إسم الشركة / المنتج"
                name="advCoName"
                value={data.advCoName}
                onChange={handleOnChange}
                required
                autoFocus
                className="p-2 bg-slate-100 border rounded"
              >
              </Form.Control>        
              
            <Form.Group controlId="formCountrySelect">
            <div className="flex items-center">
              <Form.Label>الدولة: </Form.Label>
              <Form.Control
                as="select"
                value={data.country}
                name="country"
                onChange={handleOnChange}
              >
                <option value="">إختار الدولة...</option>
                {countries.map((ele, index) => {
                  return (
                    <option key={ele.value + index} value={ele.value}>
                      {ele.name}
                    </option>
                  );
                })}
              </Form.Control>

              <Form.Label>الرابط: </Form.Label>
              <Form.Control
                type="text"
                placeholder="رابط الموقع"
                name="url"
                value={data.url}
                onChange={handleOnChange}
                required
                autoFocus
                className="p-2 bg-slate-100 border rounded"
              >
              </Form.Control>
              </div>
            </Form.Group>

              <Form.Label>الفقرة التعريفية</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="أدخل نبذة عن المنتج / الشركة"
                value={data.description}
                name="description"
                onChange={handleOnChange}
                required
                no-resize
                className="p-2 bg-slate-100 border rounded max-h-32"
              />

               <div className="flex items-center">
            <Form.Label>الإيميل:</Form.Label>
              <Form.Control
                type="email"
                placeholder="البريد الإلكتروني"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                autoFocus
                className="p-2 bg-slate-100 border rounded w-3/6"
              >
              </Form.Control>

              <Form.Label>الهاتف:</Form.Label>
              <Form.Control
                type="text"
                placeholder="رقم الهاتف"
                name="mobile"
                value={data.mobile}
                onChange={handleOnChange}
                required
                autoFocus
                className="p-2 bg-slate-100 border rounded w-3/6"
              >
              </Form.Control>
              </div>          

            <Button variant="primary" type="submit" className="mt-3">
              إرسال
            </Button>
          </Form>
        </Modal.Body>
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
        {gridTemp.map((pixel, index) => (
          <div
            key={index}
            className={`pixel ${
              pixel.color !== "#000" && pixel.color !== "#ccc"
                ? "pointer-events-none"
                : "none"
            }`} //pointer-events-none
            style={{
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: pixel.image ? "transparent" : pixel.color,
              backgroundImage: pixel.image ? `url(${pixel.image})` : "none",
              backgroundSize: pixel.backgroundSize || "cover",
              backgroundPosition: pixel.backgroundPosition || "center",
              transition:
                "background-size 0.3s ease, background-position 0.3s ease",
            }}
            title={`إعلان ${index}`} // Add the tooltip text here
            onClick={() => handlePixelClick(index)}
            // onContextMenu={(e) => {
            //   e.preventDefault();
            //   handlePixelReset(index);
            // }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Saved;
