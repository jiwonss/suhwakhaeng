import { atom } from 'recoil';

/**
 * 임시 userInfoState
 */
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    userId: null,
    email: null,
    nickname: null,
    profileImage: null,
    isBusiness: null,
    profileContent: null,
    sido: null,
    gugun: null,
    dong: null,
  },
});
