import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const FormInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;


const FormRequiredAsterick = styled.span`
  color:red;
  margin-left:4px;
`

const ErrorList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ErrorItem = styled.li`
  color: red;
  font-size: 12px;
  margin: 4px 0;
`;

const CustomInput = ({ label, name, value, required, errors, onInputChange }) => {
  return (
    <FormGroup>
      <FormLabel htmlFor={name}>
        {label}
        {required && <FormRequiredAsterick>*</FormRequiredAsterick>}
      </FormLabel>
      <FormInput name={name} value={value} onChange={onInputChange} />
      {errors.length > 0 && (
        <ErrorList>
        {errors.map((error, index) => (
          <ErrorItem key={index}>{error}</ErrorItem>
        ))}
      </ErrorList>      
      )}
    </FormGroup>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,  
  value: PropTypes.string.isRequired, 
  required: PropTypes.bool.isRequired, 
  onInputChange: PropTypes.func.isRequired, 
  errors: PropTypes.arrayOf(PropTypes.string), 
};

export default CustomInput;
