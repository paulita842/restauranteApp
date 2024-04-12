import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Text,
  NativeBaseProvider,
  Card,
  View,
  Image,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {
  //Pedido context
  const {platillo} = useContext(PedidoContext);
  const {nombre, imagen, descripcion, precio} = platillo;

  //redireccionar
  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Container style={globalStyles.contenedor}>
        <View style={[globalStyles.contenido, styles.title]}>
          <Text style={[globalStyles.titulo, styles.titleDescription]}>
            {nombre}
          </Text>
          <Card style={styles.card}>
            <View>
              <Image source={{uri: imagen}} style={globalStyles.imagen} />
              <Text style={{marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: ${precio}</Text>
            </View>
          </Card>
        </View>
        <View style={styles.footer}>
          <Button
            style={globalStyles.boton}
            onPress={() => navigation.navigate('FormularioPlatillo')}>
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </View>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '120%',
  },
  titleDescription: {
    fontSize: 23,
  },
  card: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  footer: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderWidth: 1,
    height: 80,
    width: '125%',
  },
});

export default DetallePlatillo;
