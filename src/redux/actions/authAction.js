import actionTypes from "./actionTypes";

export const createAdmin = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_STATE })
        const response = await fetch('/api/admin/create-admin', { method: 'POST', body: JSON.stringify(data) })
        const { success, message } = await response.json();
        if (success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_ADMIN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_ADMIN_FAILURE, payload: "Something went wrong." })
    }
}

export const loginAdmin = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_STATE })
        const response = await fetch('/api/admin/login', { method: "POST", body: JSON.stringify(data) })
        const { user, success, message } = await response.json();
        if (success && user !== null) {
            dispatch({ type: actionTypes.LOGIN_ADMIN_SUCCESS, payload: message })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.LOGIN_ADMIN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_ADMIN_FAILURE })
    }
}

//user
export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.CLEAR_STATE })
        const response = await fetch('/api/user/login', { method: "POST", body: JSON.stringify(data) })
        const { user, success, message } = await response.json();
        if (success && user !== null) {
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESS, payload: message })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.LOGIN_USER_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGIN_USER_FAILURE })
    }
}

//user

export const logoutAdmin = () => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/logout', { method: 'GET' })
        const { success } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.LOGOUT_ADMIN_SUCCESS })
        }
    } catch (error) {
        dispatch({ type: actionTypes.LOGOUT_ADMIN_FAILURE })
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/forgot-password', { method: 'POST', body: JSON.stringify({ data }) })

        const { success, message } = await response.json()

        if (success) {
            dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: message })
    }
}

export const authenticateUser = (token) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_STATE })
    try {
        const response = await fetch('/api/admin/get-token-data', { method: 'POST', body: JSON.stringify({ token }) });
        const { success, user, message } = await response.json()
        if (success && user !== null && user !== undefined && user !== "") {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_SUCCESS, payload: { user, message } })
        } else if (!success && user === null) {
            dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE, payload: message })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_DATA_FROM_TOKEN_FAILURE })
    }
}