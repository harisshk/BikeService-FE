
const SET_PROFILE = 'SET_PROFILE';

export const setProfile = input => {
    return {
        type: SET_PROFILE,
        payload: input,
    };
};