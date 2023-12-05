import actionTypes from "../actions/actionTypes";

const initialState = {
    task: null,
    tasks: null,
    error: false,
    message: "",
    actionT: ""
}

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.CREATE_TASK_SUCCESS:
            return { ...state, message: payload, error: false, actionT: "create" }

        case actionTypes.CREATE_TASK_FAILURE:
            return { ...state, message: payload, error: true, actionT: "create" }

        default:
            return state
    }
}