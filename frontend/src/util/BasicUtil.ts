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
