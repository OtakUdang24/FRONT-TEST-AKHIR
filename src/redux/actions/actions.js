export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const setQuiz = (quiz) => {
    return {
        type: 'SET_QUIZ',
        payload: quiz
    }
}
export const updateQuizRadio = (number, checked) => {
    return {
        type: 'UPDATE_QUIZ_RADIO',
        number: number,
        checked: checked 
    }
}
export const updateQuizRadioMulti = (number, checked) => {
    return {
        type: 'UPDATE_QUIZ_RADIO_MULTI',
        number: number,
        checked: checked 
    }
}
export const updateCurrentQuestionPlus = (number) => {
    return {
        type: 'UPDATE_CURRENT_QUESTION_PLUS',
        number: number
    }
}
export const updateQuizText = (number,text) => {
    return {
        type: 'UPDATE_QUIZ_TEXT',
        number: number,
        text: text
    }
}
export const updateCurrentQuestionMinus = (number) => {
    return {
        type: 'UPDATE_CURRENT_QUESTION_MINUS',
        number: number
    }
}
export const getQuiz = (quiz) => {
    return {
        type: 'GET_QUIZ',
        payload: quiz
    }
}