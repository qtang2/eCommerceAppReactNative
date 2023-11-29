/*
 * @Author: qian.tang
 * @Date: 2023-11-20 22:04:46
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-21 20:58:05
 * @FilePath: /myRNProject/src/screens/MenuScreen/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {signOut} from 'aws-amplify/auth';
import Button from '../../components/Button';

const MenuScreen = () => {
  const onLogout = () => {
    signOut();
  };
  return (
    <SafeAreaView>
      <Button text="Sign Out" onPress={onLogout} />
    </SafeAreaView>
  );
};

export default MenuScreen;
