/**
 * 게시글의 게시 시간을 현재 시간 기준 계산하여
 * '방금 전', '몇분 전' 등을 반환해주는 함수입니다.
 * @param postDate
 * @returns
 * @author 조은서
 */
export const getTimeSincePost = (postDate: string) => {
  const postTime = new Date(postDate).getTime();

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const currentTime = new Date(utc + koreaTimeDiff).getTime();

  const seconds = Math.floor((currentTime - postTime) / 1000);
  if (seconds < 60) {
    return '방금 전';
  } else {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}분 전`;
    } else {
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours}시간 전`;
      } else {
        const days = Math.floor(hours / 24);
        return `${days}일 전`;
      }
    }
  }
};

export const addComma = (data: string | number) => {
  let number = data;
  if (typeof data === 'string') {
    number = parseInt(data);
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 한국 현재 시간 반환해주는 함수입니다.
 * @author 조은서
 * @returns
 */
export const getKST = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const currentTime = new Date(utc + koreaTimeDiff);

  // 현재 날짜 및 시간을 문자열로 변환
  const year = currentTime.getFullYear();
  const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
  const day = ('0' + currentTime.getDate()).slice(-2);
  const hours = ('0' + currentTime.getHours()).slice(-2);
  const minutes = ('0' + currentTime.getMinutes()).slice(-2);
  const seconds = ('0' + currentTime.getSeconds()).slice(-2);

  // YYYY-MM-DD HH:MM:SS 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
