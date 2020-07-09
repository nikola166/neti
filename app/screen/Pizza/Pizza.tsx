import * as React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {observer, inject} from 'mobx-react';
import {IPizzaStore} from '../../store/pizza';
import {ScreenStackParamList} from '../../App';
import PizzaList from '../../shared/Pizza/PizzaList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {pluralize} from '../../utils';

type Props = StackScreenProps<ScreenStackParamList, 'Pizza'> & {
  pizzaStore: IPizzaStore;
};

@inject('pizzaStore')
@observer
export class PizzaScreen extends React.Component<Props> {
  public componentDidMount() {
    this.props.pizzaStore.initialize();
  }

  public render() {
    const {list: pizzaList} = this.props.pizzaStore;
    const pizzaStore = this.props.pizzaStore;
    const Price = this._renderPrice;

    return (
      <View style={SS.container}>
        <Button onPress={pizzaStore.rand} title={'Rand'} />
        <View style={SS.row}>
          <View style={SS.col}>
            <PizzaList
              items={pizzaList}
              direction={'left'}
              onSnapToItem={pizzaStore.changeActiveF}
              activeIndex={pizzaStore.fA}
            />
          </View>
          <View style={SS.col}>
            <PizzaList
              items={pizzaList}
              direction={'right'}
              onSnapToItem={pizzaStore.changeActiveS}
              activeIndex={pizzaStore.sA}
            />
          </View>
        </View>
        <Price />
        <SafeAreaView />
      </View>
    );
  }

  private _renderPrice = observer(() => {
    return (
      <Text>
        Цена:{' '}
        {pluralize(this.props.pizzaStore.price, {
          one: 'Рубль',
          lt5: 'Рубля',
          gt5: 'Рублей',
        })}
      </Text>
    );
  });
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
});
