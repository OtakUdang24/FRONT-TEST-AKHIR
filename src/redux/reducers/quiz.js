import * as types from '../actions/type';
import {AsyncStorage} from 'react-native';

const initialState = {
    quiz: [],
    currentQ: 1,
    error: null,
    isLoading: false,
    timer: 0,
    countDown: 0
}

export default quiz = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUIZ':
            console.log('SET_QUIZ')
            return {
                ...state, 
                quiz: action.payload
            }
            break
        case 'SET_TIMER':
            console.log('SET_TIMER')
            const minute = state.quiz[state.currentQ-1].timer
            var currentTime = new Date();
            
            return {
                ...state, 
                timer: minute,
                countDown: currentTime.setTime(currentTime.getTime() + 1000 * 60 * minute)
            }
        break
        case 'UPDATE_QUIZ_RADIO':
            console.log('UPDATE_QUIZ_RADIO')
            const data = []
            for (let index = 0; index < state.quiz.length; index++) {
                if(state.quiz[index].number === action.number && state.quiz[index].type === "multiple choice"){
                    data.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: action.checked
                    })
                }else if(state.quiz[index].type === "multiple choice"){
                    data.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: state.quiz[index].checked
                    })
                }else if(state.quiz[index].type === "multi select"){
                    data.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: state.quiz[index].checked
                    })
                }else if(state.quiz[index].type === "text"){
                    data.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        timer: state.quiz[index].timer,
                        value: state.quiz[index].value
                    })
                }          
            }
            return {...state, quiz: data}
        break
        case 'UPDATE_CURRENT_QUESTION_PLUS':
            console.log('UPDATE_CURRENT_QUESTION_PLUS')
            return {
                ...state, 
                currentQ: state.currentQ + action.number
            }
        break
        case 'UPDATE_CURRENT_QUESTION_MINUS':
            console.log('UPDATE_CURRENT_QUESTION_MINUS')
            return {
                ...state, 
                currentQ: state.currentQ - action.number
            }
        break
        case 'UPDATE_CURRENT_QUESTION_SATU':
            console.log('UPDATE_CURRENT_QUESTION_SATU')
            return {
                ...state, 
                currentQ: action.number
            }
        break
        case 'UPDATE_QUIZ_TEXT':
            console.log('UPDATE_QUIZ_TEXT')
            const data2 = []
            for (let index = 0; index < state.quiz.length; index++) {
                if(state.quiz[index].number === action.number && state.quiz[index].type === "text"){
                    data2.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        timer: state.quiz[index].timer,
                        value: action.text
                    })
                }else if(state.quiz[index].type === "multiple choice"){
                    data2.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: state.quiz[index].checked
                    })
                }else if(state.quiz[index].type === "multi select"){
                    data2.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: state.quiz[index].checked
                    })
                }else if(state.quiz[index].type === "text"){
                    data2.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        timer: state.quiz[index].timer,
                        value: state.quiz[index].value
                    })
                }          
            }
            return {...state, quiz: data2}
        break
        case 'UPDATE_QUIZ_RADIO_MULTI':
            console.log('UPDATE_QUIZ_RADIO_MULTI')
            const data3 = []
            for (let index = 0; index < state.quiz.length; index++) {
                if(state.quiz[index].number === action.number && state.quiz[index].type === "multi select"){
                    if(state.quiz[index].checked.includes(action.checked)){
                        let filtered = state.quiz[index].checked.filter(function(value, index, arr){
                            return value != action.checked;
                        });
                        data3.push({
                            id: state.quiz[index].id,
                            number: state.quiz[index].number,
                            description: state.quiz[index].description,
                            type: state.quiz[index].type,
                            options: state.quiz[index].options,
                            timer: state.quiz[index].timer,
                            checked: filtered
                        })
                    }else{
                        data3.push({
                            id: state.quiz[index].id,
                            number: state.quiz[index].number,
                            description: state.quiz[index].description,
                            type: state.quiz[index].type,
                            options: state.quiz[index].options,
                            timer: state.quiz[index].timer,
                            checked: [...state.quiz[index].checked, action.checked]
                        })
                    }

                }else if(state.quiz[index].type === "multi select"){
                    data3.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: action.checked
                    })
                }else if(state.quiz[index].type === "multiple choice"){
                    data3.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        options: state.quiz[index].options,
                        timer: state.quiz[index].timer,
                        checked: state.quiz[index].checked
                    })
                }else if(state.quiz[index].type === "text"){
                    data3.push({
                        id: state.quiz[index].id,
                        number: state.quiz[index].number,
                        description: state.quiz[index].description,
                        type: state.quiz[index].type,
                        timer: state.quiz[index].timer,
                        value: state.quiz[index].value
                    })
                }          
            }
            return {...state, quiz: data3}
        break
    }
    return state
}