import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldNormal = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {

  return (
   <React.Fragment>
       <div className="form-group ">
       {label && <label className="form-text text-muted pl-1">{label}</label>}
         <div className="input-group">
        <input type={type} 
        className={classnames('form-control',{
        'is-invalid': error
        })}
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled} />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (<div className="invalid-feedback text-left text-danger">{error}</div>)}
        </div>
        </div>
    </React.Fragment>
  )
}

TextFieldNormal.propTypes ={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldNormal.defaultProps = {
    type: 'text'
}

export default TextFieldNormal;