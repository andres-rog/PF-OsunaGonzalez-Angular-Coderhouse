import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models";

export const SetLoggedUser = createAction (
    '[auth] Set User',
    props<{ payload: User }>(),
);

export const ClearAuthUser = createAction(
    '[Auth] Clear User'
)