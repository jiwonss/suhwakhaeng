export const changeCategoryName = (category: string) => {
  let newCategoryName = '';
  switch (category) {
    case 'CROP':
      newCategoryName = '작물';
      break;
    case 'MATERIAL':
      newCategoryName = '농자재';
      break;

    case 'EXPERIENCE':
      newCategoryName = '체험';
      break;
    case 'WORK':
      newCategoryName = '일손';
      break;
  }
  return newCategoryName;
};
