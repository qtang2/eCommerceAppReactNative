/*
 * @Author: qian.tang
 * @Date: 2023-11-15 21:48:32
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-29 22:05:37
 * @FilePath: /myRNProject/src/screens/AddressScreen/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import countryList from 'country-list';
import styles from './styles';
import Button from '../../components/Button';
import {DataStore} from 'aws-amplify/datastore';
import {CartProduct, Order, OrderProduct} from '../../models';
import {getCurrentUser} from 'aws-amplify/auth';
import {useNavigation} from '@react-navigation/native';

const countries = countryList.getData();

function AddressScreen() {
  // console.log(countries);
  const navigation = useNavigation();
  const [country, setCountry] = useState<string>(countries[0].code);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [city, setCity] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const onCheckout = async () => {
    if (!!addressError) {
      Alert.alert('Fix error before submit');
      return;
    }
    if (!fullname) {
      Alert.alert('Please input full name');
      return;
    }
    try {
      const userData = await getCurrentUser();

      //  create new Order
      const newOrder = await DataStore.save(
        new Order({
          userSub: userData.userId,
          fullName: fullname,
          phoneNumber: phone,
          country,
          city,
          address,
        }),
      );
      //  fetch all cart items belongs to user
      const cartItems = await DataStore.query(CartProduct, c =>
        c.userSub.eq(userData.userId),
      );

      // attach all cart product to an order/ create new ProductOrder
      const promList = cartItems.map(item =>
        DataStore.save(
          new OrderProduct({
            quantity: item['quantity'],
            option: item['option'],

            productID: item['productID'],

            orderID: newOrder.id,
          }),
        ),
      );

      await Promise.all(promList);

      // delete cartProduct
      const delPromList = cartItems.map(item => DataStore.delete(item));
      await Promise.all(delPromList);
      // navigate to home
      navigation.navigate('home');
    } catch (error) {
      console.log('error in save order', error);
    }
  };
  const validateAddress = () => {
    if (address.length < 3) {
      //   Alert.alert('Address is too short');
      setAddressError('Address is too short');
    }
    if (address.length > 10) {
      //   Alert.alert('Address is too long');
      setAddressError('Address is too long');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView style={styles.root}>
        <View style={styles.row}>
          <Picker onValueChange={setCountry} selectedValue={country}>
            {countries.map(country => (
              <Picker.Item label={country.name} value={country.code} />
            ))}
          </Picker>
        </View>
        {/* Full name */}
        <View style={styles.row}>
          <Text style={styles.label}>Full name (First and Last name)</Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        {/* Phone number */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType={'phone-pad'}
          />
        </View>

        {/* Address */}
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onEndEditing={validateAddress}
            //   onEndEditing={validateAddress}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
          />
          {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
          )}
        </View>

        {/* City */}
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>

        <Button text="Checkout" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddressScreen;
