import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScreenStackParamList} from 'app/App';

type Props = StackScreenProps<ScreenStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const onPress = () => navigation.navigate('Pizza');

  return (
    <View style={SS.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Pizza" onPress={onPress} />
    </View>
  );
};

const SS = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
