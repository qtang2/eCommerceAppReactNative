/*
 * @Author: qian.tang
 * @Date: 2023-11-14 21:21:31
 * @LastEditors: Qian Tang qian@itrazotracetech.com
 * @LastEditTime: 2023-11-14 22:07:12
 * @FilePath: /myRNProject/src/components/ImageCarousel/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

function ImageCarousel({images}: {images: string[]}) {
  const windowWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState(0);

  // useCallback to store the function in memory
  const onFlatlistUpdate = useCallback(({viewableItems}) => {
    console.log(viewableItems);
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0]['index'] || 0);
    }
  }, []); // dependency means when the function should be recreated

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment="center"
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
        // viewabilityConfig={{
        //   viewAreaCoveragePercentThreshold: 50,
        // }}
        // onViewableItemsChanged={onFlatlistUpdate}
      />
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            style={[
              styles.dot,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
});

export default ImageCarousel;
