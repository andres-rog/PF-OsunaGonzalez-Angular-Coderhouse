import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/models";
import { ClearAuthUser, LoginUserSuccess, SetLoggedUser, SetUserByToken, VerifyTokenFailure, VerifyTokenSuccess } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: User | null;
    isTokenVerified: boolean | null;
}

const initialState: AuthState = {
    authUser: null,
    isTokenVerified: null,
}

export const authReducer = createReducer(
    initialState,

    on(SetLoggedUser, (state, action) => {
        return {
          ...state,
          authUser: action.payload
        }
      }),
    
      on(ClearAuthUser, () => {
        return {
          ...initialState
        }
      }),

    on(LoginUserSuccess, (state, { payload }) => {
        return {
          ...state,
          authUser: payload
        };
      }),

    on(SetUserByToken, (state, { user }) => (
        { 
            ...state, 
            user 
        })),
    
    on(VerifyTokenSuccess, (state) => (
        { 
            ...state, 
            isTokenVerified: true 
        })),

    on(VerifyTokenFailure, (state) => (
        { 
            ...state, 
            isTokenVerified: false 
        }))

);