import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const RetirementComp = ({item}) => {
  const [isEditing, setIsEditing] = useState({
    retirement: false,
    lifestyle: false,
  });

  const [values, setValues] = useState({
    retirementValue: item.retirement.answer,
    lifestyleValue: item.lifestyle.answer,
  });

  const handleUpdate = field => {
    setIsEditing(prev => ({...prev, [field]: false}));

    console.log(
      `UPDATED ${field.toUpperCase()} VALUE`,
      values[`${field}Value`],
    );
  };

  const handleChange = (field, text) => {
    setValues(prev => ({...prev, [`${field}Value`]: text}));
  };

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
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              {isEditing.retirement ? (
                <TextInput
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
                  value={values.retirementValue}
                  onChangeText={text => handleChange('retirement', text)}
                  onBlur={() => handleUpdate('retirement')}
                  onSubmitEditing={() => handleUpdate('retirement')}
                  autoFocus={true}
                />
              ) : (
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  {values.retirementValue}
                </Text>
              )}
              <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
                Retirement Age
              </Text>
            </View>
          </View>
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
                <TextInput
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
                  value={values.lifestyleValue}
                  onChangeText={text => handleChange('lifestyle', text)}
                  onBlur={() => handleUpdate('lifestyle')}
                  onSubmitEditing={() => handleUpdate('lifestyle')}
                  autoFocus={true}
                />
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
// import React, {useState} from 'react';
// import {View, Text, TextInput, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Install this for icons

// const RetirementComp = ({item}) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [retirementValue, setRetirementValue] = useState(
//     item.retirement.answer,
//   );

//   // Handle update logic
//   const handleUpdate = () => {
//     setIsEditing(false);

//     console.log('BBBBBBBBBBB', retirementValue);
//   };

//   return (
//     <View
//       style={{backgroundColor: 'white', margin: 2, elevation: 1, height: 280}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 16,
//           flex: 1,
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             flex: 1,
//             padding: 16,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View style={{flex: 1}}>
//             {isEditing ? (
//               <TextInput
//                 style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
//                 value={retirementValue}
//                 onChangeText={setRetirementValue}
//                 onBlur={handleUpdate}
//                 onSubmitEditing={handleUpdate}
//                 autoFocus={true}
//               />
//             ) : (
//               <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
//                 {retirementValue}
//               </Text>
//             )}
//             <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
//               Retirement Age
//             </Text>
//           </View>

//           {/* Edit button */}
//           {!isEditing && (
//             <TouchableOpacity onPress={() => setIsEditing(true)}>
//               <Icon name="pencil" size={20} color="#4B5563" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={{flex: 1, padding: 16}}>
//           <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
//             {'$' + item.saving}
//           </Text>
//           <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
//             Current Savings
//           </Text>
//         </View>
//       </View>

//       {isEditing && (
//         <View
//           style={{
//             padding: 16,
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//           }}>
//           <TouchableOpacity
//             onPress={handleUpdate}
//             style={{backgroundColor: '#4CAF50', padding: 10, borderRadius: 5}}>
//             <Text style={{color: 'white'}}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default RetirementComp;
