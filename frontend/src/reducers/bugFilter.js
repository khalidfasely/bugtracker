const bugFilterReducerDefaultState = {
    text: '',
    sortBy: ''
}

export default (state = bugFilterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT':
            return {...state, text: action.text}
        case 'DEFAULT_SORT':
            return {...state.sortBy, sortBy: ''}
        case 'SORT_BY_PRIORITY':
            return {...state, sortBy: 'priority'}
        default:
            return state
    };
};