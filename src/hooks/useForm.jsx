import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = (newState = initialState) => {
        setValues(newState);
    };

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value,
        });
    };

    const handleAddArtist = (array, arrayName, propName) => {
        setValues({
            ...values,
            [arrayName]: [...array, { [propName]: '' }],
        });
    };

    const handleSubstracArtist = (index, array, propName) => {
        const newData = array.filter((art, i) => i !== index);
        setValues({
            ...values,
            [propName]: [...newData],
        });
    };

    const handleArrayInputChange = (e, index, array, arrayName) => {
        const newData = array.map((data, i) => {
            if (i === index) {
                data[e.target.name] = e.target.value;
            }
            return data;
        });
        setValues({
            ...values,
            [arrayName]: [...newData],
        });
    };

    return [
        values,
        handleInputChange,
        handleAddArtist,
        handleSubstracArtist,
        handleArrayInputChange,
        setValues,
        reset,
    ];
};
