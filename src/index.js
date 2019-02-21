
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
//reducer - take the actions dispached and  does something
//Can handle multiple actions
//This is the place where you figure it out how to change the state
const mathReducer = (state = {
    result : 1, 
    lastvalues:[],
    username : "Ricardo"
}, action ) => {
    switch (action.type)
    {
        case "ADD":
                //state = state + action.payload;
                //This is not immutable. Simple change the value of a reference.
                //state.result += action.payload;

                // ES6 spreat operator ...
                //Gets all the properties from an object

                state = {
                    ...state, // spread all the properties of my old state
                    result: state.result + action.payload, // overwrite only what i need
                    lastvalues: [...state.lastvalues, action.payload]
                }
              //  state.lastvalues.push(action.payload); not immutable
            break;
        case "SUBTRACT":
       //state = state - action.payload;
                state = {
                    ...state, // spread all the properties of my old state
                    result: state.result - action.payload, // overwrite only what i need
                    lastvalues: [...state.lastvalues, action.payload]
                    //spread all the properties of lastvalues array
                }
              ///  state.lastvalues.push(action.payload);not immutable
            break;
    }
    return state;
}

const userReducer = (state = {
                                name : "Ricardo", 
                                age : 36
                            }, action ) =>  {
    switch (action.type)
    {
        case "SET_NAME":
                state = {
                    ...state, // spread all the properties of my old state
                    name: action.payload // overwrite only what i need
                }
              //  state.lastvalues.push(action.payload); not immutable
            break;
        case "SET_AGE":
                state = {
                    ...state, // spread all the properties of my old state
                    age:  state.age + action.payload
                }
            break;
    }
    return state;
}

const loggerMd = (store) => (next) => (action) =>
{
    console.log("Logger", action);
    next(action); //can call the next middleware in the chain
};

// first argument ( reducer) second inicial app state
//The store knows who is handling the action 

// objects and arrays are reference types, they are not get copied
// instead, they have points in memory
const store = createStore(
    combineReducers({userReducer,mathReducer}),
    {}, 
    applyMiddleware(createLogger()));

//component interested in receiveing the new state (subscribe)
store.subscribe(() => {
   // console.log("Store uploaded!", store.getState());
});

store.dispatch({
    type:"ADD",
    payload: 100 // is a value you wanna change
});

store.dispatch({
    type:"ADD",
    payload: 22
});

store.dispatch({
    type:"SUBTRACT",
    payload: 80
});

store.dispatch({
    type: "SET_AGE",
    payload: 1
})

store.dispatch({
    type: "SET_NAME",
    payload: "Ricardo set name"
})
