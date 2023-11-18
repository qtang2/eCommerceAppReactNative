/*
 * @Author: qian.tang
 * @Date: 2023-11-12 22:52:27
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-17 22:07:54
 * @FilePath: /myRNProject/src/components/CartProductItem/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {Image, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelect from '../QuantitySelector';
import { useNavigation } from '@react-navigation/native';

interface ProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}
const CartProductItem = ({cartItem}: ProductItemProps) => {
  const {item} = cartItem;
  const [quantity, setQuantity] = useState<number>(1);
  
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />

        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.ratingsContainer}>
            {new Array(5).fill(0).map((el, i) => (
              <FontAwesome
                style={styles.star}
                name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}

            <Text>{item.ratings}</Text>
          </View>
          <Text style={styles.price}>
            {item.oldPrice && <Text style={styles.oldPrice}>from $ 12</Text>}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
      </View>
    </View>
  );
};

export default CartProductItem;
