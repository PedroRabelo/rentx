import React, {useState} from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard, Alert
} from 'react-native';
import * as Yup from 'yup';
import {
  Container,
  Header,
  Title,
  Form,
  SubTitle,
  Footer
} from './styles';
import {Button} from '../../components/Button';
import {useTheme} from 'styled-components';
import {Input} from '../../components/Input';
import {PasswordInput} from '../../components/PasswordInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/stack.routes';
import {useNavigation} from '@react-navigation/native';

type SigninScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
  'Signin'>;

export function Signin() {
  const { navigate } = useNavigation<SigninScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  async function handleSignin() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória')
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError){
        Alert.alert('Atenção', error.message);
      }else{
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais');
      }
    }
  }

  function handleNewAccount() {
    navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            translucent
            backgroundColor='transparent'
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignin}
              enabled={true}
              loading={false}
            />
            <Button
              title='Criar conta'
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}