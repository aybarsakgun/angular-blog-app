import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromUser from '../reducers/user.reducer';

const getUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserList = createSelector(
  getUserState,
  state => state.userList
);

export const selectUserListError = createSelector(
  getUserState,
  state => state.error
);

export const selectUserListIsLoading = createSelector(
  getUserState,
  state => state.isLoading
);

export const selectUserListVm = createSelector(
  selectUserList,
  selectUserListError,
  selectUserListIsLoading,
  (userList, error, loading) => ({
    userList,
    error,
    loading
  })
);
