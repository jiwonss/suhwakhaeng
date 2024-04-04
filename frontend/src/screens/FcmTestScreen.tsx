import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const FcmTestScreen = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };

  useEffect(() => {

    Toast.show({
      type: 'success',
      text1: '알림',
      text2: '앱이 성공적으로 로드되었습니다.',
      visibilityTime: 3000, // 토스트 메시지가 화면에 표시되는 시간 (ms)
    });

    getFcmToken();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const showToast = () => {
    // 버튼 클릭 시 토스트 메시지 표시
    Toast.show({
      type: 'info',
      text1: '알림',
      text2: '버튼이 클릭되었습니다.',
      visibilityTime: 3000, // 토스트 메시지가 화면에 표시되는 시간 (ms)
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>FcmTestScreen</Text>
      <Button title="토스트 메시지 표시" onPress={showToast} />
    </SafeAreaView>
  );
};

export default FcmTestScreen;