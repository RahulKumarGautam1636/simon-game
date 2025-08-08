import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// const CustomInput = ({ value, defaultValue, inputRef, ...props }) => {
//     return (
//         <input
//             {...props}
//             defaultValue={defaultValue}
//             ref={inputRef}
//         // style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
//         />
//     );
// }

const MyDatePicker = ({
    value,
    onChange,
    options = {},
    placeholder = "Select a date",
    className = "",
    inputStyle = {}
}) => {

    const defaultOptions = {
        enableTime: false,
        dateFormat: "d-m-Y",
        closeOnSelect: true,
        allowInput: false,
        disableMobile: true
    };

    return (
        <Flatpickr
            style={inputStyle}
            value={value}
            onChange={onChange}
            options={{ ...defaultOptions, ...options }}
            className={`custom-datepicker ${className}`}
            placeholder={placeholder}
        />
    );
};

export default MyDatePicker;