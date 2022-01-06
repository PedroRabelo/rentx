import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

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
import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useAuth} from '../../hooks/auth';
import {Button} from '../../components/Button';

export function Profile() {
  const {user, signOut, updateUser} = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const {goBack} = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try{
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório')
      });

      const data = {name, driverLicense};
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado');
    }catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }
      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  async function handleSignOut(){
    Alert.alert(
      'Tem certeza?',
      'Deseja realmente sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ]
    );
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
              { !!avatar && <Photo source={{uri: avatar}}/> }
              <PhotoButton onPress={handleAvatarSelect}>
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
                    onChangeText={setName}
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
                    onChangeText={setDriverLicense}
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
            <Button title='Salvar alterações' onPress={handleProfileUpdate}/>

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}