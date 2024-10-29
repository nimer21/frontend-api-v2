import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaLayerGroup , FaTh, FaSun } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GrLogin } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import SidebarMenu from "./SidebarMenu";
import useAuthContext from "../../context/AuthContext";

const routes = [
  {
    path: "/",
    name: "الرئيسية",
    icon: <FaHome />,
  },
  {
    path: "/idea",
    name: "فكرة المشروع",
    icon: <FaSun />,
  },
  {
    path: "/messages",
    name: "الهدف",
    icon: <MdMessage />,
  },
  {
    path: "/analytics",
    name: "الشروط",
    icon: <BiAnalyse />,
  },
  {
    path: "/dashboard",
    name: "المزايا",
    icon: <FaLayerGroup />,
  },
  {
    path: "/Rent",
    name: "كيفية الإستئجار",
    icon: <FaTh />,
    },
    /*
  {
    path: "/saved",
    name: "حجز مساحة إعلان",
    icon: <AiFillHeart />,
  },

  {
    path: "/file-manager",
    name: "إدارة",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/users",
        name: "إضافة الإعلانات",
        icon: <FaUser />,
      },
      {        
        path: "/order",
        name: "الطلبات",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/settings",
    name: "خيارات المستخدم",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {        
        path: "/saved",
        name: "حجز مساحة إعلان",        
        icon: <FaLock />,
      },
    ],
  },

  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  */
 
  // {
  //   path: "/logout",
  //   name: "تسجيل الخروج",
  //   icon: <GrLogin  />,
  // },
];

const routesGeneral = [
  {
    path: "/",
    name: "الرئيسية",
    icon: <FaHome />,
  },
  {
    path: "/idea",
    name: "فكرة المشروع",
    icon: <FaSun />,
  },
  {
    path: "/messages",
    name: "الهدف",
    icon: <MdMessage />,
  },
  {
    path: "/analytics",
    name: "الشروط",
    icon: <BiAnalyse />,
  },
  {
    path: "/dashboard",
    name: "المزايا",
    icon: <FaLayerGroup />,
  },
  {
    path: "/Rent",
    name: "كيفية الإستئجار",
    icon: <FaTh />,
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
    ],
  },
 
  // {
  //   path: "/logout",
  //   name: "تسجيل الخروج",
  //   icon: <GrLogin  />,
  // },
];

