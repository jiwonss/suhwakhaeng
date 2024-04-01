import React, { useEffect, useState } from 'react';
import { SlideModal } from '../../components/modal/Modal';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../../components/basic/Spacer';
import WebView from 'react-native-webview';

interface MoreModalProps {
  status: boolean;
  onChangeStatus: () => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (postId: number) => void;
  onModify: (postId: number) => void;
  postId: number;
}

export const MoreModal = (props: MoreModalProps) => {
  return (
    <SlideModal isVisible={props.isVisible} setIsVisible={props.setIsVisible}>
      <BasicButton
        onPress={props.onChangeStatus}
        width={widthPercent * 300}
        height={heightPercent * 45}
        borderColor={Color.GREEN500}
        borderRadius={10}
        backgroundColor={Color.WHITE}
      >
        <Typo.BODY3_M color={Color.GREEN500}>{props.status ? '판매 중으로 변경' : '판매 완료로 변경'}</Typo.BODY3_M>
      </BasicButton>
      <Spacer space={heightPercent * 10} />
      <BasicButton
        onPress={() => props.onModify(props.postId)}
        width={widthPercent * 300}
        height={heightPercent * 45}
        borderColor={Color.GREEN200}
        borderRadius={10}
        backgroundColor={Color.GREEN200}
      >
        <Typo.BODY3_M color={Color.WHITE}>수정하기</Typo.BODY3_M>
      </BasicButton>
      <Spacer space={heightPercent * 10} />
      <BasicButton onPress={() => props.onDelete(props.postId)} width={widthPercent * 300} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
        <Typo.BODY3_M color={Color.WHITE}>삭제하기</Typo.BODY3_M>
      </BasicButton>
    </SlideModal>
  );
};

interface KakaoMapProps {
  x: number;
  y: number;
}
export const KakaoMap = (props: KakaoMapProps) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(`
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services,clusterer,drawing"></script> 
        </head>
        <body >
            <div id="map" style="width:500px;height:400px;"></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                    const options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${props.y}, ${props.x}), //지도의 중심좌표.
                        draggable: false,
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };
                    
                    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

                    // 마커가 표시될 위치입니다 
                    var markerPosition  = new kakao.maps.LatLng(${props.y}, ${props.x}); 

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
                })();
            </script>       
        </body>
    </html>    
    `);
  }, [props]);

  return <WebView style={{ width: widthPercent * 300, height: heightPercent * 300 }} source={{ html: html }} />;
};
