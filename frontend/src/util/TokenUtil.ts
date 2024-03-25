import { useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Encrypted Storage에 토큰을 저장합니다.
 * @author 조은서
 */
export const setTokens = (response: any) => {
  EncryptedStorage.setItem('accessToken', response.accessToken);
  EncryptedStorage.setItem('refreshToken', response.refreshToken);
};

/**
 * Encrypted Storage에 저장된 토큰들을 가져옵니다.
 * @author 조은서
 */
export const getTokens = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  const refreshToken = await EncryptedStorage.getItem('refreshToken');

  return { accessToken: accessToken, refreshToken: refreshToken };
};

/**
 * Encrypted Storage에 저장된 토큰들을 제거합니다.
 * @author 조은서
 */
export const removeTokens = () => {
  EncryptedStorage.removeItem('accessToken');
  EncryptedStorage.removeItem('refreshToken');
};

export const verifyTokens = async () => {
  // 최초 접속일 때 -> oauthscreen으로 이동
  // if (tokens === null) {
  // }
  // 스토리지에 token이 있을 때 -> 토큰을 헤더에 넣어 검증
  // else {
  // }
};