const SideBar = ({ children }) => {
  const {user, logout} = useAuthContext();
  //console.log("Login user", user?.email);
  //console.log("user?.is_admin", user?.is_admin);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
//************************************************************************************
function refreshPage(){ 
  window.location.reload(); 
  window.location.href = "/";
  //navigate("/");
  //return <Navigate to='/' replace/>
}
/*
  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();
      if (data.success) {        
        toast.success(data.message);
        useDispatch(setUserDetails(null));
      } else {
        //console.error("Failed to log out");
        toast.error(data.message);
      }
      //localStorage.removeItem("token");
      //cookies.remove('token', { domain: COOKIE_DOMAIN, path: COOKIE_PATH })
      //new Cookies().remove('token', { domain: "payment-fs-ecommerce.vercel.app", path: '/' })
      
      //window.location.href = "/";
    } catch (error) {
      console.error("Error logging out", error);
    }
  };*/
//************************************************************************************ */
  return (
    <div className="flex">
    <motion.div
      animate={{
        //width: isOpen ? "200px" : "45px",

        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
      className="lg:w-56 md:w-52 sm:w-36 w-11 bg-indigo-950 text-white h-lvh overflow-y-auto"
    >
      <div className="flex items-center justify-between py-4 px-3">
        {/* <AnimatePresence>
          {isOpen && (
            <motion.h1
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg leading-none"
            >
              القائمة
            </motion.h1>
          )}
        </AnimatePresence> */}

        <div className="w-7">
          {/* <FaBars/> */}
          {/* onClick={toggle} */}
        </div>
      </div>

      <div className="text-5xl cursor-pointer relative flex justify-center">
                {
                user?.profilePic ? (
                    <img
                    src={user?.profilePic}
                    alt={user?.name}
                    title={user?.name}
                    className="hidden lg:block md:block lg:w-20 lg:h-20 rounded-full object-cover mb-4"
                    />
                ) : 
                <FaRegCircleUser className="mb-4" />
                }
            </div>

      <div className="flex items-center mx-2 h-7 p-2">
        <div className="search_icon">
          {/* <BiSearch /> */}
        </div>
        {/* <AnimatePresence>
          {isOpen && (
            <motion.input
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={inputAnimation}
              type="text"
              placeholder="Search"
            />
          )}
        </AnimatePresence> */}
        <p className="text-center hidden md:block lg:block">فضاء تجاريّ مختص بالمنتجات المحلّيّة.</p>
      </div>
      <section className="mt-11 flex flex-col gap-1 mr-1">
        {routes.map((route, index) => {
          /*
          if (route.subRoutes && user?.role===ROLE.ADMIN) {
            return (
               <SidebarMenu
                 setIsOpen={setIsOpen}
                 route={route}
                 showAnimation={showAnimation}
                 isOpen={isOpen}
               />
              //null
            );
          }
            */    
            return (
              <NavLink
                to={route.path}
                key={index}
                //className={(navData) => (navData.isActive ? "none" :"link")}
                className={({isActive}) => (isActive ? "flex text-wrap hover:bg-indigo-900 hover:border-l-4 hover:border-solid hover:border-white bg-slate-200 text-indigo-600 gap-3 border-l-4 border-solid border border-white" 
                  : 'flex text-wrap text-white gap-3 py-1 px-1 border-solid border-transparent transition-shadow hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-shadow')}
                //className="flex text-white gap-3 py-1 px-1 border-solid border border-transparent
                //transition-all hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-all"
                //activeClassName="!border-r-4 !border-solid !border-white"
              >
                <div className="icon mt-1">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="whitespace-nowrap text-base"
                    >
                      {route.name}                      
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
        })}

                    {/* {user?.is_admin */}
                    {(user?.email ==="Lana@gmail.com"|| user?.email === "AnotherEmail@gmail.com") && ( 
                    <NavLink
                    to="/users"
                    //key={index}
                    //className={(navData) => (navData.isActive ? "none" :"link")}
                    className={({isActive}) => (isActive ? "flex text-wrap hover:bg-indigo-900 hover:border-l-4 hover:border-solid hover:border-white bg-slate-200 text-indigo-600 gap-3 border-l-4 border-solid border border-white" 
                      : 'flex text-wrap text-white gap-3 py-1 px-1 border-solid border-transparent transition-shadow hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-shadow')}
                    //className="flex text-white gap-3 py-1 px-1 border-solid border border-transparent
                    //transition-all hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-all"
                    //activeClassName="!border-r-4 !border-solid !border-white"
                  >
                    <div className="icon mt-1"><FaUser /></div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="whitespace-nowrap text-base"
                        >
                          إضافة إعلان                      
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                  )}

                    {user?.is_admin =="0" && ( 
                    <NavLink
                    to="/saved"
                    //key={index}
                    //className={(navData) => (navData.isActive ? "none" :"link")}
                    className={({isActive}) => (isActive ? "flex text-wrap hover:bg-indigo-900 hover:border-l-4 hover:border-solid hover:border-white bg-slate-200 text-indigo-600 gap-3 border-l-4 border-solid border border-white" 
                      : 'flex text-wrap text-white gap-3 py-1 px-1 border-solid border-transparent transition-shadow hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-shadow')}
                    //className="flex text-white gap-3 py-1 px-1 border-solid border border-transparent
                    //transition-all hover:border-l-4 hover:border-solid hover:border-white hover:bg-indigo-900 hover:transition-all"
                    //activeClassName="!border-r-4 !border-solid !border-white"
                  >
                    <div className="icon mt-1"><FaLock /></div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="whitespace-nowrap text-base"
                        >                       
                            حجز مساحة إعلان
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                  )}

                 

        <div className="flex content-center items-center justify-center mt-4">
            {user?.id ? (
              <button
                to={"/login"}
                // onClick={() => { handleLogout(); refreshPage();} }
                onClick={logout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                تسجيل خروج
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                تسجيل دخول
              </Link>
            )}
          </div>
          <div className="flex justify-center mt-4">
          للحصول على تجربة مشاهدة مثالية، نوصي باستخدام حجم شاشة الكمبيوتر أو اللاب توب
          </div>
      </section>
    </motion.div>

    <main className="mx-auto p-1 items-center content-center justify-center w-full">{children}</main>
  </div>   
  );
};

export default SideBar;
