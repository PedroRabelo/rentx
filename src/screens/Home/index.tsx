import React, {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {Car} from '../../components/Car';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/stack.routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {api} from '../../services/api';
import {CarDTO} from '../../dtos/CarDTO';
import {Load} from '../../components/Load';
import {useTheme} from 'styled-components';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
  'Home'>;

export function Home() {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars(car: CarDTO) {
    navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading ? <Load/> :
        <CarList
          // @ts-ignore
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          // @ts-ignore
          renderItem={({item}) =>
            <Car data={item} onPress={() => handleCarDetails(item)}/>
          }
        />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name='ios-car-sport'
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}
