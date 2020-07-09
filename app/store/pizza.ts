import {observable, action, computed} from 'mobx';
import {rand} from '../utils';

const PIZZA_LIST: IPizzaItem[] = [
  {
    name: 'Pizza 1',
    price: 1,
    image_l: require('../assets/1_l.png'),
    image_r: require('../assets/1_r.png'),
  },
  {
    name: 'Pizza 2',
    price: 2,
    image_l: require('../assets/2_l.png'),
    image_r: require('../assets/2_r.png'),
  },
  {
    name: 'Pizza 3',
    price: 3,
    image_l: require('../assets/3_l.png'),
    image_r: require('../assets/3_r.png'),
  },
  {
    name: 'Pizza 4',
    price: 4,
    image_l: require('../assets/4_l.png'),
    image_r: require('../assets/4_r.png'),
  },
  {
    name: 'Pizza 5',
    price: 5,
    image_l: require('../assets/5_l.png'),
    image_r: require('../assets/5_r.png'),
  },
  {
    name: 'Pizza 6',
    price: 6,
    image_l: require('../assets/6_l.png'),
    image_r: require('../assets/6_r.png'),
  },
];

export interface IPizzaItem {
  name: string;
  price: number;
  image_l: any;
  image_r: any;
}

export interface IPizzaStore {
  readonly list: IPizzaItem[];
  readonly fA: number;
  readonly sA: number;
  readonly price: number;
  initialize(): void;
  changeActiveF(index: number): void;
  changeActiveS(index: number): void;
  rand(): void;
}

class PizzaStore implements IPizzaStore {
  @observable private _list: IPizzaItem[] = [];
  @observable public fA = 0;
  @observable public sA = 0;

  @action.bound
  public async initialize() {
    try {
      this._list = PIZZA_LIST;
    } catch (e) {
      console.log('initialize error');
    }
  }

  @computed
  public get list() {
    return this._list;
  }

  @action.bound
  public changeActiveF(index: number) {
    if (this.fA !== index) {
      this.fA = index;
    }
  }

  @action.bound
  public changeActiveS(index: number) {
    if (this.sA !== index) {
      this.sA = index;
    }
  }

  @action.bound
  public rand() {
    const l = this._list.length;
    const fA = rand(0, l - 1);
    const sA = rand(0, l - 1);
    this.fA = fA === this.fA ? (fA + 1) % l : fA;
    this.sA = sA === this.sA ? (sA - 1) % l : sA;
  }

  @computed
  public get price() {
    const f = this._list.find((el, index) => index === this.fA);
    const s = this._list.find((el, index) => index === this.sA);
    if (!!f && !!s) {
      return f.price + s.price;
    }
    return 0;
  }
}

export const pizzaStore = new PizzaStore();
