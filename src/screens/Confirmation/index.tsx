import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {Container, Content, Footer, Message, Title} from './styles';
import {ConfirmButton} from '../../components/ConfirmButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootAuthParamList} from '../../routes/auth.routes';

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<RootAuthParamList,
  'Confirmation'>;

interface Params {
  title: string;
  message: string;
  nextScreenRoute: keyof RootAuthParamList;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const {navigate} = useNavigation<ConfirmationScreenNavigationProp>();
  const route = useRoute();
  const {title, message, nextScreenRoute} = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width}/>
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm}/>
      </Footer>
    </Container>
  );
}
