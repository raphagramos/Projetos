export const customSelectStyles = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#1a1a1a',
        border: '1px solid #ccc',
        borderRadius: '5px',
        color: 'red', // Cor do texto no estado normal
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: '#1a1a1a',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'white',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? 'gray' : 'white', // Cor do texto ao passar o mouse
        backgroundColor: state.isSelected ? 'gray' : null, // Cor de fundo quando selecionado
    }),
};
