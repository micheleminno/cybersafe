import React from 'react';

import {
  Image,
  View,
  StyleSheet
} from 'react-native';


import styles from '../assets/style.json';


export class SelectedPhoto extends React.Component {

  render() {

    const { uri } = this.props;
    return (
      <View style = {{ flex: 3, justifyContent: 'center',
    alignItems: 'center'}}>
        <Image
          source={{uri: uri}}
          style={styles.bigImage}/>
      </View>
    );
  }
}
