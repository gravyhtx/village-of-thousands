import { useState } from "react";

const FormInputs = ({ fields, setData, aria }) => {

  const [formData, setFormData] = useState({});
  setData = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  }

  return <>
    {fields.map((field, index) => {
      return <input
        className="input-field"
        id={"user-register-"+field.name+"_input"}
        aria-labelledby={aria || ''}
        name={field.placeholder}
        placeholder={field.placeholder}
        onChange={handleChange}
        key={index}
      />})
    }
  </>
};

export default FormInputs;