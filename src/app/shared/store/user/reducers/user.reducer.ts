import {Paginated} from "../../../types/paginated.type";
import {UserModel} from "../../../models/user.model";
import {Action, createReducer, on} from "@ngrx/store";
import {UserActions} from "../index";

export interface State {
  userList: Paginated<UserModel> | null;
  isLoading: boolean;
  error: string;
}

export const userFeatureKey = 'user';

export const initialState: State = {
  userList: null,
  isLoading: false,
  error: ''
};

const userReducer = createReducer(
  initialState,
  on(
    UserActions.loadUserListRequested,
    state => ({ ...state, isLoading: true, error: '' })
  ),
  on(
    UserActions.loadUserListSucceeded,
    (state, { userList }) => ({
      ...state,
      userList,
      isLoading: false
    })
  ),
  on(
    UserActions.loadUserListFailed,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
