const initialState = {
    user: '',
    isLoading: false,
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        break
    }
    return state
}