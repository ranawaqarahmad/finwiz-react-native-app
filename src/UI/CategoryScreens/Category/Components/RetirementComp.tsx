// import React from 'react';
// import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';

// const RetirementComp = ({item}) => {
//   console.log('ITEM 1########', item);
//   return (
//     <View
//       style={{
//         backgroundColor: 'white',
//         rowGap: 16,
//         margin: 2,
//         elevation: 1,
//         height: 280,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 16,
//           flex: 1,
//           alignItems: 'center',
//         }}>
//         <View style={{flex: 1, padding: 16}}>
//           <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
//             {item.retirement.answer}
//           </Text>
//           <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
//             Retirement Age
//           </Text>
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
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 16,
//           flex: 1,
//           alignItems: 'center',
//         }}>
//         <View style={{flex: 1, padding: 16}}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: 'bold',
//                 color: 'black',
//                 flex: 1,
//               }}>
//               {item.lifestyle.answer}
//             </Text>
//           </View>
//           <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
//             Lifestyle
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <View
//           style={{
//             height: 1,
//             width: '100%',
//             borderWidth: 1,
//             borderColor: '#EEEEEE',
//           }}></View>
//         <View
//           style={{
//             width: 1,
//             height: '100%',
//             borderWidth: 1,
//             position: 'absolute',
//             borderColor: '#EEEEEE',
//           }}></View>
//       </View>
//     </View>
//   );
// };

// export default RetirementComp;
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Install this for icons

const RetirementComp = ({item}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [retirementValue, setRetirementValue] = useState(
    item.retirement.answer,
  );

  // Handle update logic
  const handleUpdate = () => {
    setIsEditing(false);

    console.log('BBBBBBBBBBB', retirementValue);
  };

  return (
    <View
      style={{backgroundColor: 'white', margin: 2, elevation: 1, height: 280}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            {isEditing ? (
              <TextInput
                style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
                value={retirementValue}
                onChangeText={setRetirementValue}
                onBlur={handleUpdate}
                onSubmitEditing={handleUpdate}
                autoFocus={true}
              />
            ) : (
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                {retirementValue}
              </Text>
            )}
            <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
              Retirement Age
            </Text>
          </View>

          {/* Edit button */}
          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size={20} color="#4B5563" />
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

      {isEditing && (
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handleUpdate}
            style={{backgroundColor: '#4CAF50', padding: 10, borderRadius: 5}}>
            <Text style={{color: 'white'}}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RetirementComp;
