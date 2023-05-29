import React, { Component } from 'react'
import BottomBar from '../components/BottomBar'
export class ForgotPasswordPage extends Component {
  render() {
    return (
      <div className=" h-screen flex justify-center items-center md:h-screen w-screen bg-[#f6f8f9] p-0 m-0 border-box outline-none font-[48px]">

      
              {/* button start  */}
              <div className="w-full mt-[15px] mx-auto mb-20 flex flex-col justify-center items-center">
                  <div className="w-[60%] h-[45px] group inline-flex justify-center bg-gradient-to-r from-[#1895B0] to-[#0f758b] rounded-[25px]">
                    <button onClick={this.handleSubmit} type="button" className="w-full text-center font-bold text-white text-[16px]">
                      <a href="https://t.me/Chargerspots" >Contact us</a>
                    </button>
                  </div>
                  <div className="flex-col block text-left mt-5 mb-2">
                {/* <span className="text-[#969799]">Don't have an account? <a href='# '><strong className="text-[#44648]">Login</strong></a></span> */}
              </div>
              </div>
              {/* button end  */}
              <BottomBar/>
              </div>
              
          
    )
  }
}

export default ForgotPasswordPage
