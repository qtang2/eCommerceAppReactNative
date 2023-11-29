/*
 * @Author: qian.tang
 * @Date: 2023-11-12 22:52:27
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-25 21:04:31
 * @FilePath: /myRNProject/src/components/CartProductItem/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {Image, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelect from '../QuantitySelector';
import {useNavigation} from '@react-navigation/native';
import {CartProduct, Product} from '../../models';
import {DataStore} from 'aws-amplify/datastore';

interface ProductItemProps {
  cartItem: CartProduct;
  productDetail: Product;
  fetchProducts: Function;
}
const CartProductItem = ({cartItem, productDetail, fetchProducts}: ProductItemProps) => {
  const [cartProduct, setCartProduct] = useState<CartProduct>();

  useEffect(() => {
    const sub = DataStore.observeQuery(CartProduct, c =>
      c.id.eq(cartItem.id),
    ).subscribe(({items}) => {
      console.log(' items', items);
      const updProd = items[0];
      setCartProduct(updProd);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [cartItem.id]);

  const updateQuantity = async quantity => {
    console.log('Post saved: ', quantity);

    const newProd: CartProduct = CartProduct.copyOf(cartProduct!, draft => {
      draft.quantity = quantity;
    });
    console.log(' upda prod withp newProd', newProd);
    setCartProduct(newProd);
    const savedProd = await DataStore.save(newProd!);
    console.log('Post saved: ', savedProd);

    fetchProducts()
  };

  return (
    cartProduct && (
      <View style={styles.root}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{
              uri: productDetail.image,
            }}
          />

          <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={3}>
              {productDetail.title}
            </Text>
            <View style={styles.ratingsContainer}>
              {new Array(5).fill(0).map((el, i) => (
                <FontAwesome
                  style={styles.star}
                  name={
                    i < Math.floor(productDetail?.avgRating || 0)
                      ? 'star'
                      : 'star-o'
                  }
                  size={18}
                  color={'#e47911'}
                />
              ))}

              <Text>{productDetail.ratings}</Text>
            </View>
            <Text style={styles.price}>
              from ${productDetail.price.toFixed(2)}
              {productDetail.oldPrice && (
                <Text style={styles.oldPrice}>
                  from $ {productDetail.oldPrice.toFixed(2)}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <QuantitySelect
            quantity={cartProduct.quantity}
            setQuantity={updateQuantity}
          />
        </View>
      </View>
    )
  );
};

export default CartProductItem;
