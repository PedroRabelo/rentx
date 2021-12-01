import React, {useEffect, useState} from 'react';

import {
  AppointmentQuantity,
  Appointments,
  AppointmentTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  Subtitle,
  Title
} from './styles';
import {AntDesign} from '@expo/vector-icons'
import {CarDTO} from '../../dtos/CarDTO';
import {api} from '../../services/api';
import {FlatList, StatusBar} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components';
import {Car} from '../../components/Car';
import {LoadingAnimation} from '../../components/LoadingAnimation';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const {goBack} = useNavigation();
  const theme = useTheme();

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
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
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel {'\n'}
        </Title>
        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      {
        loading
          ? <LoadingAnimation/> :
          <Content>
            <Appointments>
              <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
              <AppointmentQuantity>{cars.length}</AppointmentQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <CarWrapper>
                  <Car data={item.car}/>
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{marginHorizontal: 10}}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
      }

    </Container>
  );
}
