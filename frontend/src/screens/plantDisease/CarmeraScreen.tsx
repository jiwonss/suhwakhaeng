import React, { useEffect } from 'react';
import { View } from 'react-native';
// import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        navigation.goBack();
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode as string);
        navigation.goBack();
      } else if (response.errorMessage) {
        console.log('Error Message: ', response.errorMessage as string);
        navigation.goBack();
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri as string;
        navigation.navigate('DetailDiseasePlantScreen', { photo: source });
      }
    });
  }, [navigation]);

  return <View style={{ flex: 1 }} />;
};

export default CameraScreen;
