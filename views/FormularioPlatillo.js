import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';

import {
  Container,
  FormControl,
  HStack,
  Text,
  Button,
  NativeBaseProvider,
  Center,
  Box,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
  //state para cantidades
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);

  //cuando el componente carga, calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //Context
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;

  //redireccionar
  const navigation = useNavigation();
  //Calcula el total del platillo por su cantidad

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  //Disminuir en uno
  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  //incrementar en uno la cantidad

  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad);
  };

  //Confirmar si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      'Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };
            guardarPedido(pedido);
            //Navegar hacia el resumen
            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <NativeBaseProvider>
      <Container style={globalStyles.contenedor}>
        <FormControl.Label>
          <Text style={[globalStyles.cantidad, styles.title]}>Cantidad</Text>
        </FormControl.Label>
        <View style={[styles.columnasContainer]}>
          <HStack space={6} paddingLeft="2">
            <Center>
              <Button
                style={{
                  height: 80,
                  justifyContent: 'center',
                  width: 140,
                  backgroundColor: 'black',
                }}
                onPress={() => decrementarUno()}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 10,
                    color: 'white',
                  }}>
                  -
                </Text>
              </Button>
            </Center>
            <Center>
              <TextInput
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                }}
                value={cantidad.toString()}
                onChangeText={cantidad => setCantidad(cantidad)}
                keyboardType="numeric"
                maxLength={2}
              />
            </Center>
            <Center>
              <Button
                style={{
                  height: 80,
                  justifyContent: 'center',
                  width: 140,
                  backgroundColor: 'black',
                }}
                onPress={() => incrementarUno()}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 10,
                    color: 'white',
                  }}>
                  +
                </Text>
              </Button>
            </Center>
          </HStack>
          <Text style={globalStyles.cantidad}>SubTotal: $ {total}</Text>
        </View>

        <View style={styles.footer}>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
          </Button>
        </View>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 23,
    paddingLeft: 40,
  },
  container: {
    backgroundColor: 'red',
  },
  columnasContainer: {
    marginTop: 10,
  },
  footer: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    height: 80,
    width: '125%',
    marginTop: 302,

    // marginTop: 303,
  },
});

export default FormularioPlatillo;
