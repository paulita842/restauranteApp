import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    marginHorizontal: '3.5%',
    flex: 1,
  },
  boton: {
    backgroundColor: '#FFDA00',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  imagen: {
    height: 300,
    width: '100%',
  },
  cantidad: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    marginHorizontal: 20,
  },
  list: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingVertical: 5,
    marginLeft: 15,
    flexDirection: 'row',
  },
  botonPedir: {
    backgroundColor: '#000',
  },
  textoBoton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default globalStyles;
