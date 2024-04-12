import React, {useContext, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';

import {Text, NativeBaseProvider, View, FlatList} from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  //Context de Firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);

  //Context de pedido
  const {seleccionarPlatillo} = useContext(PedidoContext);

  //Hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    //Llamado a la función de obtener productos
    obtenerProductos();
  }, []);

  const DATA = menu.map((platillo, i) => {
    const {imagen, nombre, descripcion, categoria, precio, id} = platillo;
    return {nombre, descripcion, id, imagen, precio, categoria};
  });

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        seleccionarPlatillo(item);
        navigation.navigate('DetallePlatillo');
      }}>
      <View style={styles.list}>
        <Image source={{uri: item.imagen}} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.textDescription} numberOfLines={2}>
            {item.descripcion}
          </Text>
          <Text>Precio: $ {item.precio}</Text>
          <Text>{item.categoria}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#717171',
  },
  list: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingVertical: 8,
    marginLeft: 20,
    flexDirection: 'row',
  },
  textDescription: {
    color: '#B1B0B0',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginHorizontal: 20,
  },
});

export default Menu;
