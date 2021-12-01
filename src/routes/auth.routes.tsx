import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Confirmation} from '../screens/Confirmation';
import {Splash} from '../screens/Splash';
import {Signin} from '../screens/Signin';
import {SignUpFirstStep} from '../screens/Signup/SignUpFirstStep';
import {SignUpSecondStep} from '../screens/Signup/SignUpSecondStep';

const {Navigator, Screen} = createNativeStackNavigator();

export type RootAuthParamList = {
  Splash: undefined;
  Signin: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {user: {}};
  Confirmation: { };
};

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName='Splash'>
      <Screen name='Splash' component={Splash} />
      <Screen name='Signin' component={Signin} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </Navigator>
  )
}
