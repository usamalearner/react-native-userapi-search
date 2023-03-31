const INITIAL_STATE = {
    users: [],
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case "SETUSERS":
            return ({
                ...state,
                users: action.payload
            })
    }
    return state;

}