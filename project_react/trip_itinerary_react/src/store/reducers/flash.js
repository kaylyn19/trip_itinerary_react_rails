const flash = (state = [], action) => {
    switch (action.type) {
        case 'SHOW_FLASH': {
            return [...state, {text: action.text, id: action.id}];
        }
        case 'REMOVE_FLASH': {
            return [...state].filter(message => message.id !== action.id)
        }
        default:
            return state;
    }
}

export default flash;