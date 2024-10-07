import React, { useState } from 'react'
//import './SideBarNav.css'
import { FaWallet } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse, faToolbox, faAt } from '@fortawesome/free-solid-svg-icons'

const SideBarNav = () => {
    const [menu,setMenu] =useState("home");
  return (
    <div>
         {/* <!-- SIDEBAR NAVIGATION --> */}
    <div id="sidebar-section" className="h-screen fixed bg-blue-600">
        <div id="sidebar"
        className="fixed h-screen top-0 left-0 bg-slate-800 w-20 hover:w-72 duration-200">
        <nav role="navigation" className="pl-4 pt-8 mt-4">
            <div className="mt-4 relative overflow-hidden">
                <h1 className="name text-white fixed top-0 left-0 text-lg">Tutorend</h1>
                <ul className="nav-list space-y-8" id="nav-list">

                    <li
                      onClick={()=>setMenu("home")} className={`text-xl p-2 rounded-l-xl text-white ${menu==="home"?"bg-sky-50 text-blue-600":""}`}
                    >
                      <a href="#home" className='flex gap-5'>
                        <FontAwesomeIcon className='fa-2x' icon={faHouse} />
                        {/* <i class="fa-solid fa-house fa-2x"></i> */}
                        Home
                      </a>
                    </li>
                    <li
                    onClick={()=>setMenu("about")} className={`text-xl p-2 rounded-l-xl text-white ${menu==="about"?"bg-sky-50 text-blue-600":""}`}
                    >
                      <a href="#about" className='flex gap-5' >
                      <FontAwesomeIcon className='fa-2x' icon={faUser} />
                          {/* <i class="fa-solid fa-user fa-2x"></i> */}
                        About
                      </a>
                    </li>
                    <li
                      onClick={()=>setMenu("service")} className={`text-xl p-2 rounded-l-xl text-white ${menu==="service"? "bg-sky-50 text-blue-600":""}`}
                    >
                      <a href="#service" className='flex gap-5' >
                      <FontAwesomeIcon className='fa-2x' icon={faToolbox} />
                          {/* <i class="fa-solid fa-toolbox fa-2x"></i> */}
                        Service
                      </a>
                    </li>
                    <li
                      onClick={()=>setMenu("contact")} className={`text-xl p-2 rounded-l-xl text-white ${menu==="contact"?"bg-sky-50 text-blue-600":""}`}
                    >
                      <a href="#contact" className='flex gap-5'>
                      <FontAwesomeIcon className='fa-2x' icon={faAt} />
                          {/* <i class="fa-solid fa-at fa-2x"></i> */}
                        Contact
                      </a>
                    </li>  
                  </ul>      
            </div>
        </nav>    
    </div>
    </div>

    {/* <!-- MAIN CONTENT AREA --> */}
    <div id="content" className="md:ml-24">

        <div id="home" className="bg-red-400 h-screen flex justify-center">
            <h1 className="m-auto text-4xl">Home</h1>
        </div>
    
        <div id="about" className="bg-blue-400 h-screen flex justify-center">
            <h1 className="m-auto text-4xl">about</h1>
        </div>
    
        <div id="service" className="bg-yellow-400 h-screen flex justify-center">
            <h1 className="m-auto text-4xl">service</h1>
        </div>
    
        <div id="contact" className="bg-pink-400 h-screen flex justify-center">
            <h1 className="m-auto text-4xl">contact</h1>
        </div>    
    
        </div>
        {/* <!-- END OF SIDEBAR NAVIGATION --> */}
    </div>
  )
}

export default SideBarNav