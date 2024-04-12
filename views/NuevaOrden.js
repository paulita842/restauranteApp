import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text, NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';

const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <Container style={globalStyles.contenedor}>
        <View style={[globalStyles.contenido, styles.contenido]}>
          <Button
            style={[globalStyles.boton, styles.button]}
            onPress={() => navigation.navigate('Menu')}>
            <Text style={globalStyles.botonTexto}>Crear Nueva orden</Text>
          </Button>
        </View>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 350,
  },
  button: {
    borderRadius: 25,
  },
});

export default NuevaOrden;
