/*
 * @Author: qian.tang
 * @Date: 2023-11-18 20:48:21
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-18 20:49:21
 * @FilePath: /myRNProject/src/routes/homeStack.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const {searchValue, setSearchValue} = props;
  return (
    <SafeAreaView style={{backgroundColor: '#22e3dd'}}>
      <View
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Feather name="search" size={20} />
        <TextInput
          style={{height: 40, marginLeft: 10}}
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

function HomeStackNav() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: () => (
            <HeaderComponent
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          ),
        }}>
        <Stack.Screen
          name="homeScreen"
          options={{
            title: 'Home',
          }}>
          {() => <HomeScreen searchValue={searchValue} />}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductScreen}
          // options={{
          //   StackBarIcon: ({color}) => (
          //     <Entypo name="user" size={19} color={color} />
          //   ),
          // }}
        />
      </Stack.Navigator>
    </>
  );
}

export default HomeStackNav;
