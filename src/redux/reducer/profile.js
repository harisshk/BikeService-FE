const initialState = {};
const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            const {payload} = action;
            return {
                ...payload
            }
        default:
            return state
    }
}

export default profile