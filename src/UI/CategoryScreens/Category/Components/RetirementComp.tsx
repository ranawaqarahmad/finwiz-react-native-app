import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-gesture-handler';
import CustomDropDown from './CustomDropDown';

const RetirementComp = ({item, authToken}) => {
  const [isEditing, setIsEditing] = useState({
    retirement: false,
    lifestyle: false,
  });

  const [values, setValues] = useState({
    retirementValue: item.retirement.answer,
    lifestyleValue: item.lifestyle.answer,
  });

  const [lifestyleValue, setLifestyleValue] = useState(values.lifestyleValue);
  const [openLifestyle, setOpenLifestyle] = useState(false);

  const handleUpdate = async field => {
    setIsEditing(prev => ({...prev, [field]: false}));

    console.log(
      `UPDATED ${field.toUpperCase()} VALUE`,
      values[`${field}Value`],
    );

    if (field === 'retirement') {
      const numericValue = parseInt(values[`${field}Value`]);
      console.log(numericValue);
      if (numericValue >= 20 && numericValue <= 120) {
        await handleApiCall({
          question_id: item.retirement.question_id,
          answer: values[`${field}Value`],
          type: item.retirement.type,
        });
        setError('');
      } else {
        setError('Please enter a value between 20 and 120');
      }
    } else if (field === 'lifestyle') {
      await handleApiCall({
        question_id: item.lifestyle.question_id,
        answer: values[`${field}Value`],
        type: item.lifestyle.type,
      });
    }
  };

  const handleChange = (field, text) => {
    setValues(prev => ({...prev, [`${field}Value`]: text}));
  };

  const handleApiCall = async ({question_id, answer, type}) => {
    const resp = await fetch(
      'https://api-finwiz.softsquare.io/api/user/add-or-update-user-question',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id,
          answer,
          type,
        }),
      },
    );

    const data = await resp.json();

    console.log('DATA UPDATED', data);
  };

  const handleDropdownChange = (value, type) => {
    if (type === 'lifestyle') {
      setLifestyleValue(value);
      setValues(prev => ({...prev, lifestyleValue: value}));
    }
    console.log('Dropdown value selected:', value);
  };

  const [lifestyleItems, setLifestyleItems] = useState([]);

  useEffect(() => {
    setLifestyleItems([
      {label: 'Frugal', value: 'Frugal'},
      {label: 'Moderate', value: 'Moderate'},
      {label: 'Comfortable', value: 'Comfortable'},
    ]);
  }, []);

  const [error, setError] = useState('');

  return (
    <View
      style={{
        backgroundColor: 'white',
        rowGap: 16,
        margin: 2,
        elevation: 1,
        height: 280,
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, padding: 16}}>
          {isEditing.retirement ? (
            <>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={values.retirementValue}
                onChangeText={value => handleChange('retirement', value)}
                placeholder="Enter age"
              />

              <TouchableOpacity
                onPress={() => handleUpdate('retirement')}
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                {values.retirementValue}
              </Text>
            </>
          )}
          <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
            Retirement Age
          </Text>

          {!isEditing.retirement && (
            <TouchableOpacity
              onPress={() =>
                setIsEditing(prev => ({...prev, retirement: true}))
              }
              style={{position: 'absolute', top: 0, right: 16}}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../../assets/Images/edit.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1, padding: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            {'$' + item.saving}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
            Current Savings
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, padding: 16}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              {isEditing.lifestyle ? (
                <>
                  <DropDownPicker
                    open={openLifestyle}
                    value={lifestyleValue}
                    items={lifestyleItems}
                    setOpen={setOpenLifestyle}
                    setValue={setLifestyleValue}
                    onChangeValue={value =>
                      handleDropdownChange(value, 'lifestyle')
                    }
                    zIndex={9999}
                    style={{zIndex: 9999}}
                  />
                  <TouchableOpacity
                    onPress={() => handleUpdate('lifestyle')}
                    style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  {values.lifestyleValue}
                </Text>
              )}
              <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
                Lifestyle
              </Text>
            </View>
          </View>
          {!isEditing.lifestyle && (
            <TouchableOpacity
              onPress={() => setIsEditing(prev => ({...prev, lifestyle: true}))}
              style={{position: 'absolute', top: 0, right: 16}}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../../../../assets/Images/edit.png')}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 1, padding: 16}}></View>
      </View>

      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 1,
            width: '100%',
            borderWidth: 1,
            borderColor: '#EEEEEE',
          }}></View>
        <View
          style={{
            width: 1,
            height: '100%',
            borderWidth: 1,
            position: 'absolute',
            borderColor: '#EEEEEE',
          }}></View>
      </View>
    </View>
  );
};

export default RetirementComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 2,
    elevation: 1,
    height: 280,
  },
  innerContainer: {
    flexDirection: 'row',
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#9747FF',
    padding: 8,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4B5563',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
  editIcon: {
    width: 18,
    height: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
