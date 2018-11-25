import {SEND_ID} from '../types/IDTypes'
const initialState = {
    idDiet: '',
    diet: '',
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SEND_ID:
            return {
                ...state,
                idDiet: action.id
            }

            default:
            return state;
    }
}