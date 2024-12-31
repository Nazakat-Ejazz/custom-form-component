import React, { useState } from 'react';
import styled from 'styled-components';
import CustomInput from './CustomInput';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CustomForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: { label: 'First Name', name: 'firstname', value: '', required: true, errors: [] },
    lastname: { label: 'Last Name', name: 'lastname', value: '', required: true, errors: [] },
    email: { label: 'Email', name: 'email', value: '', required: true, errors: [] },
    age: { label: 'Age', name: 'age', value: '', required: true, errors: [] },
    address: { label: 'Address', name: 'address', value: '', required: true, errors: [] },
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Update the value in the userInfo state
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));

    // Re-validate the form after each input change
    validateForm();  // This will check if the input is valid or not every time
  };

  const validateForm = () => {
    const errors = {}; // Temporary object to store errors

    // Validate each field
    Object.keys(userInfo).forEach((key) => {
      const field = userInfo[key];
      const fieldErrors = [];

      // Check if the field is required and has a value
      if (field.required && !field.value.trim()) {
        fieldErrors.push(`${field.label} is required.`);
      }

      // Additional validation rules (e.g., email)
      if (field.name === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          fieldErrors.push('Please enter a valid email address.');
        }
      }

      // Handle age validation (if applicable)
      if (field.name === 'age' && field.value.trim()) {
        const age = Number(field.value);
        if (isNaN(age) || age <= 0) {
          fieldErrors.push('Age must be a positive number.');
        }
      }

      // If there are errors for this field, add them to the errors object
      if (fieldErrors.length > 0) {
        errors[key] = fieldErrors;
      }
    });

    // Update the state with the new error messages
    setUserInfo((prevState) => {
      const updatedInfo = { ...prevState };
      Object.keys(errors).forEach((key) => {
        updatedInfo[key].errors = errors[key];
      });

      // Clear errors for fields that have no errors
      Object.keys(prevState).forEach((key) => {
        if (!errors[key]) {
          updatedInfo[key].errors = [];
        }
      });

      return updatedInfo;
    });

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted!', userInfo);
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.values(userInfo).map((field) => (
        <CustomInput
          key={field.name}
          label={field.label}
          name={field.name}
          value={field.value}
          required={field.required}
          errors={field.errors}
          onInputChange={onInputChange}
        />
      ))}
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default CustomForm;
