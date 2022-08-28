import React, {createContext, useReducer} from "react";

const initialState = {
    component: <h1>Empty</h1>,
};

const drawerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_DRAWER_VIEW':
            return {
                component: action.payload
            };
        default:
            return state;
    }
};

const DrawerState = ({children}) => {
    const [state, dispatch] = useReducer(drawerReducer, initialState);
    return (
        <DrawerContext.Provider value={[state, dispatch]}>
            {children}
        </DrawerContext.Provider>
    )
};

export const DrawerContext = createContext(initialState);
export default DrawerState;

