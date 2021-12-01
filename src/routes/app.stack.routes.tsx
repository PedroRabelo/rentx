import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {CarDetails} from '../screens/CarDetails';
import {Scheduling} from '../screens/Scheduling';
import {SchedulingDetails} from '../screens/SchedulingDetails';
import {CarDTO} from '../dtos/CarDTO';

const {Navigator, Screen} = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO};
  Scheduling: { car: CarDTO};
  SchedulingDetails: { car: CarDTO, dates: string[]};
};

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
      <Screen name='Home' component={Home}/>
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
    </Navigator>
  )
}
