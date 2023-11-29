/*
 * @Author: qian.tang
 * @Date: 2023-11-13 21:16:55
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-24 21:08:21
 * @FilePath: /myRNProject/src/screens/ProductScreen/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify/datastore';
import styles from './styles';
// import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import QuantitySelect from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CartProduct, Product} from '../../models';
import {AuthUser, getCurrentUser} from 'aws-amplify/auth';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const route = useRoute();
  console.log(route.params);

  const navigation = useNavigation();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    console.log(' id from route ', route.params);
    DataStore.query(Product, route.params?.id).then(setProduct);
  }, [route.params?.id]);
  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    console.log('onAddToCart');
    const userData: AuthUser = await getCurrentUser();
    console.log('useData', userData, userData.signInDetails);
    if (!product || !userData) {
      return;
    }
    const newCartProd = new CartProduct({
      userSub: userData.userId,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProd);
    navigation.navigate('cart');
  };

  return (
    product && (
      <ScrollView style={styles.root}>
        <Text style={styles.title}>{product.title}</Text>

        {/* Image carousel */}
        <ImageCarousel images={product.images} />

        {/* Option selector */}
        <Picker
          selectedValue={selectedOption}
          onValueChange={itemValue => setSelectedOption(itemValue)}>
          {product?.options?.map(option => (
            <Picker.Item label={option} value={option} />
          ))}
        </Picker>

        {/* Price */}
        <Text style={styles.price}>
          from ${product.price.toFixed(2)}
          {product.oldPrice && (
            <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
          )}
        </Text>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Qunatiti selector */}
        <QuantitySelect quantity={quantity} setQuantity={setQuantity} />

        {/* Button */}
        <Button
          text={'Add To Cart'}
          onPress={onAddToCart}
          containerStyles={{backgroundColor: '#e3c905'}}
        />
        <Button
          text={'Buy Now'}
          onPress={() => {
            console.warn('Buy now');
          }}
        />
      </ScrollView>
    )
  );
};

export default ProductScreen;
