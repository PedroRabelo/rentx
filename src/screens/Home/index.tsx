import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import Logo from '../../assets/logo.svg';

import {CarList, Container, Header, HeaderContent, TotalCars} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {Car} from '../../components/Car';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/app.stack.routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {api} from '../../services/api';
import {CarDTO} from '../../dtos/CarDTO';
import {LoadingAnimation} from '../../components/LoadingAnimation';
import {useTheme} from 'styled-components';
import {PanGestureHandler, RectButton} from 'react-native-gesture-handler';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
  'Home'>;

export function Home() {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if(isMounted){
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if(isMounted){
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    }
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
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      {loading ? <LoadingAnimation/> :
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

      {/*<PanGestureHandler onGestureEvent={onGestureEvent}>*/}
      {/*  <Animated.View*/}
      {/*    style={[*/}
      {/*      myCarsButtonStyle,*/}
      {/*      {*/}
      {/*        position: 'absolute',*/}
      {/*        bottom: 13,*/}
      {/*        right: 22*/}
      {/*      }*/}
      {/*    ]}*/}
      {/*  >*/}
      {/*    <ButtonAnimated*/}
      {/*      onPress={handleOpenMyCars}*/}
      {/*      style={[styles.button, {backgroundColor: theme.colors.main}]}*/}
      {/*    >*/}
      {/*      <Ionicons*/}
      {/*        name='ios-car-sport'*/}
      {/*        size={32}*/}
      {/*        color={theme.colors.shape}*/}
      {/*      />*/}
      {/*    </ButtonAnimated>*/}
      {/*  </Animated.View>*/}
      {/*</PanGestureHandler>*/}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
