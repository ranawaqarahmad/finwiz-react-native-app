import { Image, View, Text } from 'react-native'
import React from 'react'

const NotificationComp = ({ item }) => {

   const calculateTimeDifference = (time1, time2) => {
        const date1 = new Date(time1);
        const date2 = new Date(time2);

        // Calculate the time difference in milliseconds
        const timeDifference = date2 - date1;

        // Calculate the difference in hours and minutes
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Format the result
        let result = '';
        if (hours > 0) {
            result += `${hours}h `;
        }
        if (minutes > 0) {
            result += `${minutes}m`;
        }

        return result || '0m'; // Return '0m' if no significant time difference
    };

    const endTime = new Date(); 

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, backgroundColor: '#ECECEC', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../../../assets/Images/stack.png')} style={{ width: 16, height: 16 }} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Text style={{ marginEnd: 16, fontSize: 16, fontWeight: 'bold', color: 'black', flex: 1 }}>{item.title}</Text>
                <Text style={{ marginEnd: 16, fontSize: 14, fontWeight: 'normal', color: 'black', flex: 1, }}>{item.message}</Text>
            </View>
            <Text style={{ marginEnd: 0, fontSize: 14, fontWeight: 'normal', color: 'black', }}>{calculateTimeDifference(item.updated_at,endTime)}</Text>

        </View>
    )
}

export default NotificationComp