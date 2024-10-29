import { useState, useEffect } from "react";
import "../components/PixelGrid/./PixelGrid.css";
import { Button, Form, Modal } from "react-bootstrap";
import countries from "./../helpers/countries";
import axios from "../api/axios";
import SummaryApi from "../common";
//************************************************************************************ */
const Saved = () => {
  const token = sessionStorage.getItem('authTokenJWT');

  const fixedCols = 95;
  const fixedRows = 75;
  const [pixelSize, setPixelSize] = useState(0);
  const initialGrid = Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
    const [loading, setLoading] = useState(true);
  //************************************************************************************
  const [grid, setGrid] = useState(initialGrid);

  const [gridTemp, setGridTemp] = useState(initialGrid);

  const [selectedGrid, setSelectedGrid] = useState([]);

  const [selectedPixels, setSelectedPixels] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  //************************************************************************************
  const [data, setData] = useState({
    pixel: [],
    img: [],
    advCoName:"",
    email: "",
    phone:"",
    country: "",
    link: "",
    description: "",
    type: "",
  });
    //************************************************************************************
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //setData({ ...data, [e.target.name]: e.target.value });
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //************************************************************************************

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        //setSelectedImage(file);

        setData((prev) => {
          return {
            ...prev,
            //img: [...prev.img, reader.result],
            img: [...prev.img, file],
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };
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
    window.addEventListener("resize", calculatePixelSize);

    return () => window.removeEventListener("resize", calculatePixelSize);
  }, [fixedCols, fixedRows]);
  //************************************************************************************/
  const handlePixelClick = (index) => {
    if (selectedPixels.includes(index)) {
      setSelectedPixels(selectedPixels.filter((i) => i !== index));
    } else {
      setSelectedPixels([...selectedPixels, index]);
    }

    const newGrid = [...gridTemp];
    newGrid[index] = {
      ...newGrid[index],
      color: newGrid[index].color === "#ccc" ? "#000" : "#ccc", // Toggle color
    };
    setGridTemp(newGrid);
  };
  //************************************************************************************ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const { pixel, img,advCoName, email,phone, country, link, description } = data;

    if (
      // !selectedSquares ||
      !img.length ||
      !advCoName ||
      !email ||
      !phone ||
      !country ||
      !link ||
      !description
    ) {
      alert("جميع الحقول مطلوبة");
      return;
    }

    const newGrid2 = [...gridTemp];

    selectedPixels?.forEach((index) => {
      newGrid2[index] = {
        ...newGrid2[index],
        //image: selectedImage,
        //country: selectedCountry,
        pixel_number: index.toString(),
        pixel: selectedPixels,
        img:data.img[0],
        email: data.email,
        phone:data.phone,
        country: data.country,
        link: data.link,
        description: data.description,
        type: data.type,
        advCoName: data.advCoName,
        color: "#ff0",
        //description: desc,
        //name: user?.name,
        //date: new Date().toLocaleString() + "",
      };
    });

    //console.log("selectedPixels",selectedPixels); // (4) [11, 10, 105, 106]
    setGrid(newGrid2);
    setGridTemp(newGrid2);

    sendPixelsToBackend(data, token);

    //setData(null);
    // clear form data
    setData({
      pixel: [],
      img: [],
      advCoName:"",
      email:"",
      phone:"",
      country: "",
      link: "",
      description: "",
      type: "",
    });

    setSelectedImage(null);
    setSelectedCountry("");
    setSelectedPixels([]); // Take Care Nimer

    handleCloseModal();
  };
  //************************************************************************************
  const handleOpenModal = () => {
    if (selectedPixels.length === 0) {
      alert("برجاء إختيار مربع واحد على الأقل.");
      return;
    }
    setData((prev) => {
      return {
        ...prev,
        //img: [...prev.img, reader.result],
        pixel: [...prev?.pixel, selectedPixels],
      };
    });

    setShowModal(true);
  };
  //************************************************************************************

  const handleCloseModal = () => {
    setShowModal(false);
    // setSelectedImage(null);
    // setSelectedCountry('');
    // setSelectedPixels([]); // Take Care Nimer
  };
  //************************************************************************************
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
        advCoName: pixelData.company_name, 
        status : pixelData.status,
        email: pixelData.email,
        phone: pixelData.phone,
        country: pixelData.country,
        link: pixelData.link,
        description: pixelData.description || null,
        unit: pixelData.unit,
        color: defaultColor,          // Default color (or modify if necessary)
        type: pixelData.type,
        partial_img: pixelData.partial_img || null
      };
    });
  
    return flatArray; // Return the flat array with pixels indexed by pixel_number
  };
    
  /***************************************************************************************** */
