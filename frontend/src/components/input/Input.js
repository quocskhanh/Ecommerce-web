import React from 'react';
import {useController} from "react-hook-form";
import PropTypes from "prop-types"
const Input = (props) => {
    const {control,name,type,...rest} = props
    const {field} = useController({
        control,
        name,
        defaultValue: ""
    })
    return (
        <div className="relative">
            <input
                id = {name}
                type={type} className="w-full py-4 px-6 border border-strock rounded-xl text-sm font-medium text-text1 placeholder:text-text4"
                   {...rest}
                {...field}/>
        </div>
    );
};
Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    control: PropTypes.any.isRequired,
}
export default Input;