/*
 * @Author: qian.tang
 * @Date: 2023-11-16 23:49:51
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-17 22:03:47
 * @FilePath: /myRNProject/src/routes/bottomTabNav.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import HomeStackNav from './homeStack';
import ShoppingCartStackNav from './shoppingCartStack';

const Tab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor: '#ffbd7d',
          tabBarActiveTintColor: '#e47911',
        }}>
        <Tab.Screen
          name="home"
          component={HomeStackNav}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="home" size={19} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="user" size={19} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={ShoppingCartStackNav}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="shopping-cart" size={19} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="more"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Entypo name="menu" size={19} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} /> */}
      </Tab.Navigator>
    </>
  );
}

export default BottomTabNav;
