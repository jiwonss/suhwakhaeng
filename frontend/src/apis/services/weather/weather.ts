import axios from 'axios';
import locationData from '../../../../assets/data.json';
import tokenInstance from '../../utils/tokenInstance';

const KMA_KEY = process.env.KMA_KEY;

const KMAApi = axios.create({
  baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/',
  params: {
    serviceKey: KMA_KEY,
    dataType: 'json',
    numOfRows: '500', // 한 페이지 결과 수  하루 데이터 266 12의 배수 인데 무엇인가 이상하다??
    pageNo: '1', // 페이지 번호
  },
});

// 단기예보
// 5시 발표
export const getVilageFcst = async (pastdate: string, date: string, hour: string, x: number, y: number) => {
  console.log('단기예보 api') ;

  const response = await KMAApi.get('getVilageFcst', {
    params: {
      base_date: pastdate, // 기준 날짜
      base_time: '2300', // 기준 시간 (예: 0500: 2시)
      nx: x, // 예보지점 X 좌표
      ny: y, // 예보지점 Y 좌표
    },
  });
  const dataset = response.data.response.body.items.item;
  let newdata: any = {};
  let max_tmp = -Infinity;
  let min_tmp = Infinity;

  dataset.forEach((item) => {
    if (item.fcstDate == date) {
      newdata = {
        ...newdata,
        [item.fcstTime]: {
          ...newdata[item.fcstTime],
          [item.category]: item.fcstValue,
        },
      };

      // 최고기온, 최저 기온
      if (item.category == 'TMP') {
        if (max_tmp < Number(item.fcstValue)) {
          max_tmp = Number(item.fcstValue);
          // console.log(max_tmp)
        }

        if (min_tmp > Number(item.fcstValue)) {
          min_tmp = Number(item.fcstValue);
          // console.log(min_tmp);
        }
      }
    }
  });

  return { data: newdata, max_tmp: max_tmp, min_tmp: min_tmp };
};
// location 가져오기
export const getLocation = async () => {
  const response = await tokenInstance.get('common/users/my-profile');
  console.log(response.data);

  const sido = response.data.dataBody.sido;
  const gugun = response.data.dataBody.gugun;
  const dong = response.data.dataBody.dong;
  
  
  console.log(sido, gugun, dong);
  
  // const sido = '광주';
  // const gugun = '광산구';
  // const dong = '장덕동';
  
  if ( sido === null ) {
    return { x: 0, y: 0, location: `` };
  }

  const data = locationData.filter((item) => {
    if (sido.includes('세종')) {
      return item['1단계'].includes(sido) && item['3단계'] === gugun;
    } else {
      return item['1단계'].includes(sido) && item['2단계'] === gugun;
    }
  });

  return { x: data[0]['격자 X'], y: data[0]['격자 Y'], location: `${sido} ${gugun} ${dong}` };
};
