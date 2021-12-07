import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';

import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section
} from './styles';
import {BackButton} from '../../components/BackButton';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components/Input';
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useAuth} from '../../hooks/auth';

export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const theme = useTheme();
  const {goBack} = useNavigation();
  const {user} = useAuth();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name='power'
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/3707386?v=4'}}/>
              <PhotoButton onPress={() => {}}>
                <Feather
                  name='camera'
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ?
                <Section style={{ marginBottom: useBottomTabBarHeight()}}>
                  <Input
                    iconName='user'
                    placeholder='Nome'
                    autoCorrect={false}
                    defaultValue={user.name}
                  />
                  <Input
                    iconName='mail'
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName='credit-card'
                    placeholder='CNH'
                    keyboardType='numeric'
                    defaultValue={user.driver_license}
                  />
                </Section>
                :
                <Section>
                  <Input
                    iconName='lock'
                    placeholder='Senha Atual'
                  />
                  <Input
                    iconName='lock'
                    placeholder='Nova senha'
                  />
                  <Input
                    iconName='lock'
                    placeholder='Repetir senha'
                  />
                </Section>
            }

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}