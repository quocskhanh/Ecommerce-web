import React from 'react';

const FormGroup = ({children}) => {
    return (
        <div className="flex flex-col gap-y-3 mb-5">
            {children}
        </div>
    );
};

export default FormGroup;