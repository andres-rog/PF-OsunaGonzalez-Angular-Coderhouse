import { createAction, props } from "@ngrx/store";
import { LoginFormValue } from "src/app/auth/services/auth.service";
import { User } from "src/app/core/models";

export const SetLoggedUser = createAction (
    '[auth] Set User',
    props<{ payload: User }>(),
);

export const ClearAuthUser = createAction(
    '[Auth] Clear User'
)

export const LoginUser = createAction(
    '[auth] Login User',
    props<{ payload: LoginFormValue }>()
  );
  
  export const LoginUserSuccess = createAction(
    '[auth] Login User Success',
    props<{ payload: User }>()
  );
  
  export const LoginUserFailure = createAction(
    '[auth] Login User Failure',
    props<{ error: any }>()
  );
  
  export const LogoutUser = createAction(
    '[Auth] Logout User'
  );

  export const LogoutUserSuccess = createAction(
    '[Auth] Logout User Success'
  );

  export const FindUserByToken = createAction(
    '[Auth] Find User By Token', 
    props<{ token: string }>()
  );

  export const SetUserByToken = createAction(
    '[Auth] Set User By Token', 
    props<{ user: User }>()
  );

  export const FindUserByTokenFailure = createAction(
    '[Auth] Find User By Token Failure', 
    props<{ error: any }>()
  );

  export const VerifyToken = createAction(
    '[Auth] Verify Token', 
    props<{ token: string }>()
  );

  export const VerifyTokenSuccess = createAction(
    '[Auth] Verify Token Success', 
    props<{ user: User }>()
  );

  export const VerifyTokenFailure = createAction(
    '[Auth] Verify Token Failure', 
    props<{ error: any }>()
  );
