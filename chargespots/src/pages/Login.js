import React, { Component } from 'react'
import logo from '../assets/logo2.png';
import user from '../assets/user.png';
import lock from '../assets/lock.png';

export class Login extends Component {
  render() {
    return (
      <div className=" h-full md:h-screen w-screen bg-[#f6f8f9] p-0 m-0 border-box outline-none font-[48px]">

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
          <form>
            <div className="mx-[16px] my-0 bg-[#fff] rounded-xl md:w-cree overflow-hidden">
              <div className="md:pt-[12px] px-[16px] pt-[14px] mt-8 w-full md:w-96 border-box flex flex-col relative overflow-hidden leading-[24px]">

                {/* input start */}
              <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px] text-[#]">
                                      <img src={user} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                      <font className="h-[45px] leading-[46px] text-white">+234</font>
                                      <input type='tel' placeholder='Please enter mobile number' autocomplete="off" pattern='[0-9]*'
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                  </div>
                  <div className="text-left text-sm p-2 text-[#ee0a24]">

                 </div>
              </div>
              {/* input end */}

                {/* input start */}
                <div className="relative overflow-visible  text-right text-[#969799] align-middle break-word ">
                  <div className="flex border-[#122149]  bg-[#1894b0] 
                                  h-[45px] leading-[40px] py-0 px-[10px] rounded-[10px]">
                                      <img src={lock} alt='$' className="mr-[5px] text-[#fff] w-[20px] h-[20px] mt-[12px]"/>
                                    
                                      <input type='tel' placeholder='enter password' autocomplete="off" pattern='[0-9]*'
                                        className=" pl-[10px] w-[100%] h-[45px] text-white bg-[#1895B0] border-none rounded-[10px] focus:outline-none"input/>
                  </div>
                          
                  <div className="text-left text-sm p-2 text-[#ee0a24]">
                    
                 </div>
              </div>
              {/* input end */}
              <div className="mt-1 text-right">
                                <span className="text-[#969799]"><a href='# '>Forgot password</a></span>

                                </div>
              {/* button start  */}
              <div className="w-full mt-[15px] mx-auto mb-20 flex flex-col justify-center items-center">
                  <div className="w-[60%] h-[45px] group inline-flex justify-center bg-gradient-to-r from-[#1895B0] to-[#0f758b] rounded-[25px]">
                    <button onClick={this.handleSubmit} type="button" className="w-full text-center font-bold text-white text-[16px]">
                      Login
                    </button>
                  </div>
                  <div className="flex-col block text-left mt-5 mb-2">
                <span className="text-[#969799]">Don't have an account? <a href={'<SignupPage/>'}><strong className="text-[#44648]">Login</strong></a></span>
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
  }
}

export default Login
