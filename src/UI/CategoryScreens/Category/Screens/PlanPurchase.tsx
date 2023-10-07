import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


const PlanPurchase = () => {
    const navigation = useNavigation();
  const handleClick=()=>{
    navigation.navigate('GeneratingPlan')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainview}>
        {/* ADD NEW CATEGORY */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Plan Purchase
          </Text>
          <TouchableOpacity>
          <Text onPress={()=>navigation.goBack()} style={{fontSize: 16, color: '#5145CD', alignSelf: 'center'}}>
            Cancel
          </Text>
          </TouchableOpacity>
        </View>

        {/* add image */}


        {/* ENTER CATEGORY LABEL */}
        

        <Text style={{fontSize: 14, marginBottom: 30,color:'black',fontWeight:'500',marginTop:20}}>
          Choose Category
        </Text>
        <TouchableOpacity>
        <View
          style={{
            height: 56,
            padding: 18,
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#9CA3AF',
          }}>
          <Text>Travel and Experience</Text>
          <Image
            source={require('../../../../assets/Images/downarrow.png')}
            style={{height: 20, width: 20, marginLeft: 30}}
            resizeMode="contain"
          />
        </View>
        </TouchableOpacity>

          {/* SET NAME START */}
          <View style={{marginTop: 20}}>
          <Text style={{fontSize: 14, color: 'black', marginBottom: 15,fontWeight:'500'}}>
            Set name for this purchase
          </Text>

          {/* TextInput */}
          <TextInput
            style={{
              width: '100%',
              height: 58,
              backgroundColor: 'white',
              paddingHorizontal: 16,
              fontSize: 14,
              borderWidth: 1,
              borderColor: '#9CA3AF',
              borderRadius: 4,
            }}
            placeholder="I-e Macbook Pro M1"
          />
        </View>
            {/* SET NAME START ends */}

            {/* HOW MUCH YOU NEED */}
                
            <View style={{marginTop: 20}}>
          <Text style={{fontSize: 14, color: 'black', marginBottom: 10,fontWeight:'500'}}>
            How much you need?
          </Text>

          {/* TextInput */}
          <TextInput
            style={{
              width: '100%',
              height: 58,
              backgroundColor: 'white',
              paddingHorizontal: 16,
              fontSize: 14,
              borderWidth: 1,
              borderColor: '#9CA3AF',
              borderRadius: 4,
            }}
            placeholder="Enter Amount $$$"
          />
        </View>

        <Text style={{fontSize: 14, marginBottom: 20,color:'black',fontWeight:'500',marginTop:20}}>
        When are you planning to have it?
        </Text>
        <TouchableOpacity>
        <View
          style={{
            height: 56,
            padding: 18,
            borderRadius: 4,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor:'#9CA3AF'
          }}>
          <Image
            source={require('../../../../assets/Images/calendar.png')}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
          <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-evenly'}}>
          <Text style={{marginLeft:15,color:'#9CA3AF',fontWeight:'400',flex:.94,alignSelf:'center',marginRight:-20}}>Choose Dates</Text>
          <Image
            source={require('../../../../assets/Images/righthalfarrow.png')}
            style={{height: 20, width: 20,}}
            resizeMode="contain"
          />
          </View>
        </View>
        </TouchableOpacity>

        {/* CHOOSE CATEGORY TYPE */}

        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
        <Text style={{fontSize: 14, marginBottom: 20,color:'black',fontWeight:'500',marginTop:20}}>
          Choose Priority
        </Text>
          <Image
          source={require('../../../../assets/Images/infocircle.png')}
          style={{height:20,width:20,alignSelf:'center'}}
          />
        </View>

        <TouchableOpacity>
        <View
          style={{
            height: 56,
            padding: 18,
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#9CA3AF',
          }}>
          <View style={{flexDirection:'row'}}>
          <Image source={require('../../../../assets/Images/flag.png')} style={{height:20,width:20}} resizeMode='contain'/>
          <Text style={{fontSize:14,alignSelf:'center',marginLeft:10,color:'black'}}>High</Text>
          </View>
          <Image
            source={require('../../../../assets/Images/downarrow.png')}
            style={{height: 20, width: 20,}}
            resizeMode="contain"
          />
        </View>
        </TouchableOpacity>

        {/* ADD BUTTON START */}
        <View style={{height: 48, width: '100%'}}>
        <TouchableOpacity onPress={handleClick}>
          <Image
            source={require('../../../../assets/Images/addbutton.png')}
            style={{height: 48, width: '100%', borderRadius: 8, marginTop: 30}}
          />
                  </TouchableOpacity>

        </View>
        {/* ADD BUTTON END */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainview: {
    flex: 1,
    padding: 17,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  settingText: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight:'bold'
  },
});
export default PlanPurchase;
