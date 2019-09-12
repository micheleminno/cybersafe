import React from 'react';
import { Button, Image, View, Text, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class InfoScreen extends React.Component {
  render() {

    const styles = require('../assets/style.json');

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ flex: 1, fontSize: 20, marginTop: 30, color: 'red' }}>Info sui developers</Text>
        <FlatList
          data={[{ key: 'Giulia Quaranta' }, { key: 'Eva Francesca Aglianò' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <Text style={{ flex: 1, fontSize: 20 }}>Chi siamo?</Text>
        <Text style={{ flex: 1, marginBottom: 20 }}>
          Siamo ragazze del liceo scientifico Antonio Labriola, classe 3E.
        </Text>

        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Torna indietro"
        />
      </View>
    );
  }
}
