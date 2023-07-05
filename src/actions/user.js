import * as actionTypes from './actionTypes';
import {commonAlertError, setLoading} from './common';

export const login = (data, cb) => (dispatch, getState, axios) => {

    const postData = {
        identity: data.identity,
        password: data.password,
        authType: 'passwd'
    }

    dispatch(setLoading(true))
    axios.post('/login', postData)
        .then(res => {
            localStorage.setItem('authData', JSON.stringify(res.data));
            //dispatch({type: actionTypes.ADMIN_USER_LOGIN, payload: res.data})
            if(typeof cb === 'function') cb()
        })
        .catch(err => dispatch(commonAlertError(err, null, null)))
        .finally(() => {
            dispatch(setLoading(false))
        })


    // dispatch(setUserCouponsCriteria('page', criteria.page+1))
    // dispatch(searchUserCoupons(profile, cb))
}