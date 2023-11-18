/*
 * @Author: qian.tang
 * @Date: 2023-11-16 23:49:51
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-17 21:52:35
 * @FilePath: /myRNProject/src/routes/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNav from './bottomTabNav';

const Root = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen name="HomeTabs" component={BottomTabNav} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default Router;
