import logo from '../assets/logo2.png';
import user from '../assets/user.png';
import lock from '../assets/lock.png';
import shield from '../assets/shield.png'
import {useForm} from "react-hook-form";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../components/ErrorAlert'
import SuccessAlert from '../components/SuccessAlert';

const SignupPage = () => {


  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [resperror,setRespError] = useState(null)
  const [errorOccured, setErrorOccured] = useState(false)
  const [formSubmited, setFormSubmitted] = useState(false)


  const onSubmit = async (data, e) => {
    const formattedPhoneNum = "+234" + data.phonenum;
    e.preventDefault();    

    try {
      const response = await axios.post('https://queentest.com.ng/register/', {
        
        phone_number: formattedPhoneNum,
        password: data.password,
        confirm_password: data.confirmPassword,
        referral_code: data.invite,

      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('token'),
        },
        // withCredentials: true, // Send cookies with the request
      });
      if(response.status===201){
        setErrorOccured(false)
        // setTimeout(() => {
        // window.location.href = "/login"
        // }, 3000); 
      }
      console.log(response)
  
    } catch (error) {
      console.log(error.response.request.response.toString())
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors.includes(
          "{'phone number', 'This number is registered for another user'}"
        )
      ) {
        setErrorOccured(true)
        setRespError('This phone number is already registered for another user.');
        setFormSubmitted(false)
        
      }
      else if (
        error.request &&
        error.request.response &&
        error.request.response.includes("Invalid referral code.")
      ) {
        setErrorOccured(true)
        setRespError('Invalid Referral Code')
        // alert('Invalid referral code.');
      }

    }
    console.log(data);
    reset();
    setFormSubmitted(true);
    console.log(errorOccured)
    console.log(formSubmited)
    setTimeout(() => {
      window.location.reload();
    }, 5000);

  };

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
    return (
      <div className=" md:h-full sm:h-full  w-screen bg-[#f6f8f9] p-0 m-0 border-box outline-none font-[48px]">

        {formSubmited  && errorOccured ? <ErrorAlert title="Error Occured!" text={resperror}/> : " "}
        {errorOccured === false || formSubmited ? <SuccessAlert title="Success!" text='account created successfully'/> : " "}
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
              <div className="md:pt-[12px] mt-8 px-[16px] pt-[12px] w-full md:w-96 border-box flex flex-col relative overflow-hidden leading-[24px]">

                   {/* input start */}
              <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px] text-[#]">
                                      <img src={user} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                      <font className="placeholder-gray-100 placeholder-opacity-5 h-[45px] leading-[46px] text-white">+234</font>
                                      <input {...register("phonenum",
                                      {required:true,
                                      validate:{
                                        checkLength:(value) => value.length >= 10 && value.length <= 11,
                                        matchPattern:(value) => /[0-9]/
                                      }})} name="phonenum" type='tel' placeholder='Please enter mobile number' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none" input/>
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
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none" input/>
                  </div>
                  <div className="text-left mb-4 text-sm p-2 text-[#ee0a24]">
                    {errors.password?.type === "required" && (<div className="errormsg">password is required</div>)}
                    {errors.password?.type === "checkLength" && (<div className="errormsg">password must be at-least 6 characters</div>)}
                  </div>
              </div>
              {/* input end */}

                      {/* input start */}
                      <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px]">
                                      <img src={lock} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                    
                                      <input {...register("confirmPassword",{
                                        required:true,
                                        validate: {
                                          checkLength:(value) => value.length >= 5,
                                          // checkMatch:() => (confirmPassword !== password)
                                          }
                                         })}
                                       name="confirmPassword" type='password' placeholder='enter password again' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none" input/>
                  </div>
                  <div className="text-left mb-4 text-sm p-2 text-[#ee0a24]">
                    {errors.password?.type === "checkMatch" && (<div className="errormsg">passwords not match</div>)}
                    {errors.password?.type === "required" && (<div className="errormsg">password is required</div>)}
                    {errors.password?.type === "checkLength" && (<div className="errormsg">password must be at-least 6 characters</div>)}
                  </div>
              </div>
              {/* input end */}

                 {/* input start */}
                 <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px] text-[#]">
                                      <img src={shield} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                      <input {...register("invite",
                                      {required:true,
                                      validate:{
                                        checkLength:(value) => !(value.length < 6),
                                        // matchPattern:(value) => !(/[0-9]/)
                                      }})} name="invite" type='tel' placeholder='Please enter invite code' autoComplete="off"
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none" input/>
                  </div>
                  <div className="text-left mb-3 text-sm p-2 text-[#ee0a24]">
                    {/* {errors.invite?.type === "required" && (<div className="errormsg">Invite code is required</div>)}
                    {errors.invite?.type === "checkLength" && (<div className="errormsg">inite code must be 6 digits</div>)} */}
                    {/* {errors.invite?.type === "matchPattern" && (<div className="errormsg">inite code must be digits only</div>)} */}
                  </div>
                  
              </div>
              {/* input end */}
            
              {/* button start  */}
              <div className="w-full mt-[15px] mx-auto mb-20 flex flex-col justify-center items-center">
                  <div className="w-[60%] h-[45px] group inline-flex justify-center bg-gradient-to-r from-[#1895B0] to-[#0f758b] rounded-[25px]">
                    <button type="submit"  className="w-full text-center font-bold text-white text-[16px]">
                      Sign up now
                    </button>
                  </div>
                  <div className="flex-col block text-left mt-5 mb-2">
                <span className="text-[#969799]">Already have an account? <Link to="/login"><strong className="text-[#44648]">login</strong></Link></span>
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

export default SignupPage