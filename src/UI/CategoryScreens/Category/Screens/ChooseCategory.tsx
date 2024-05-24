import { FlatList, View, TouchableOpacity, Text, Image, ActivityIndicator, Modal, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
var page = 0
var subpage = 0
var array = []
var subarray = []
var lastpage;


const ChooseCategory = ({ modleVisibiltyController, category, setCategory, onlyCategory }) => {
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const per_page = 200;
    const [parentId, setParentId] = useState()
    const [isCategory, setIsCategory] = useState(true)
    const [loader, setLoader] = useState(false)

    const [categories, setCategories] = useState()

    useEffect(() => {
        getCategories()
        page = 0
    }, [])

    const getCategories = async () => {

        setLoader(true)
        page++

        console.log('AuthToken is ', authToken);

        fetch(`https://api-finwiz.softsquare.io/api/user/main-categories-with-user-category-id`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('ALL ANSWERS OF QUESTIONS', data.data.data);
                // data.data.data.map((item) => {
                //     array.push(item)
                // })
                setCategories(data.data)
                lastpage = data.data.last_page
                setLoader(false)



            })
            .catch((error) => {
                console.log(error);
                setLoader(false)

                // setLoader(false)
            });



    };

    const getSubCategory = async (id) => {
        setLoader(true)

        subpage++

        console.log('AuthToken is ', authToken);

        fetch(`https://api-finwiz.softsquare.io/api/user/sub-categories/${id}/${per_page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('ALL ANSWERS OF QUESTIONS', data.data.data);

                setCategories(data.data.data)
                setLoader(false)



            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });



    };

    const handlePress = (item) => {
        if (onlyCategory) {
            console.log('THis is the ITEM of choose category',item);
            
            setCategory(item)
            modleVisibiltyController()
            console.log(item);
            
        }

        if (isCategory) {
            setIsCategory(false)
            setParentId(item.id)
            getSubCategory(item.id)
        } else {
            setCategory(item)
            modleVisibiltyController()
        }

    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 16, marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: 'black' }}>{isCategory ? 'Choose Category' : 'Choose Sub-Category'}</Text>
                <TouchableOpacity onPress={modleVisibiltyController} style={{ position: 'absolute', right: 0 }}>
                    <Image style={{ width: 32, height: 32 }} source={require('../../../../assets/Images/crossblack.png')} />
                </TouchableOpacity>
            </View>


            {loader ?
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View>
                :
                <FlatList
                    style={{ marginTop: 32 }}
                    contentContainerStyle={{ paddingBottom: 32 }}
                    data={categories}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => { handlePress(item) }}
                        style={{ marginTop: 8 }}>
                        <Text style={{ fontWeight: '600', color: 'black', marginHorizontal: 16, marginVertical: 8, fontSize: 16 }}>{item.name}</Text>
                        <View style={{ height: 1, backgroundColor: '#00000020', marginHorizontal: 16 }}></View>
                    </TouchableOpacity>}
                />}
        </View>
        </SafeAreaView>
    )
}

export default ChooseCategory