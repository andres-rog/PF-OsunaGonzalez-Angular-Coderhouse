import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/models";
import { ClearAuthUser, SetLoggedUser } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: User | null;
}

const initialState: AuthState = {
    authUser: null,
}

export const authReducer = createReducer(
    initialState,

    on(SetLoggedUser, (currentState, action) =>{
        return {
            authUser: action.payload
        }
    }),
    
    on(ClearAuthUser, (currentState) => {
        return {
            authUser: null
        }
    })
);