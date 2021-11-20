import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {CarDetails} from '../screens/CarDetails';
import {Scheduling} from '../screens/Scheduling';
import {SchedulingDetails} from '../screens/SchedulingDetails';
import {SchedulingComplete} from '../screens/SchedulingComplete';
import {CarDTO} from '../dtos/CarDTO';
import {MyCars} from '../screens/MyCars';

const {Navigator, Screen} = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO};
  Scheduling: { car: CarDTO};
  SchedulingDetails: { car: CarDTO, dates: string[]};
  SchedulingComplete: undefined;
  MyCars: undefined;
};

export function StackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='SchedulingComplete' component={SchedulingComplete} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}
