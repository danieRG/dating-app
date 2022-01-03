import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, FlatList,TouchableHighlight, TouchableWithoutFeedback ,Platform, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [mostrarForm, setMostrarForm] =useState(false);
  //definir state de citas
  const [citas, setCitas] = useState([]);


  useEffect(() => {
    const obtenerCitasStorage = async () =>{
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage){
          setCitas(JSON.parse(citasStorage));
        }

        console.log(citasStorage)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCitasStorage();
  }, [])

  //almacenar citas en storage
  const guardarCitasStorage = async (citasJSON) =>{
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error)
    }
  }

  //elimina los pacientes del state
  const eliminarPaciente = id => {

    const citasFiltradas = citas.filter(cita => cita.id !== id);

    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas))
  }
  //muestra u oculta formulario
  const mostrarFormulario = () =>{
    setMostrarForm(!mostrarForm);
  }

const cerrarTeclado = () =>{
  Keyboard.dismiss();
}

  return (
    <>
        <View style={styles.contenedor} >
          <Text style={styles.titulo} >Administrador de citas</Text>
          <View>
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
                <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Administrar citas' : 'Crear nueva cita'}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo} > Crear nueva cita</Text>
                <Formulario 
                  citas={citas}
                  setCitas={setCitas}
                  setMostrarForm={setMostrarForm}
                  guardarCitasStorage={guardarCitasStorage}
                />
              </>
            ):(
              <>
                <Text style={styles.titulo} >{ citas.length > 0 ? 'Admistra tus citas':'No hay citas'}</Text>
                <FlatList style={styles.listado} data={citas} renderItem={({item}) => <Cita  item={item} eliminarPaciente={eliminarPaciente} /> } 
                keyExtractor={ cita => cita.id}
                />
              </>
            )}

          </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({

  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },

  titulo:{
    textAlign:'center',
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom:20,
    fontSize:24,
    fontWeight:'bold'
  },
  contenido:{
    flex:1,
    marginHorizontal:'2.5%'
  },
  listado:{
    flex:1

  },
  btnMostrarForm: {
    padding:10,
    backgroundColor:'#AA072B',
    marginVertical:10
},
textoMostrarForm:{
    color:'#FFF',
    fontWeight:'bold',
    textAlign:'center'
}

})

export default App;
