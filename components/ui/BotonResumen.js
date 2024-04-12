import React, {useContext} from 'react';

import {Button, Text, NativeBaseProvider} from 'native-base';

import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';

import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {
  const navigation = useNavigation();

  //Leer objeto de pedido

  const {pedido} = useContext(PedidoContext);

  if (pedido.length === 0) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <Button
        style={globalStyles.boton}
        onPress={() => navigation.navigate('ResumenPedido')}>
        <Text style={globalStyles.botonTexto}> ir a Pedido</Text>
      </Button>
    </NativeBaseProvider>
  );
};

export default BotonResumen;
