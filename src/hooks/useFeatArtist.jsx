import { useState } from "react";



export const useFeatArtist = ( initialValue = {} ) => {
    
    
    const [data, setData] = useState(initialValue);
    const newValue = {
        rol: '',
        artista_destacado : ''
    }
    const onDelete = (indexToDelete) => {
        const newFields = data.filter((d, index) => index !== indexToDelete);
        setData([...newFields]);
    };

    const onAdd = () => {
        setData([...data, { ...newValue }]);
    };

    const add = ( arr ) => {
        for (let i = 0; i < arr.length; i++) {
            setData([...data, { ...initialValue }]);
        }
    }
    const onChange = (event, indexParent) => {
        const newData = data.map((d, index) => {
        if (index === indexParent) {
            d[event.target.name] = event.target.value;
        }

        return d;
        });

        setData([...newData]);
    };

    return [
        data,
        onAdd,
        onDelete,
        onChange,
        add
    ]

}
