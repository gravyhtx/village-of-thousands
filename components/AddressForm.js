import { createContext, useState } from "react";

const [form, setForm] = useState(undefined);
FormContext = createContext({ form, setForm });

const AddressForm = ({ fields }) => {

  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  }

  return (
    <div className="register-input-container" id="user-register-container">
      <div className="user-register-address-header">ADDRESS</div>
      {fields.map((field, index) => {
        return <input
          className="input-field"
          id={"user-register-"+field.name+"_input"}
          aria-labelledby="user-register-address"
          name={field.name}
          placeholder={field.placeholder}
          // placeholder={userData.addressOne?userData.addressOne:'Address Line 1'}
          onChange={handleInputChange}
          // value={userData.addressOne?userData.addressOne:''}
          key={index}
        />})
      }
      <FormInputs fields={fields} setData={setData} aria="user-register-address" />
    </div>
)}

export default AddressForm;