import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Option {
  label: string;
  value: string;
}

const RetirementScreenA = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const handleClickArrow = () => {
    navigation.navigate('RetirementScreenB');
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('20');
  const [dropDownItems, setDropDownItems] = useState<Option[]>([]);

  function generateAgeItemsArray() {
    const result = [];

    for (let i = 20; i <= 80; i++) {
      result.push({label: `${i}`, value: `${i}`});
    }

    setDropDownItems(result);
  }

  useEffect(() => {
    generateAgeItemsArray();
  }, []);

  return (
    <View style={styles.mainview}>
      <Progress.Bar progress={0.63636363} width={null} color="#9747FF" />
      {/* cross image design */}
      <View style={styles.submain}>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/Images/crossblack.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
        {/* cross image design end */}

        {/* financial goals view design */}
        <View style={{paddingBottom: 30}}>
          <Text style={{fontSize: 14, color: '#9747FF', paddingTop: 10}}>
            Retirement Planning
          </Text>
          <Text style={{fontSize: 24, paddingTop: 10}}>
            Have you thought about when you might retire?
          </Text>
          {/* <Text style={{ paddingTop: 15, fontSize: 14 }}>
          like children or elderly family members, that you financially support?
          </Text> */}
        </View>
        {/* financial goals view design end*/}

        {/* choose Options View Design */}
        <View>
          <Text style={{fontSize: 16, paddingBottom: 15}}>Choose Options</Text>
          {[' Early (before 60)', 'Standard (60-65)', 'Late (after 65)'].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 15,
                  flexDirection: 'row',
                  borderColor: '#cbcbcb',
                }}
                onPress={() => handleOptionPress(option)}>
                <View style={{flex: 0.95}}>
                  <Text style={styles.optionstext}>{option}</Text>
                </View>
                {selectedOption === option && (
                  <Image
                    source={require('../../../../assets/Images/greencheck.png')}
                    style={{
                      height: 20,
                      width: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                )}
              </TouchableOpacity>
            ),
          )}
        </View>
        {/* choose Options View Design End */}

        {/* dropdown */}

        <View>
          <DropDownPicker
            open={openDropDown}
            value={dropDownValue}
            items={dropDownItems}
            setOpen={setOpenDropDown}
            setValue={setDropDownValue}
            setItems={setDropDownItems}
            placeholder="Select Transaction Type"
          />
        </View>
      </View>

      <View style={{marginBottom: 32, marginRight: 32}}>
        <RoundButtonComp onpress={handleClickArrow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  submain: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  optionstext: {
    fontSize: 16,
    textAlignVertical: 'center',
  },
});

export default RetirementScreenA;
