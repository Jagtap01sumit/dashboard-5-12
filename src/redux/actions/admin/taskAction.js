import actionTypes from "../actionTypes";

export const createTask = (formData) => async (dispatch) => {
    try {
        const response = await fetch('/api/crate-task', { method: "POST", body: formData })
        const { success, message } = await response.json()
        if (success) {
            dispatch({ type: actionTypes.CREATE_TASK_SUCCESS, payload: message })
        } else if (!success) {
            dispatch({ type: actionTypes.CREATE_TASK_FAILURE, payload: message })
        }

    } catch (error) {
        dispatch({ type: actionTypes.CREATE_TASK_FAILURE, payload: error.mesasage })
    }
}