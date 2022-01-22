import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
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
    <div>
        <input type={type} 
        className={classnames('form-control r-0 light s-12',{
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
  )
}

TextFieldGroup.propTypes ={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;