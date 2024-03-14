import { atom } from 'recoil';

/**
 * 임시 userInfoState
 */
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    user_id: 1,
    name: '김농부',
  },
});
