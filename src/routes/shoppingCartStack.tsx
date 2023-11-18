/*
 * @Author: qian.tang
 * @Date: 2023-11-16 23:49:51
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-17 22:03:16
 * @FilePath: /myRNProject/src/routes/shoppingCartStack.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

function ShoppingCartStackNav() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ShoppingCartScreen"
          component={ShoppingCartScreen}
          options={{
            title: 'Shopping Cart',
          }}
        />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
          options={{
            title: 'Address',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default ShoppingCartStackNav;
