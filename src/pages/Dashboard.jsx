import { useEffect, useState } from "react";

const Dashboard = () => {
  const [contentData, setContentData] = useState();
  const [contentDataDes, setContentDataDes] = useState();
  const [loading, setLoading] = useState(true);


  const fetchContentData = async () => {
    try {
      const response = await fetch("https://pixelsback.localproductsnetwork.com/api/contents");
      const data = await response.json();
      //console.log("data:", data);
  
      setContentData(data);
      setLoading(false);
      const responseWithoutHtml = data[3]?.description;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = responseWithoutHtml;
      const cleanText = tempDiv.textContent || "";
      setContentDataDes(cleanText);
      //console.log("responseWithoutHtml:", contentDataDes);
  
    } catch (error) {
      console.error("Error fetching Content Data data:", error);
      setLoading(false);
    }
  };
  //************************************************************************************/
  // Fetch Content data when the component mounts
  useEffect(() => {
    fetchContentData();
  }, []);
//************************************************************************************/
  if (loading) {
    return <div className="flex justify-center">جاري التحميل للصفحة...</div>;
  }
  //************************************************************************************/
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="w-full object-cover md:w-48 mt-16 rounded-xl mr-2"
            src={`https://pixelsback.localproductsnetwork.com/public/contentImages/${contentData[3].img}`}
            alt="Project Goal"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-extrabold text-center">
          {contentData[3].key}
          </div>          
            <div className="mt-2 text-slate-500 text-justify">
            {contentDataDes}
            </div>            
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
