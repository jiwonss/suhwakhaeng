import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { SearchInputBox } from '../../components/inputBox/Input';
import { Keyboard, View } from 'react-native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { DropDown } from '../../components/dropdown/DropDown';
import { getGovernmentSponsorList } from '../../apis/services/crawling/Crawling';
import { openURL } from '../../util/LinkUtil';
import { BasicTag } from '../../components/classificationTag/ClassificationTag';
import { getTimeSincePost } from '../../util/BasicUtil';

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${heightPercent * 10}px 0px;
  column-gap: ${widthPercent * 10}px;
`;

const ResultContainer = styled.ScrollView`
  flex: 1;
  margin: 0px ${widthPercent * 26}px;
`;

const ResultItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: ${Color.GRAY200};
  display: flex;
  flex-direction: column;
  row-gap: ${heightPercent * 10}px;
`;

type Data = {
  governmentId: number;
  title: string;
  url: string;
  area: string;
  createdAt: string;
};

const GovernmentScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [area, setArea] = useState<string>('');
  const dropdownData = ['나주', '양양', '원주', '고양'];

  const [governmentData, setGovernmentData] = useState<Data[]>([]);

  const onSubmit = () => {
    if (searchValue) {
      getGovernmentList();
      setSearchValue('');
    }
    Keyboard.dismiss();
  };

  const getGovernmentList = async () => {
    const params = { keyword: searchValue, area: area, page: 0, size: 0 };
    // const response = await getGovernmentSponsorList(params);
    setGovernmentData([
      {
        governmentId: 564,
        title: '『고양시농업기술센터와 건국대 선도연구센터(CRC)의 협력사업』 노인 만성질환 예방∙ 관리 치유농업 프로그램 참여자 모집계획',
        url: 'https://www.goyang.go.kr/agr/user/bbs/BD_selectBbs.do?q_bbsCode=1064&q_bbscttSn=20240329113534051',
        area: '고양',
        createdAt: '2024-03-29',
      },
      {
        governmentId: 1,
        title: '2025년도 농촌자원분야(생활지원) 지방이양 사업 신청 공고NEW',
        url: 'https://www.wonju.go.kr/wjatc/selectBbsNttView.do?key=3489&bbsNo=48&nttNo=435344&searchCtgry=&searchCnd=all&searchKrwd=&pageIndex=1&integrDeptCode=',
        area: '원주',
        createdAt: '2024-03-28',
      },
    ]);

    setIsLoaded(true);
  };

  useEffect(() => {
    getGovernmentList();
  }, [area]);

  return (
    <Container>
      <Header type='default' firstIcon='back' title='정부 보조금' />
      <SearchBarContainer>
        <DropDown defaultText='지역' width={widthPercent * 60} dataList={dropdownData} onSelect={setArea} />
        <SearchInputBox onSubmitSearch={onSubmit} width={widthPercent * 240} value={searchValue} setValue={setSearchValue} placeHolder={'검색어를 입력해주세요'} />
      </SearchBarContainer>
      <ResultContainer>
        {isLoaded &&
          governmentData.map((item) => (
            <ResultItem key={item.governmentId} onPress={() => openURL(item.url)}>
              <BasicTag>
                <Typo.Detail1_M color={Color.WHITE}>{item.area}</Typo.Detail1_M>
              </BasicTag>
              <Typo.BODY4_M>{item.title}</Typo.BODY4_M>
              <Typo.BODY4_M color={Color.GRAY600}>{getTimeSincePost(item.createdAt)}</Typo.BODY4_M>
            </ResultItem>
          ))}
      </ResultContainer>
    </Container>
  );
};

export default GovernmentScreen;
