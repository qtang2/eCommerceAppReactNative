/*
 * @Author: qian.tang
 * @Date: 2023-11-12 22:12:00
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-18 20:08:47
 * @FilePath: /myRNProject/src/screens/HomeScreen/index.tsx
 * @Description: home screen
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import ProductItem from '../../components/ProductItem';
import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  console.log('home screeen search: ', searchValue)
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
