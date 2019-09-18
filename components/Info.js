import React from 'react';
import { Button, Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class InfoScreen extends React.Component {
  render() {

    const styles = require('../assets/style.json');

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ flex: 0.5, fontSize: 20, marginTop: 50, color: 'red' }}>Info sui developers</Text>
        <FlatList
          data={[{ key: 'Giulia Quaranta' }, { key: 'Eva Francesca Aglianò' }]}
          renderItem={({ item }) => <Text>{'\u2022 '}{item.key}</Text>}
        />
        <Text style={{ flex: 0.3, fontSize: 20 }}>Chi siamo?</Text>
        <Text style={{ flex: 1, margin: 20 }}>
          Siamo due ragazze del liceo scientifico Antonio Labriola di Ostia (Roma), classe 3E.
        </Text>

        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Torna indietro"
        />
      </View>
    );
  }
}
