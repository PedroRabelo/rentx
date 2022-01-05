import React, {useState} from 'react';

import {Container, Form, FormTitle, Header, Steps, SubTitle, Title} from './styles';
import {BackButton} from '../../../components/BackButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {Bullet} from '../../../components/Bullet';
import {Button} from '../../../components/Button';
import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {PasswordInput} from '../../../components/PasswordInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {api} from '../../../services/api';
import {RootAuthParamList} from '../../../routes/auth.routes';

type SignUpSecondStepScreenNavigationProp = NativeStackNavigationProp<RootAuthParamList,
  'SignUpSecondStep'>;

interface Params {
  user: {
    name: string;
    email: string;
    driverLicence: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {goBack} = useNavigation();
  const {navigate} = useNavigation<SignUpSecondStepScreenNavigationProp>();
  const route = useRoute();
  const theme = useTheme();

  const {user} = route.params as Params;

  function handleBack() {
    goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm)
      return Alert.alert('Informe a senha e a confirmação');

    if(password !== passwordConfirm)
      return Alert.alert('As senhas não são iguais');

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicence,
      password,
    }).then(() => {
      navigate('Confirmation', {
        nextScreenRoute: 'Signin',
        title: 'Conta Criada!',
        message: `Agora é só fazer o login\ne aproveitar`
      });
    }).catch((error) => {
      console.log(error);
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet />
              <Bullet active/>
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}