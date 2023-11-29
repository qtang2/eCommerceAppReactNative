/*
 * @Author: qian.tang
 * @Date: 2023-11-12 22:52:27
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-22 21:00:40
 * @FilePath: /myRNProject/src/components/ProductItem/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { Product } from '../../models';

interface ProductItemProps {
  item: Product;
}
const ProductItem = (props: ProductItemProps) => {
  const {item} = props;
  const navigation = useNavigation();
  const onPress = () => {
    console.log(' onPress', item.id);
    navigation.navigate('ProductDetails', {id: item.id});
  };
  return (
    <Pressable style={styles.root} onPress={onPress}>
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
    </Pressable>
  );
};

export default ProductItem;
