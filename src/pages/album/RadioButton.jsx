export const RadioButton = ({
    content,
    id,
    name,
    value,
    onChange,
    checked,
    onClick,
    dark,
}) => {
    return (
        <div className={dark ? 'font-normal my-4': 'font-bold my-4'}>
            <input
                type="radio"
                id={id}
                name={name}
                checked={checked}
                value={value}
                onChange={onChange}
                onClick={onClick}
            />
            <label htmlFor={id} className={dark ? 'text-white': ''}>
                {content}{' '}
            </label>
        </div>
    );
};