const sendPixelsToBackend = async (pixelData, token) => {
  try {

  const formData = new FormData();
  
  // Add the image
  formData.append('img', pixelData.img[0]); //image_url_or_base64_encoded_image
  formData.append('advCoName', pixelData.advCoName); //image_url_or_base64_encoded_image

  // Add other fields
  formData.append('email', pixelData.email);
  formData.append('phone', pixelData.phone);
  formData.append('country', pixelData.country);
  formData.append('link', pixelData.link);
  formData.append('description', pixelData.description);
  formData.append('type', "#ff0");
  formData.append('color', "#ff0");

  // Add each pixel value
  selectedPixels.forEach((pixel, index) => {
    formData.append(`pixel[${index}]`, pixel); // Laravel expects pixel.* notation
  });

    const responseRequest = await axios.post(
      "api/request/pixels",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, //{"message":"Unauthenticated."} | 401 (Unauthorized)
          'Content-Type': 'multipart/form-data'
        },
      }
    );

    /** Network Response from backend
     * {
    "message": "The img field must be a file of type: png, jpg, jpeg, gif, svg, webp.",
    "errors": {
        "img": [
            "The img field must be a file of type: png, jpg, jpeg, gif, svg, webp."
        ]
    }
}
     */

    // if (!responseRequest.ok) {
    //   throw new Error('Failed to send pixel data to backend');
    // }

    //console.log('Response from backend:', responseRequest); // resp.data.message =  "message": "a request has been sent to the admin , waiting for admin's approval"
    //{data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}

    //return result;

  } catch (error) {
    console.error('Error sending pixel data:', error);
    console.error('token', token);
  }
};

/** Network Response from backend
 * {
    "message": "The img field is required. (and 4 more errors)",
    "errors": {
        "img": [
            "The img field is required."
        ],
        "email": [
            "The email field is required."
        ],
        "phone": [
            "The phone field is required."
        ],
        "country": [
            "The country field is required."
        ],
        "link": [
            "The link field is required."
        ]
    }
}
 */
  //************************************************************************************ */
// Fetch data from the backend or initialize a new grid
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

        setGrid(localStorageData); // Use the fetched pixel data
        setGridTemp(localStorageData); // Use the fetched pixel data
        //console.log("data.pixels ",localStorageData); //
      } else {
        // Initialize a new grid with default values if no data is found
        //const newGrid = initializeGrid(10, 10); // For example, 10x10 grid
        const newGrid = Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null }); // For example, 10x10 grid
        setGrid(newGrid);
        setGridTemp(newGrid);
        //console.log("data ",data[1].data); //
      }

      setLoading(false); // Data loaded
    } catch (error) {
      console.error('Error fetching pixel data:', error);

      // If error occurs, initialize a new grid
      const newGrid = Array(fixedRows * fixedCols).fill({ color: "#ccc", image: null });
      setGrid(newGrid);
      setGridTemp (newGrid);

      setLoading(false);
    }
  };

  fetchPixelData();
}, []);

  //************************************************************************************ */

if (loading) {
  return <div className="flex items-center justify-center">جاري تحميل المربعات &#128512; ...</div>;
}
//************************************************************************************
  return (
    <>
      <div className="flex mb-2 mr-5">
        <Button variant="primary" onClick={handleOpenModal}>
          إرسال المربعات المحجوزة
        </Button>
      </div>

      <Modal
        show={showModal}
        //onHide={() => setShowModal(false)}
        onHide={handleCloseModal}
        animation={true}
        size="lg"
        keyboard={false} //Close the modal when escape key is pressed
        scrollable={false}
        restoreFocus={true}
        //dialogClassName="modal-80w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body
         //max-height= {calc('100vh - 210px')}
         //overflow-y= {auto}
         >
          هل أنت متأكد أنك تريد حجز المربعات؟{" "}
 <div className="grid grid-cols-6 border border-solid bg-primary font-bold text-white rounded-sm p-1">
  {selectedPixels?.map((number) => <div key={number}>{number}</div>)}</div>

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
                //onChange={handleUrlChange}
                //value={data.url}
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
                //onChange={handleCountryChange}
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
                {/* Add more countries as needed */}
              </Form.Control>

              <Form.Label>الرابط: </Form.Label>
              <Form.Control
                type="text"
                placeholder="رابط الموقع"
                name="link"
                value={data.link}
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
                //resize= "none"
                no-resize
                className="p-2 bg-slate-100 border rounded max-h-32"
              />

               <div className="flex items-center">
            <Form.Label>الإيميل:</Form.Label>
              <Form.Control
                type="email"
                placeholder="البريد الإلكتروني"
                //value={data.url}
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
                //onChange={handleUrlChange}
                //value={data.url}
                name="phone"
                value={data.phone}
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
              pixel.color !== "#000" && pixel.color !== "#ccc" || pixel.image !== null
                ? "pointer-events-none"
                : "none"
            }`} //pointer-events-none
            style={{
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: pixel.image ? "transparent" : pixel.color,
              backgroundImage: pixel.partial_img ? `url(https://pixelsback.localproductsnetwork.com/public/PartialImages/${pixel.partial_img})` : "none",
              backgroundSize: pixel.backgroundSize || "cover",
              backgroundPosition: pixel.backgroundPosition || "center",
              transition:
                "background-size 0.3s ease, background-position 0.3s ease",
            }}
            title={`إعلان ${index}`} // Add the tooltip text here
            onClick={() => handlePixelClick(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Saved;
