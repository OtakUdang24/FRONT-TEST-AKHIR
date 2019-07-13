const initialState = {
    quiz: [],
    error: null,
    isLoading: false,
}

export default quiZ = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            console.log('SET_QUIZ')
            return {...state, quiz: [action.payload]}
        break
    }
    return state
}