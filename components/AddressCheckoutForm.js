import React from 'react'
import statesList from "./dynamic-content/statesList.json";

const AddressCheckoutForm = ({ handleInputChange }) => {
  return (
    <>
      <div className='row'>
        <div className='col s5'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="first_name"
            placeholder='First Name'
            onChange={handleInputChange}
          />
        </div>
        <div className='offset-s2 col s5'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="last_name"
            placeholder='Last Name'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="addressOne"
            placeholder='Address Line 1'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="addressTwo"
            placeholder='Address Line 2'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s5'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="city"
            placeholder="City"
            onChange={handleInputChange}
          />
        </div>
        <div className='offset-s1 col s2'>
          <div className='input-field'>
            <select name="state" className='browser-default' onChange={handleInputChange}>
              <option defaultValue="state">State</option>
              {statesList.map((state, index) => {
                return (
                  <option key={index} value={state.state_value}>{state.state_value}</option>
                )
              })}
            </select>
            {/* <label>states</label> */}
          </div>
        </div>
        <div className='offset-s1 col s3'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-labelledby="user-register-address"
            name="zip"
            placeholder="Zip Code"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  )
}

export default AddressCheckoutForm