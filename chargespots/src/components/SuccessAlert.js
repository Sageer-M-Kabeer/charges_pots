import React, { Component } from 'react'

export class SuccessAlert extends Component {
  render() {
    return (
      <div
          className="bg-green-100 border-l-[5px] border-green-500 text-green-700 p-4"
          role="alert" >
            <p className='font-bold'>Success!</p>
            <p>Login Successful</p>
      </div>
    )
  }
}

export default SuccessAlert