import React from 'react';

import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import styles from '../assets/style.json';


export class ViewPhotos extends React.Component {

  renderPhotos() {

    let photos = this.props.photoArray;
    let images = [];
    for (let { node: photo } of photos) {

      images.push(
        <Image key={photo.image.uri}
          source={photo.image}
          resizeMode="contain"
          style={ styles.image }
        />
      );
    }
    if(images.length == 0) {

      images = <Text style={styles.content}>No photos yet</Text>
    }

    return images;
  }

  render() {

      return (
          <ScrollView horizontal={true}
          maximumZoomScale={3}
          minimumZoomScale={1}
          >
           { this.renderPhotos()}
         </ScrollView>
      );
    }
  }
