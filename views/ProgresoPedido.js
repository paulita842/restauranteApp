import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Container, Text, NativeBaseProvider, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  const {idpedido} = useContext(PedidoContext);

  const navigation = useNavigation();

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function (doc) {
          setTiempo(doc.data().tiempoEntrega);
          setCompletado(doc.data().completado);
        });
    };
    obtenerProducto();
  }, []);

  //muestra el countdown en pantalla

  const renderer = ({minutes, seconds}) => {
    return (
      <>
        <View>
          <Text fontSize="6xl" textAlign="center">
            {minutes}: {seconds}
          </Text>
        </View>
      </>
    );
  };
  return (
    <NativeBaseProvider>
      <View flex={1} justifyContent="center" alignItems="center">
        {tiempo === 0 && (
          <>
            <Text textAlign="center" fontSize="lg">
              Hemos Recibido tu orden...
            </Text>
            <Text textAlign="center" fontSize="lg">
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text textAlign="center" marginBottom={4} fontSize="lg">
              Su Orden estará lista en:
            </Text>
            <Text>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}
        {completado && (
          <>
            <View>
              <Text
                textAlign="center"
                marginBottom={3}
                fontSize="4xl"
                textTransform="uppercase">
                Orden Lista
              </Text>
              <Text textAlign="center" marginBottom={3} fontSize="lg">
                Por favor, pase a recoger su pedido
              </Text>
              <Button
                onPress={() => navigation.navigate('NuevaOrden')}
                style={[
                  globalStyles.boton,
                  {marginTop: 100, borderRadius: 20},
                ]}>
                <Text style={globalStyles.botonTexto}>
                  Comenzar una nueva orden
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default ProgresoPedido;
