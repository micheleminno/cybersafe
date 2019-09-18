import React from 'react';

import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  CameraRoll,
  ScrollView
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from '../assets/style.json';
import { ViewPhotos } from './ViewPhotos';


export class SendMediaScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    newPhotos: false,
    type: 'back',
    showPhotoGallery: false,
    photoArray: []
  };


  async componentDidMount() {
    let that = this;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    that.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {

    if (this.camera) {

      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {

    CameraRoll.saveToCameraRoll(photo.uri);
    this.setState({ newPhotos: true });
  }

  async getPhotos() {

    CameraRoll.getPhotos({ first: 20, assetType: "Photos", groupTypes: "All" })
     .then(res => {

       let photoArray = res.edges;
       this.setState({ showPhotoGallery: true, photoArray: photoArray })
     })
  }

  render() {

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {

      this.getPhotos();

      return (
        <View style={{ flex: 1 }}>

          <Camera ref={ref => {
            this.camera = ref;
          }} style={{ flex: 8 }} type={this.state.type}>

            { this.state.showPhotoGallery ? (
              <ViewPhotos photoArray={this.state.photoArray} />
              ) : (
                <Text style={styles.content}>Loading photos..</Text>
              )
            }

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>

              <TouchableOpacity
                style={{
                  flex: 0.7,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === 'back'
                        ? 'front'
                        : 'back',
                  });
                }}>
                <Image style={{margin: 10}} source={require('../assets/images/cameraFlipIcon.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePicture}
                style={{
                  flex: 1.2,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Image style={{ width: 70, height: 70, margin: 10 }} source={require('../assets/images/cameraButton.png')} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
