import { React, useState } from 'react';
import statesList from "./dynamic-content/statesList.json";

const AddressCheckoutForm = ({ handleInputChange, errorClasses }) => {

  return (
    <>
      <div className='row'>
        <div className='col s12 m12 l6 address-form_input'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="First Name"
            name="first_name"
            placeholder='First Name'
            onChange={handleInputChange}
          />
        </div>
        <div className='col s12 m12 l6 address-form_input'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="Last Name"
            name="last_name"
            placeholder='Last Name'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12 address-form_input'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="Address - Line 1"
            name="addressOne"
            placeholder='Address Line 1'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12 address-form_input'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="Address - Line 2"
            name="addressTwo"
            placeholder='Address Line 2'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s12 m5 l6 address-form_input xt-margin'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="City"
            name="city"
            placeholder="City"
            onChange={handleInputChange}
          />
        </div>
        <div className='col s5 m3 l2 address-form_input'>
          <div className='input-field'>
            <select aria-label="State" name="state" className='browser-default' onChange={handleInputChange}>
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
        <div className='col s7 m4 address-form_input'>
          <input
            className="input-field"
            id={"user-register-" + "test" + "_input"}
            aria-label="Zip Code"
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