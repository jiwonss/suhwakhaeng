import { TouchableOpacity, View } from 'react-native';
import { BODY3_M, BODY4_M, Detail0_M, Detail1_M } from '../typography/Typography';
import { UriImageLoader } from '../image/ImageLoader';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../basic/Spacer';
import Hyperlink from 'react-native-hyperlink';
import { openURL } from '../../util/LinkUtil';
import { useState } from 'react';

interface NewsItemProps {
  uri: string;
  title: string;
  content: string;
  company: string;
  date: string;
  href: string;
}

export const NewsItemCard = (props: NewsItemProps) => {
  return (
    <Hyperlink>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.4
        }}
        onPress={() => openURL(props.href)}
      >
        <View style={{ height: 'auto', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <Spacer space={heightPercent* 10}></Spacer>
          <BODY3_M>{props.title}</BODY3_M>
          <Spacer space={heightPercent * 4} />
          <BODY4_M numberOfLines={2}>{props.content}</BODY4_M>
          <Spacer space={heightPercent * 4} />
          <BODY4_M color=''>{`${props.company}  ${props.date}`}</BODY4_M>
        </View>
        <Spacer space={widthPercent * 8} horizontal />
        {props.uri && <UriImageLoader uri={props.uri} style={{ width: widthPercent * 50, aspectRatio: 1 / 1, borderRadius: widthPercent * 12 }} />}
      </TouchableOpacity>
    </Hyperlink>
  );
};
