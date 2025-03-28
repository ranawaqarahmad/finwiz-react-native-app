// CustomBottomTabBar.js

import React from "react";
import {Text, View, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";



const CustomBottomTabBar = ({ state, descriptors, navigation,controlModalVisibility }) => {
    const insets = useSafeAreaInsets();
    const selector = useSelector(state => state.AppReducer);

    const styles = StyleSheet.create({
        tabBar: {
            flexDirection: "row",
            alignItems:'center',
            height:  Platform.OS=='ios'?85:70,
            backgroundColor:'white'
        },
        customBackground: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems:'center'
            
        },
      
        tabItem: {
            flex: 1,
            alignSelf: "center",
            alignItems: "center",
            justifyContent:'center',
            rowGap:5,
            marginBottom:5,
            width:60,
        },
    });

    return (
        <View style={styles.tabBar}>
            <View style={styles.customBackground}>
               
         
                {state.routes.map((route: { key: string | number; name: string; }, index: React.Key | null | undefined) => {
                    const { options } = descriptors[route.key];
                   
                    const isFocused = state.index === index;

                    const imageSize = selector.btmNavVisibility?24:0;

                   

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                

                    return (
                        // {route.name==='Share'(
                        <View style={{width:60,justifyContent:'center',alignItems:'center'}}  key={index}>
                            {route.name === "Plus" && (
                                <TouchableOpacity
                                   
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ["selected"] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={controlModalVisibility}
                                    style={{
                                       flex:1,
                                       alignSelf:'center',justifyContent:'center',marginBottom:16
                                    }}
                                >
                                    {/* Custom Image component */}
                                    {/* Custom Image component */}
                                    <Image
                                        source={require("../assets/Images/plus.png")}
                                        style={{ width: 40, height: 40, borderRadius: 1000 }}
                                    />

                                    {/* Tab label */}
                                </TouchableOpacity>
                            )}
                            {route.name === "Home" && (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ["selected"] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={styles.tabItem}
                                >
                                    {/* Custom Image component */}

                                    {!isFocused && <Image source={require('../assets/Images/home.png')} style={{ width: imageSize, height: imageSize ,opacity:0.3}} />}

                                    {isFocused && <Image source={require('../assets/Images/home.png')} style={{ width: imageSize, height: imageSize }} />}
                                    <Text style={{marginTop:2,fontSize:12,fontWeight:'600',color:isFocused?'black':'#00000030'}}>Home</Text>

                                    {/* <Image
                    source={isFocused ? imageActive : imageInactive}
                    style={{
                      width: imageSize,
                      height: imageSize,
                      marginBottom: 5,
                    }}
                  /> */}
                                    {/* Tab label */}
                                </TouchableOpacity>
                            )}
                            {route.name === "Accounts" && (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ["selected"] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={styles.tabItem}
                                >
                                    {/* Custom Image component */}
                                    {!isFocused && <Image source={require('../assets/Images/accounts.png')} style={{ width: imageSize, height: imageSize ,opacity:0.3}} />}

                                    {isFocused && <Image source={require('../assets/Images/accounts.png')} style={{ width: imageSize, height: imageSize }} />}
                                    {/* Tab label */}
                                    <Text style={{marginTop:2,fontSize:12,fontWeight:'600',color:isFocused?'black':'#00000030'}}>Accounts</Text>

                                </TouchableOpacity>
                            )}
                            {route.name === "More" && (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ["selected"] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={styles.tabItem}
                                >
                                    {/* Custom Image component */}
                                    {!isFocused && <Image source={require('../assets/Images/more.png')} style={{ width: imageSize, height: imageSize,opacity:0.3 }} />}

                                    {isFocused && <Image source={require('../assets/Images/more.png')} style={{ width: imageSize, height: imageSize }} />}
                                    {/* Tab label */}
                                    <Text style={{marginTop:2,fontSize:12,fontWeight:'600',color:isFocused?'black':'#00000030',}}>More</Text>

                                </TouchableOpacity>
                            )}
                            {route.name === "InsightsNav" && (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ["selected"] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={styles.tabItem}
                                >
                                    {/* Custom Image component */}
                                    {!isFocused && <Image source={require('../assets/Images/insights.png')} style={{ width: imageSize, height: imageSize,opacity:0.3 }} />}

                                    {isFocused && <Image source={require('../assets/Images/insights.png')} style={{ width: imageSize, height: imageSize }} />}
                                    {/* Tab label */}
                                    <Text style={{marginTop:2,fontSize:12,fontWeight:'600',color:isFocused?'black':'#00000030',}}>Insights</Text>

                                </TouchableOpacity>
                            )}
                        </View>

                        // )}
                    );
                })}
            </View>
        </View>
    );
};

export default CustomBottomTabBar;
