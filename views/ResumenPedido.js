import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Alert, Image, SafeAreaView} from 'react-native';

import {
  NativeBaseProvider,
  Text,
  Container,
  FlatList,
  Button,
} from 'native-base';

import firebase from '../firebase';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';
import ProgresoPedido from './ProgresoPedido';

const ResumenPedido = () => {
  const navigation = useNavigation();
  const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} =
    useContext(PedidoContext);

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );
    mostrarResumen(nuevoTotal);
  };

  const DATA = pedido.map(platillo => {
    const {imagen, nombre, precio, id, cantidad} = platillo;

    return {nombre, cantidad, id, imagen, precio};
  });

  //redireccionar

  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no puede ser modificado',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            //crear un objeto
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, //array
              creado: Date.now(),
            };

            try {
              const pedido = await firebase.db
                .collection('ordenes')
                .add(pedidoObj);
              pedidoRealizado(pedido.id);

              //Redireccionar a progreso de pedido
              navigation.navigate('ProgresoPedido');
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Revisar',
          style: 'cancel',
        },
      ],
    );
  };

  //Eliminar un producto del arreglo de pedido

  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Deseas eliminar este producto',
      'Una vez eliminado tienes que volver a realizar el pedido',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Eliminar del state
            eliminarProducto(id);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const renderItem = ({item}) => (
    <View>
      <View style={globalStyles.list}>
        <Image source={{uri: item.imagen}} style={globalStyles.image} />
        <View>
          <Text>{item.nombre}</Text>
          <Text>Cantidad: {item.cantidad}</Text>
          <Text>Precio: $ {item.precio}</Text>
          <Button
            onPress={() => confirmarEliminacion(item.id)}
            style={{marginTop: 20, backgroundColor: '#F53734', width: '100%'}}>
            <Text
              style={{
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              Eliminar
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <NativeBaseProvider>
      <Text style={globalStyles.cantidad}>Resumen Pedido</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View>
        <Text style={globalStyles.cantidad}>Total a Pagar: ${total} </Text>
        <Button
          onPress={() => navigation.navigate('Menu')}
          style={globalStyles.botonPedir}>
          <Text style={globalStyles.textoBoton}>Seguir Pidiendo</Text>
        </Button>
      </View>
      <View style={{marginTop: 30}}>
        <Button onPress={() => progresoPedido()} style={globalStyles.boton}>
          <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    height: 80,
    width: '125%',
    marginTop: 302,
  },
});

export default ResumenPedido;
