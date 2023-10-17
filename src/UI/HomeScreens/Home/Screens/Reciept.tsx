import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import RNFS from 'react-native-fs';


const Reciept = () => {
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const accountId = selector.accountId;

    const navigation = useNavigation()
    const route = useRoute()
    const { recieptDetails, basicDetails } = route.params
    console.log('recieptDetails', recieptDetails);



    function base64ToBinary(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
      
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
      
        return bytes;
      }
    function isBase64(str) {
        const base64RegExp = /^[A-Za-z0-9+/]+[=]{0,3}$/;
        return base64RegExp.test(str);
      }

    const formatDate = (dateStr: any) => {
        const originalDate = moment(dateStr, 'YYYY-MM-DD HH:mm:ss').format('MMMM D');
        const formattedDate = originalDate;
        return formattedDate;
    };
    const [imageSource, setImageSource] = useState(null);

    const openCamera = () => {
        const options = {
            title: 'Take a Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                // Display the taken photo
                const source = { uri: response.uri };
                setImageSource(source);
            }
        });
    };
    const openGallery = () => {
        const options = {
            title: 'Select an Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                console.log(response.assets[0].uri);

                // Read the image file without encoding as base64
                RNFS.readFile(response.assets[0].uri, 'base64')
                    .then((imageBinaryData) => {
                        if (isBase64(imageBinaryData)) {
                            console.log("The data is in base64 format.");
                          } else {
                            console.log("The data is not in base64 format.");
                          }

                          const binaryData = base64ToBinary(imageBinaryData);

                          if (isBase64(binaryData)) {
                            console.log("The data is in base64 format.");
                          } else {
                            console.log("The data is not in base64 format.");
                          }

                        // console.log('Image Binary Data is',imageBinaryData);
                        addReceipt(binaryData);
                    });
            }
        });
    };

    const addReceipt = async (imageBinaryData) => {
        console.log('Receipt Details', recieptDetails.id);
        console.log('Account ID', recieptDetails.account_id);
        // console.log('Auth Token', authToken);

        try {
            // Create a FormData object to send binary data
          

            const response = await fetch(`https://api-finwiz.softsquare.io/api/user/transaction-receipt/${recieptDetails.id}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify({
                    account_id:recieptDetails.account_id,
                    receipt: `data:image/jpeg;base64,${imageBinaryData}`
                    
                }),
            });

            const data = await response.json();

            if (data.status) {
                console.log('Data:', data);
            } else {
                console.log('False Data:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };




    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.mainview}>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/Images/backarrow.png')}
                            style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                    {/* dots */}
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/Images/verticaldots.png')}
                            style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 20 }}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 10, fontSize: 12, fontWeight: '400', color: '#6B7280' }}>ID 1234567898</Text>

                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928' }}>{recieptDetails.merchant_name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928' }}>{recieptDetails.amount}</Text>
                </View>
                <Text style={{ marginTop: 4, color: '#6B7280' }}>
                    {formatDate(recieptDetails.datetime)} , {basicDetails.category}
                </Text>

                <View>
                    <View style={{ flexDirection: 'row', marginTop: 30, width: '100%', }}>
                        <Text style={{ width: '50%', fontSize: 12, fontWeight: 'normal', color: '#6B7280' }}>Merchant Name</Text>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#111928', textAlign: 'right', }}>{recieptDetails.merchant_name}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, width: '100%',  marginBottom: 70 }}>
                        <Text style={{width:'50%', fontSize: 12, fontWeight: 'normal',color:'#6B7280' }}>Merchant id</Text>
                        <Text style={{  fontSize: 12, fontWeight: '600',color:'#111928', textAlign: 'right',  }}>1234567</Text>
                    </View> */}
                </View>
                {recieptDetails.receipt ?
                    <Image resizeMode='stretch' source={{ uri: recieptDetails.receipt }} style={{ height: 200, width: 100, marginTop: 70, alignSelf: 'center' }}></Image>
                    :
                    <View style={{ marginTop: 16 }}>
                        {imageSource ?

                            <View>
                                <Image resizeMode='cover' source={{ uri: imageSource }} style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 16 }}></Image>
                                <TouchableOpacity onPress={openGallery}>
                                    <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 14, fontWeight: '400', color: '#7C56FE', marginTop: 30 }}>Upload again</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ marginTop: 50 }}>

                                <View style={{ alignSelf: 'center' }}>
                                    <Image source={require('../../../../assets/Images/reciept.png')}
                                        style={{ height: 95, width: 100 }}
                                    />
                                </View>
                                <TouchableOpacity onPress={openCamera}>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 30, marginBottom: 20 }}>
                                        <Image source={require('../../../../assets/Images/recieptbutton.png')}
                                            style={{ height: 41, width: 155 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 14, fontWeight: '400', color: 'gray', marginTop: 20 }}>or</Text>
                                <TouchableOpacity onPress={openGallery}>
                                    <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 14, fontWeight: '400', color: '#7C56FE', marginTop: 30 }}>Upload Reciept</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>}

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainview: {
        padding: 16
    }


})

export default Reciept