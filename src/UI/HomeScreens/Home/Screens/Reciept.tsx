import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';


const Reciept = () => {
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const accountId = selector.accountId;

    const navigation = useNavigation()
    const route = useRoute()
    const { recieptDetails, basicDetails } = route.params
    console.log('recieptDetails', recieptDetails);


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
            title: 'Take a Photo',
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
                // Display the taken photo
                console.log(response.assets[0].uri);

                const source = { uri: response.assets[0].uri };
                setImageSource(source);
                addReciept(response.assets[0].uri)
            }
        });
    };

    const addReciept = async (imageUri) => {
        const formData = new FormData();

        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg', // Adjust the type as needed based on your image format
            name: 'image.jpg', // You can specify the name you want for the uploaded file
        });

        // Append the account_id to the form data
        formData.append('account_id', accountId);






        try {
            await fetch(`https://api-finwiz.softsquare.io/api/user/transaction-receipt/${recieptDetails.id}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: formData,

            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);


                })
                .catch((error) => {
                    console.log(error);
                    // setLoader(false)
                });


        }
        catch (error) {
            console.error(error);
            // setLoader(false);
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
                <Text style={{ marginTop: 4 }}>
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
                                <Image resizeMode='cover' source={imageSource} style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 16 }}></Image>
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