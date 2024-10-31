import {View, Text, Image} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ScrollViewDropDown = ({
  open,
  setOpen,
  setItems,
  setValue,
  value,
  items,
  modalTitle,
  onDropDownChange,
}) => {
  return (
    <View style={{width: 130}}>
      <DropDownPicker
        onChangeValue={onDropDownChange}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        disableBorderRadius={false}
        mode="SIMPLE"
        setItems={setItems}
        // placeholderStyle={{...AppStyles.largeregularText,color:AppColors.black50, marginStart: 16,}}
        // textStyle={{...AppStyles.largeregularText, marginStart: 16,}}
        // labelStyle={{ ...AppStyles.largeregularText, marginStart: 16 }}

        listMode="SCROLLVIEW"
        placeholder={modalTitle}
        modalProps={{animationType: 'fade'}}
        modalTitle={modalTitle}
        // selectedItemLabelStyle={{ ...AppStyles.smallCategoryText, color: AppColors.mainorange }}
        listItemLabelStyle={{color: 'black', fontSize: 16}}
        modalContentContainerStyle={{backgroundColor: '#fff'}}
        dropDownContainerStyle={{
          borderWidth: 0,
          borderRadius: 24,
          elevation: 10,
        }}
        style={{
          borderRadius: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 0,

          backgroundColor: 'white',
        }}
      />
    </View>
  );
};

export default ScrollViewDropDown;
