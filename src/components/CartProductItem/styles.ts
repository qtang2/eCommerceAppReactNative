/*
 * @Author: qian.tang
 * @Date: 2023-11-15 21:15:42
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-15 21:25:19
 * @FilePath: /myRNProject/src/components/CartProductItem/styles.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    flex: 2,
    height: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
  quantityContainer: {
    margin: 5,
  },
});

export default styles;