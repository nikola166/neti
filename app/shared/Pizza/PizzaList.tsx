import React, {Component, RefObject} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
  Image,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IPizzaItem} from '../../store/pizza';
import {SCREEN_HEIGHT, SCREEN_WIDTH, pluralize} from '../../utils';

export interface Props {
  items: IPizzaItem[];
  direction: 'left' | 'right';
  activeIndex: number;
  onSnapToItem(index: number): void;
}

const containerHeight = SCREEN_HEIGHT - 100;

export default class PizzaList extends Component<Props> {
  private _ref: RefObject<Carousel>;

  constructor(props: Props) {
    super(props);
    this._ref = React.createRef();
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    if (
      this.props.activeIndex !== prevProps.activeIndex &&
      this._ref &&
      this._ref.current
    ) {
      this._ref.current.snapToItem(this.props.activeIndex, true);
    }
  }

  render() {
    const {items, direction, onSnapToItem} = this.props;
    return (
      <View style={[SS.container, direction === 'left' ? SS.left : SS.right]}>
        <Carousel
          ref={this._ref}
          data={items}
          renderItem={this._renderItem}
          sliderHeight={containerHeight}
          shouldOptimizeUpdates={false}
          itemHeight={containerHeight / 3}
          inactiveSlideScale={0.5}
          inactiveSlideOpacity={0.6}
          vertical={true}
          activeAnimationType={'decay'}
          onSnapToItem={onSnapToItem}
        />
        <SafeAreaView />
      </View>
    );
  }

  private _renderItem = (item: ListRenderItemInfo<IPizzaItem>) => {
    const el = item.item;
    const {direction} = this.props;

    return (
      <View
        style={[SS.item, direction === 'right' ? SS.itemRight : SS.itemLeft]}>
        <View
          style={
            direction === 'right'
              ? SS.itemDescriptionRight
              : SS.itemDescriptionLeft
          }>
          <Text>{el.name}</Text>
          <Text>
            {pluralize(el.price, {
              one: 'Рубль',
              lt5: 'Рубля',
              gt5: 'Рублей',
            })}
          </Text>
        </View>
        <Image
          source={direction === 'left' ? el.image_l : el.image_r}
          resizeMode={'cover'}
          style={[SS.imageItem]}
        />
      </View>
    );
  };

  private _keyExtractor = (el: IPizzaItem, index: number) => {
    return el.name + '_' + index;
  };
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-end',
  },
  right: {
    alignItems: 'flex-start',
  },
  item: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'flex-end',
  },
  itemLeft: {
    alignItems: 'flex-end',
  },
  itemRight: {
    alignItems: 'flex-start',
  },
  imageItem: {
    width: SCREEN_WIDTH / 3,
    height: containerHeight / 3,
  },
  itemDescriptionLeft: {
    position: 'absolute',
    left: 20,
    top: -50,
  },
  itemDescriptionRight: {
    position: 'absolute',
    right: 20,
    top: -50,
  },
});
