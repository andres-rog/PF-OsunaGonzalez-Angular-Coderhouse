import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";
import { User } from "src/app/core/models";


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => state.authUser
);

export const selectIsTokenVerified = createSelector(
    selectAuthState,
    (state: AuthState) => state.isTokenVerified
  );