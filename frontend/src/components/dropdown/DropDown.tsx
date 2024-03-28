import SelectDropdown from 'react-native-select-dropdown';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';

interface DropDownProps {
  dataList: Array<string>;
  onSelect: React.Dispatch<React.SetStateAction<string | string>> | React.Dispatch<React.SetStateAction<number>>;
  defaultText: string;
  width?: number;
}

export const DropDown = (props: DropDownProps) => {
  return (
    <SelectDropdown
      buttonStyle={{
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: Color.GRAY300,
        backgroundColor: Color.WHITE,
        width: props.width ? props.width * widthPercent : '100%',
        height: heightPercent * 36,
        padding: widthPercent * 10,
        marginVertical: heightPercent * 10, 
      }}
      buttonTextStyle={{ 
        textAlign: 'left', // 텍스트를 왼쪽 정렬
        fontSize: widthPercent * 12, // 텍스트 크기 설정
        fontFamily: 'GmarketSansTTFMedium',
        color: Color.GRAY400, // 텍스트 색상 설정
      }}
      data={props.dataList}
      onSelect={(selectedItem, index) => props.onSelect(selectedItem)}
      buttonTextAfterSelection={(selectedItem, index) => selectedItem}
      rowTextForSelection={(item, index) => item}
      defaultButtonText={props.defaultText}
      dropdownOverlayColor='none'
      dropdownStyle={{ borderRadius: widthPercent * 5, borderColor: Color.GRAY300, backgroundColor: Color.WHITE }}
    />
  );
};
