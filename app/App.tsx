import * as React from 'react';
import 'mobx-react-lite/batchingForReactNative';
import {Provider} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from './screen/Home/Home';
import {PizzaScreen} from './screen/Pizza/Pizza';

import {pizzaStore} from './store/pizza';

const storeList = {
  pizzaStore,
};

const Stack = createStackNavigator();

export type ScreenStackParamList = {
  Home: undefined;
  Pizza: undefined;
};

function App() {
  return (
    <Provider {...storeList}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pizza" component={PizzaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
