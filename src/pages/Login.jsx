import { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthContext from "../context/AuthContext";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const {login, errors} = useAuthContext();

  const navigate = useNavigate();

  const handelOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return { ...preve, [name]: value };
    });
    //setData({...data, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Your login logic here
    //login({...data});    
    login(data);    
}

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icon" className="" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleLogin}>
            <div className="grid">
              <label htmlFor="email">إسم المستخدم : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="أدخل الإيميل"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handelOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
              {errors && (
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">{errors}</span>
                </div>)}
            </div>
            <div>
              <label htmlFor="email">كلمة المرور : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={data.password}
                  onChange={handelOnChange}
                  id="password"
                  name="password"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              {errors && 
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">{errors}</span>
                </div>}
              {/* <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                نسيت كلمة المرور؟
              </Link> */}
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              تسجيل دخول
            </button>
          </form>
          <p className="my-5">
            ليس لديك حساب؟{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Login;
