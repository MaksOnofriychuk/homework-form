import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
   const handleChange = ({ target }) => {
      onChange({ name: [target.name], value: target.value });
   };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof (options) === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    return (
        <div className="md-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                value={value}
                onChange={handleChange}
                name="profession"
                className={getInputClasses()}
                id="validationCustom04"
                required
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
   options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   defaultOption: PropTypes.string,
   label: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
   error: PropTypes.string
};
export default SelectField;
