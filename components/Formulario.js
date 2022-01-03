import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm, guardarCitasStorage}) => {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };

    const confirmarFecha = date => {
        const opciones = {year: 'numeric', month:'long', day:'2-digit'};
        //console.log(date.toLocaleDateString('es-ES', opciones))
        setFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    };

    const confirmarHora = hora => {
        const opciones = {hour: 'numeric', minute:'2-digit', hour12:false};
        setHora(hora.toLocaleTimeString('en-US', opciones))
        hideTimePicker();
      };

    const crearNuevaCita = () =>{
        if(paciente.trim() === '' ||
         propietario.trim() === '' || 
         telefono.trim() === '' || 
         fecha.trim() === '' || 
         hora.trim() === '' || 
         sintomas.trim() === '' )
         {
            //validacion falla
            mostrarAlerta()
            return;
         }

             //crear una nueva cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
        cita.id = shortid.generate();
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        //pasar nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo));

        setMostrarForm(false);

        
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error', //titulo
            'Todos los campos son requeridos', //mensaje
            [{
                text: 'OK' //arreglo de botones
            }]
        )

    }

    return (
        <>
        <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label} >Paciente:</Text>
                    <TextInput style={styles.input} 
                    onChangeText={(texto) => setPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label} >Propietario:</Text>
                    <TextInput style={styles.input} 
                    onChangeText={(texto) =>  setPropietario(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label} >Teléfono de contacto:</Text>
                    <TextInput style={styles.input} 
                    onChangeText={(texto) => setTelefono(texto)}
                    keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label} >Sintomas:</Text>
                    <TextInput 
                    multiline
                    style={styles.input} 
                    onChangeText={(texto) => setSintomas(texto)}
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnEnviar}>
                        <Text style={styles.textoEnviar}>Enviar</Text>
                    </TouchableHighlight>
                </View>
 
            </ScrollView>

        </>
    )

}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor:'#FFF',
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal:'2.5%'
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20
    },
    input: {
        marginTop:10,
        height:50,
        borderColor:'#e1e1e1',
        borderWidth:1,
        borderStyle:'solid'

    },
    btnEnviar: {
        padding:10,
        backgroundColor:'#AA076B',
        marginVertical:10
    },
    textoEnviar:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center'
    }
})

export default Formulario;