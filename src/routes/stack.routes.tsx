import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {CarDetails} from '../screens/CarDetails';
import {Scheduling} from '../screens/Scheduling';
import {SchedulingDetails} from '../screens/SchedulingDetails';
import {Confirmation} from '../screens/Confirmation';
import {CarDTO} from '../dtos/CarDTO';
import {MyCars} from '../screens/MyCars';
import {Splash} from '../screens/Splash';
import {Signin} from '../screens/Signin';
import {SignUpFirstStep} from '../screens/Signup/SignUpFirstStep';
import {SignUpSecondStep} from '../screens/Signup/SignUpSecondStep';

const {Navigator, Screen} = createNativeStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Signin: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {user: {}};
  Home: undefined;
  CarDetails: { car: CarDTO};
  Scheduling: { car: CarDTO};
  SchedulingDetails: { car: CarDTO, dates: string[]};
  Confirmation: { };
  MyCars: undefined;
};

export function StackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='Signin'>
      <Screen name='Signin' component={Signin} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Splash' component={Splash} />
      <Screen name='Home' component={Home} options={{gestureEnabled: false}}/>
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}
