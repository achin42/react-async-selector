

const selectCustomStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        background: state.isFocused? '#EEF7FF' : state.isPressed? '#D4EAFF' : state.isSelected ? '#4EA6FF' : 'white',
        padding: 10,
    }),
    control: (provided, state) => ({
        ...provided,
        background: state.isDisabled? '#FCFBF9' : state.focused? '#EFF7FF' : '#F9FCFF',
        color: 'pink',
        border: '1px solid #EFF7FF',
        "&:hover": {
            border: '1px solid #D4EAFF'
        },
        "&:focus": {
            border: '1px solid #D4EAFF'
        }
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'black',
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        background: state.focused? '#F9FCFF' : '#D4EAFF',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#BCBCBC',
    }),
    multiValue: (provided, state) => ({
        ...provided,
        background: '#4EA6FF',
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: '#D4EAFF',
        "&:hover": {
            color: '#4EA6FF',
            background: '#D4EAFF'
        }
    }),
}

module.exports = {
    selectCustomStyles: selectCustomStyles
}