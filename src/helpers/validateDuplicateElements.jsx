export const validateDuplicateElements = (array, prop) => {
    let newArray = [];
    array.forEach((element) =>
        element.volumen.forEach((item) => (newArray = [...newArray, item]))
    );

    const search = newArray.reduce((acc, item) => {
        acc[item[prop]] = ++acc[item[prop]] || 0;
        return acc;
    }, {});
    return newArray.filter((item) => search[item[prop]]);
};
