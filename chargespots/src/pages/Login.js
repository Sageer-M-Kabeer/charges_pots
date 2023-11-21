import logo from '../assets/logo2.png';
import user from '../assets/user.png';
import lock from '../assets/lock.png';
import {useForm} from "react-hook-form";
import { useState } from 'react';
// import HomePage from "../pages/HomePage"
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState : { errors }
  }= useForm();
  const [error,setError] = useState(null)
  const [isLoggedin,setLoggin] = useState(false);
  const [formsuccess, setformsuccess] = useState(null)

  const onSubmit = async (data,e) => {
    const formattedPhoneNum = "+234" + data.phonenum;
    e.preventDefault();
  
    try {
      const response = await axios.post('http://3.91.225.206/login/', {
        phone_number: formattedPhoneNum,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('token'),
        },
        withCredentials: true, // Send cookies with the request
      });
  
      console.log(response);
      if (response.status === 200) {
        const authToken = response.data.token;
        console.log(authToken);
        setformsuccess(true)
        setLoggin(true)
         // Save the token in localStorage
        localStorage.setItem('token', authToken);
        window.location.href = "/";
        // Set the token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        
      } else {
        setError('Invalid password or phone number');
        setformsuccess(false)
        setLoggin(false)

      }
    } catch (error) {
      setError('Sign in failed!');
      setformsuccess(false)
      setLoggin(false)

    }
  
    console.log(data);
    // setformsuccess(null)
    // setLoggin(null)
    reset();
  };
  
  // Helper function to retrieve the CSRF token from cookies
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };


    return (
      <div className=" h-full md:h-screen w-screen bg-[#f6f8f9] p-0 m-0 border-box outline-none font-[48px]">
        { isLoggedin && formsuccess ? <SuccessAlert title="Login Success" text="Redirecting to homepage"/> : ""}
        {formsuccess === false ? <ErrorAlert title="Login Failed!" text="invalid credentials"/> : null}


        {/* start of logo */}
        <div className="flex-box justify-center">
            <div className="bg-[#1895B0] rounded-2xl m-[15px] md:m-[30px]">
              <div className='flex justify-center pt-[10px] px-[80px] pb-[20px]'>
                <img className="rounded-2xl md:rounded-none w-full h-full md:w-80" src={logo} alt='logo'/>
              </div>
            </div>
        </div>
        {/* end of logo  */}
        <div className="flex  justify-center mt-[20px] h-[600px] ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-[16px] my-0 bg-[#fff] rounded-xl md:w-cree overflow-hidden">
              <div className="md:pt-[12px] px-[16px] pt-[14px] mt-8 w-full md:w-96 border-box flex flex-col relative overflow-hidden leading-[24px]">

                {/* input start */}
              <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px] text-[#]">
                                      <img src={user} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                      <font className="placeholder-gray-100 placeholder-opacity-5 h-[45px] leading-[46px] text-white">+234</font>
                                      <input {...register("phonenum",
                                      {required:true,
                                      validate:{
                                        checkLength:(value) => value.length >= 10 && value.length <= 15,
                                        matchPattern:(value) => /[0-9]/
                                      }})} name="phonenum" type='tel' placeholder='Please enter mobile number' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                  </div>
                  <div className="text-left mb-3 text-sm p-2 text-[#ee0a24]">
                    {errors.phonenum?.type === "required" && (<div className="errormsg">phone number is required</div>)}
                    {errors.phonenum?.type === "checkLength" && (<div className="errormsg">phone number must be 10 or 11 digits</div>)}
                  </div>
                  
              </div>
              {/* input end */}

                {/* input start */}
                <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px]">
                                      <img src={lock} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                    
                                      <input {...register("password",{
                                        required:true,
                                        validate: {
                                          checkLength:(value) => value.length >= 5,
                                          }
                                         })}
                                       name="password" type='password' placeholder='enter password' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                  </div>
                  <div className="text-left mb-2 text-sm p-2 text-[#ee0a24]">
                    {errors.password?.type === "required" && (<div className="errormsg">password is required</div>)}
                    {errors.password?.type === "checkLength" && (<div className="errormsg">password must be at-least 6 characters</div>)}
                  </div>
              </div>
              {/* input end */}
              <div className="text-center mb-[2px] text-sm  text-[#ee0a24]">
              {error && <p>{error}</p>}
                  </div>
              <div className="mt-1 text-right">
                                <span className="text-[#969799]"><Link to="/forgot-password">Forgot password</Link></span>

                                </div>
              {/* button start  */}
              <div className="w-full mt-[15px] mx-auto mb-20 flex flex-col justify-center items-center">
                  <div className="w-[60%] h-[45px] group inline-flex justify-center bg-gradient-to-r from-[#1895B0] to-[#0f758b] rounded-[25px]">
                    <button type="submit" className="w-full text-center font-bold text-white text-[16px]">
                      Login
                    </button>
                  </div>
                  <div className="flex-col block text-left mt-5 mb-2">
                <span className="text-[#969799]">Don't have an account? <Link to="/signup"><strong className="text-[#44648]">signup</strong></Link></span>
              </div>
              </div>
              {/* button end  */}
              </div>
              
            </div>
            
          </form>

        </div>

        {/* end of form */}
      </div>

    )
  };

export default Login
