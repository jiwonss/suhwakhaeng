import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { SearchInputBox } from '../../components/inputBox/Input';
import { ActivityIndicator, FlatList, Keyboard, View } from 'react-native';
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

const ResultContainer = styled.View`
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

const GovernmentScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [area, setArea] = useState<string>('');
  const dropdownData = ['양양', '원주', '고양', '나주'];
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const [governmentData, setGovernmentData] = useState<
    {
      governmentId: number;
      title: string;
      url: string;
      area: string;
      createdAt: string;
    }[]
  >([]);

  const onSubmit = () => {
    if (searchValue) {
      getGovernmentList();
      setSearchValue('');
    }
    Keyboard.dismiss();
  };

  const getGovernmentList = async () => {
    const params = { keyword: searchValue, area: area, page: 0, size: 0 };
    const response = await getGovernmentSponsorList(params);
    setGovernmentData(response.dataBody.data);
    setPageNumber(pageNumber + 1);
    setHasNext(response.dataBody.hasNext);
    setIsLoaded(true);
  };

  useEffect(() => {
    getGovernmentList();
  }, [area]);

  const renderItem = ({ item }) => {
    return (
      <ResultItem key={item.governmentId} onPress={() => openURL(item.url)}>
        <BasicTag>
          <Typo.Detail1_M color={Color.WHITE}>{item.area}</Typo.Detail1_M>
        </BasicTag>
        <Typo.BODY4_M>{item.title}</Typo.BODY4_M>
        <Typo.BODY4_M color={Color.GRAY600}>{getTimeSincePost(item.createdAt)}</Typo.BODY4_M>
      </ResultItem>
    );
  };

  const getMoreList = async () => {
    if (hasNext) {
      const params = { keyword: searchValue, area: area, page: pageNumber, size: 0 };
      const response = await getGovernmentSponsorList(params);
      setGovernmentData((prevData) => [...prevData, ...response.dataBody.data]);
      setHasNext(response.dataBody.hasNext);
    }
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' title='정부 보조금' />
      <SearchBarContainer>
        <DropDown defaultText='지역' width={widthPercent * 60} dataList={dropdownData} onSelect={setArea} />
        <SearchInputBox onSubmitSearch={onSubmit} width={widthPercent * 240} value={searchValue} setValue={setSearchValue} placeHolder={'검색어를 입력해주세요'} />
      </SearchBarContainer>
      <ResultContainer>
        {isLoaded ? (
          <FlatList data={governmentData} renderItem={renderItem} onEndReached={getMoreList} onEndReachedThreshold={0.8} />
        ) : (
          <ResultItem>
            <ActivityIndicator />
          </ResultItem>
        )}
      </ResultContainer>
    </Container>
  );
};

export default GovernmentScreen;
