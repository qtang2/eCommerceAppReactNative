/*
 * @Author: qian.tang
 * @Date: 2023-11-15 21:01:11
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-29 22:16:51
 * @FilePath: /myRNProject/src/screens/ShoppingCartScreen/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify/datastore';
import {AuthUser, getCurrentUser} from 'aws-amplify/auth';
import CartProductItem from '../../components/CartProductItem';
// import cartProducts from '../../data/cart';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

import {CartProduct, Product} from '../../models';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [productsDetails, setProductDetails] = useState<Product[]>([]);

  // const getTotalPrice = cartProducts.reduce(
  //   (sumPrice, product) =>
  //     sumPrice + (product?.item?.price || 0) * product.quantity,
  //   0,
  // );

  const fetchProducts = async () => {
    const userData: AuthUser = await getCurrentUser();
    const result = await DataStore.query(CartProduct, c =>
      c.userSub.eq(userData.userId),
    );

    console.log(' result cart ', result);
    const detailsList: Product[] = [];
    // Lazy load related data: You can now asynchronously load related data for hasOne, hasMany, belongsTo, or manyToMany.
    for await (const cartProd of result) {
      const prodDetails = await cartProd.product;
      console.log('prodDetails ==>  ', prodDetails);
      detailsList.push(prodDetails);
    }

    console.log('    detailsList ', detailsList);

    setCartProducts(result);

    setProductDetails(detailsList);
  };

  useEffect(() => {
    console.log(' use effect in  ShoppingCartScreen 111');

    fetchProducts();
  }, []);

  useEffect(() => {
    const sub = DataStore.observeQuery(CartProduct).subscribe(({items}) => {
      fetchProducts()
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);
  

  // const getTotalPrice = 0;
  console.log(' cart Prod ', cartProducts);
  console.log(' cart productsDetails ', productsDetails);
  const getTotalPrice = () => {
    if (cartProducts.length > 0 && productsDetails.length > 0) {
      return cartProducts.reduce(
        (sumPrice, product, curIndex) =>
          sumPrice + (productsDetails[curIndex]?.price || 0) * product.quantity,
        0,
      );
    }
    return 0;
  };

  const navigation = useNavigation();
  const onCheckout = () => {
    console.log(' onPress');
    navigation.navigate('AddressScreen');
  };
  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={cartProducts}
        renderItem={({item, index}) => (
          <CartProductItem
            cartItem={item}
            productDetail={productsDetails[index]}
            fetchProducts={fetchProducts}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cartProducts.length} items):{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${getTotalPrice().toFixed(2)}
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
