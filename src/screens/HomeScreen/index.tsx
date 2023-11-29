/*
 * @Author: qian.tang
 * @Date: 2023-11-12 22:12:00
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-21 22:07:25
 * @FilePath: /myRNProject/src/screens/HomeScreen/index.tsx
 * @Description: home screen
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify/datastore';
import ProductItem from '../../components/ProductItem';
import {Product} from '../../models';

// import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  console.log('home screeen search: ', searchValue);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await DataStore.query(Product);
    //   console.log('result==> ', result);
    //   setProducts(result);
    // };
    // fetchData();
    DataStore.query(Product).then(setProducts);
  }, []);

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
