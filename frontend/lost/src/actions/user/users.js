import axios from 'axios'
import TYPES from '../../types/index'
import {API_URL} from '../../settings'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

export const getUsers = () => async dispatch => {
    try {
        const response = await axios.get(API_URL + '/user')
        dispatch({type: TYPES.GET_USERS, payload: response.data})
        
    } catch (e) {}
}

export const createUser = (payload) => async dispatch => {
        try{
             await axios.post(API_URL + '/user', payload)
             dispatch({type: TYPES.CREATE_USER_SUCCESS})
             const newUserList = await axios.get(API_URL + '/user')
             dispatch({type: TYPES.GET_USERS, payload: newUserList.data})
             }    
        catch (e) {
            console.log(e.response)
            dispatch({type: TYPES.CREATE_USER_FAILED, payload: e.response.data.message})
        } 
    
}

export const cleanUserError = () => dispatch => {
    dispatch({type: TYPES.CLEAN_USER_ERROR})
}