import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp';
import { useNavigation } from '@react-navigation/native';

const AchieveScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const handleClickArrow = () => {
    navigation.navigate('GoalScreen');
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.mainview}>
      <Progress.Bar progress={0.09090909} width={null} color="#9747FF" />
      {/* cross image design */}
      <View style={styles.submain}>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/Images/crossblack.png')}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        {/* cross image design end */}

        {/* financial goals view design */}
        <View style={{ paddingBottom: 30 }}>
          <Text style={{ fontSize: 14, color: '#9747FF', paddingTop: 10 }}>
            Financial Goals
          </Text>
          <Text style={{ fontSize: 24, paddingTop: 10 }}>
            What are some things you're looking to achieve in the next{'\n'}1-2
            years?
          </Text>
          <Text style={{ paddingTop: 15, fontSize: 14 }}>
            (e.g., saving for a vacation, paying off debt)
          </Text>
        </View>
        {/* financial goals view design end*/}

        {/* choose Options View Design */}
        <View>
          <Text style={{ fontSize: 16, paddingBottom: 15 }}>Choose Options</Text>
          {['Save for a Vacation', 'Pay off credit card debt', 'Build an Emergency Fund', 'Other'].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 15,
                flexDirection: 'row',
                borderColor: '#cbcbcb'
              }}
              onPress={() => handleOptionPress(option)}
            >
              <View style={{ flex: 0.95 }}>
                <Text style={styles.optionstext}>{option}</Text>
              </View>
              {selectedOption === option && (
                <Image
                  source={require('../../../../assets/Images/greencheck.png')}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                    justifyContent: 'center'
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* choose Options View Design End */}
      </View>

      <View style={{ marginBottom: 32, marginRight: 32 }}>
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

export default AchieveScreen;
