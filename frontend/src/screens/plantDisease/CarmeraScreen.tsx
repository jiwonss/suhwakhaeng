import React, { useEffect } from 'react';
import { RNCamera } from 'react-native-camera';

import { View } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const CameraScreen = () => {
  return (
    <RNCamera
      style={{ flex: 1 }}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      onBarCodeRead={(barcode) => {
        console.log(barcode);
      }}
      captureAudio={false}
    />
  );
};

export default CameraScreen;
