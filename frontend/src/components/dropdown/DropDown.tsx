import SelectDropdown from 'react-native-select-dropdown';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';

interface DropDownProps {
  dataList: Array<string>;
  onSelect: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>;
  defaultText: string;
  width?: number;
}

export const DropDown = (props: DropDownProps) => {
  return (
    <SelectDropdown
      buttonStyle={{ borderRadius: widthPercent * 10, borderWidth: heightPercent * 2, borderColor: Color.GRAY300, backgroundColor: Color.GRAY100, width: props.width || 'auto' }}
      data={props.dataList}
      onSelect={(selectedItem, index) => props.onSelect(selectedItem)}
      buttonTextAfterSelection={(selectedItem, index) => selectedItem}
      rowTextForSelection={(item, index) => item}
      defaultButtonText={props.defaultText}
      dropdownOverlayColor='none'
      dropdownStyle={{ borderRadius: widthPercent * 10, borderColor: Color.GRAY300, backgroundColor: Color.GRAY100 }}
    />
  );
};
