/*
 * @Author: qian.tang
 * @Date: 2023-11-11 22:48:00
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-20 21:54:35
 * @FilePath: /myRNProject/App.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/routes';

import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
Amplify.configure(amplifyconfig);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <HomeScreen />÷ */}
      {/* <ProductScreen /> */}
      {/* <ShoppingCartScreen /> */}
      {/* <AddressScreen /> */}
      <Router />
    </SafeAreaView>
  );
}

export default withAuthenticator(App);
