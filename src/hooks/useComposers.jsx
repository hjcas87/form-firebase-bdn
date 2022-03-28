import { useMemo } from 'react';
import { useState } from 'react';

export const useComposers = (initialValue = {}) => {
    const num = useMemo(
        () => initialValue.map((i) => i.counter),
        [initialValue]
    );
    const max = useMemo(
        () => (num.length && Math.max.apply(null, num)),
        [num]
        );
    const [counter, setCounter] = useState(max + 1);
    const rol = `rol_autor_${counter}`;

    const newValue = {
        compositor: '',
        [rol]: '',
        counter,
    };

    const [data, setData] = useState(initialValue);

    const onDelete = (indexToDelete) => {
        const newFields = data.filter((d, index) => index !== indexToDelete);
        setData([...newFields]);
    };

    const onAdd = () => {
        setData([...data, { ...newValue }]);
        setCounter(counter + 1);
    };

    const add = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            setData([...data, { ...newValue }]);
        }
    };

    const onChange = (event, indexParent) => {
        const newData = data.map((d, index) => {
            if (index === indexParent) {
                d[event.target.name] = event.target.value;
            }

            return d;
        });

        setData([...newData]);
    };

    return [data, onAdd, onDelete, onChange, add];
};
