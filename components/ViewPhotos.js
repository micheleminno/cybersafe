import React from 'react';

import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import styles from '../assets/style.json';
import { SelectedPhoto } from './SelectedPhoto';


export class ViewPhotos extends React.Component {

  state = {
      showSelectedPhoto: false,
      uri: ''
  }

  renderPhotos() {

    let photos = this.props.photoArray;
    let images = [];
    for (let { node: photo } of photos) {

      let { uri } = photo.image;
      images.push(
        <TouchableHighlight key={uri}
        onPress={() => this.setState({ showSelectedPhoto: true, uri: uri })}>
          <Image
            source={photo.image}
            resizeMode="contain"
            style={ styles.image }
          />
        </TouchableHighlight>
      );
    }
    if(images.length == 0) {

      images = <Text style={styles.content}>No photos yet</Text>
    }

    return images;
  }

  render() {

    const { showSelectedPhoto, uri } = this.state;

    if (showSelectedPhoto) {
      return (
        <SelectedPhoto
          uri={uri} />
      )
    }

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
