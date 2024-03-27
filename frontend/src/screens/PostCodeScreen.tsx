import React, { useState } from 'react';
import Postcode from '@actbase/react-daum-postcode';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../stacks/mainStack/MainStack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface PostCodeProps {
  route: {
    params: { id: number; screenName: string };
  };
}

const PostCodeScreen = (props: PostCodeProps) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const navigation = useNavigation<RootStackNavigationProp>();
  const onAddressSelected = (addressData: OnCompleteParams) => {
    console.log('주소 데이터', addressData);
    const address = addressData.address;

    axios
      .get(`https://dapi.kakao.com/v2/local/search/address?query=${address}/analyze_type=exact`, { headers: { Authorization: `KakaoAK ${process.env.KAKAO_RESTAPI_KEY}` } })
      .then((res) => {
        setX(res.data.documents[0].x);
        setY(res.data.documents[0].y);
        if (props.route.params.screenName === 'MarketRegist') {
          navigation.navigate('MarketRegistScreen', { address: address, x: res.data.documents[0].x, y: res.data.documents[0].y });
        } else if (props.route.params.screenName === 'MarketModify') {
          navigation.navigate('MarketModifyScreen', { id: props.route.params.id, address: address, x: res.data.documents[0].x, y: res.data.documents[0].y });
        }
      })
      .catch((err) => console.log('에러', err));
  };
  const onAddressError = (error: unknown) => {
    console.log('주소에러', error);
  };
  return <Postcode style={{ width: '100%', height: '100%' }} onSelected={onAddressSelected} onError={onAddressError} jsOptions={{ animation: true }} />;
};

export default PostCodeScreen;
