/*
 * @Author: qian.tang
 * @Date: 2023-11-15 21:01:11
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-17 22:08:26
 * @FilePath: /myRNProject/src/screens/ShoppingCartScreen/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CartProductItem from '../../components/CartProductItem';
import products from '../../data/cart';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const ShoppingCartScreen = () => {
  const totalPrice = products.reduce(
    (sumPrice, product) =>
      sumPrice + (product?.item?.price || 0) * product.quantity,
    0,
  );

  const navigation = useNavigation();
  const onCheckout = () => {
    console.log(' onPress');
    navigation.navigate('AddressScreen');
  };
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({products.length} items):{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
