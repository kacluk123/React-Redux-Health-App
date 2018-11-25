import {SEND_ID} from '../types/IDTypes'


export const  sendId = (id) => {
    return {
        type: SEND_ID,
        id,
    }
}

