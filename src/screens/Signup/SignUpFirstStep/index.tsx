import React, {useState} from 'react';

import {Container, Form, FormTitle, Header, Steps, SubTitle, Title} from './styles';
import {BackButton} from '../../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Bullet} from '../../../components/Bullet';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/app.stack.routes';
import * as Yup from 'yup';

type SignUpFirstStepScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
  'SignUpFirstStep'>;

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicence, setDriverLicence] = useState('');

  const { navigate } = useNavigation<SignUpFirstStepScreenNavigationProp>();
  const {goBack} = useNavigation();

  function handleBack() {
    goBack();
  }

  async function handleNextStep() {
    try{
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        driverLicence: Yup.string().required('CNH é obrigatória')
      });

      const data = { name, email, driverLicence};
      await schema.validate(data);

      navigate('SignUpSecondStep', { user: data });
    }catch (error){
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Deu erro', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicence}
              value={driverLicence}
            />
          </Form>
          <Button
            title='Próximo'
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}