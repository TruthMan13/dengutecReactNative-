import React, { useState } from 'react';
import {Modal, View, Text, Switch, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import AppBar from '../components/appbar';
const opcionesZonas = [
  { label: "Juan Griego", value: "0.01" },
  { label: "Los Millanes", value: "0.02" },
  { label: "Las Cabreras", value: "0.03" },
  { label: "Pedregales", value: "0.04" },
  { label: "Vicuña", value: "0.05" },
  { label: "La Galera", value: "0.06" },
  { label: "La Sabaneta", value: "0.07" },
  { label: "La Salina", value: "0.08" },
  { label: "Tari Tari", value: "0.09" },
  { label: "Girigire", value: "0.10" },
  { label: "Culo e' Mono", value: "0.11" },
  { label: "Guaimaro", value: "0.12" },
  { label: "San Martin", value: "0.13" },
  { label: "El Palito", value: "0.14" },
  { label: "Las Piedras", value: "0.15" },
];
const Nuevo_caso = () => {
  const [visibleModal, setVisibleModal] = useState(false); // Controla la visibilidad del modal
  const [prediction, setPrediction] = useState(null); // Guarda la predicción

  const [fiebre, setFiebre] = useState(false);
  const [dolorCabeza, setDolorCabeza] = useState(false);
  const [dolorMuscular, setDolorMuscular] = useState(false);
  const [dolorArticular, setDolorArticular] = useState(false);
  const [nauseas, setNauseas] = useState(false);
  const [dolorOjos, setDolorOjos] = useState(false);
  const [fatiga, setFatiga] = useState(false);
  const [ganglios, setGanglios] = useState(false);
  const [dolorAbdominal, setDolorAbdominal] = useState(false);
  const [vomitos, setVomitos] = useState(false);
  const [sangrado, setSangrado] = useState(false);
  const [dificultadRespirar, setDificultadRespirar] = useState(false);
  const [edad, setEdad] = useState('');
  const [zona, setZona] = useState("0.01")
  const getBorderColor = () => {
    if (!prediction) return "transparent"; // Sin predicción, sin color
  
    if (prediction[1] === 1) return "yellow"; // Si es dengue
    if (prediction[2] === 1) return "red"; // Si es dengue grave
  
    return "green"; // Si no tiene dengue
  };
  const generarJSON = () => {
    // Mapear los estados al formato requerido para el JSON
    const data = {
      fever: fiebre ? 1 : 0,
      headache: dolorCabeza ? 1 : 0,
      muscle_pain: dolorMuscular ? 1 : 0,
      joint_pain: dolorArticular ? 1 : 0,
      nausea: nauseas ? 1 : 0,
      retrocular_pain: dolorOjos ? 1 : 0,
      fatigue: fatiga ? 1 : 0,
      swollen_glands: ganglios ? 1 : 0,
      abdominal_pain: dolorAbdominal ? 1 : 0,
      vomiting: vomitos ? 1 : 0,
      bleeding: sangrado ? 1 : 0,
      respiratory_distress: dificultadRespirar ? 1 : 0,
      lethargy: fatiga ? 1 : 0, // Puedes ajustar si es otro estado que define "lethargy"
      age: edad ? parseFloat(edad) : 0, // Convertir la edad a flotante
      region: zona === "centro" ? 0.025 : zona === "norte" ? 0.050 : 0.075, // Ejemplo de asignación a valores según zona
    };

    // Convertir el objeto en un JSON
    const jsonData = JSON.stringify(data);

    // Mostrar el JSON en la consola
    console.log(jsonData);

    // Opcional: enviar el JSON a una API
    enviarAAPI(jsonData);
  };

  const enviarAAPI = async (jsonData) => {
    try {
      const response = await fetch("http://192.168.10.101:4000/api/base_conocimientos/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const resultado = await response.json();
      console.log("Respuesta de la API:", resultado);
  
      // Guardar la predicción en el estado
      if (resultado.prediction && Array.isArray(resultado.prediction)) {
        setPrediction(resultado.prediction); // Actualiza la predicción
        setVisibleModal(true); // Muestra el modal
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };
  const mostrarPrediccion = (prediction) => {
    // Convertir la predicción en un mensaje amigable
    const resultados = ["No tiene dengue", "Tiene dengue", "Tiene dengue grave"];
    const mensaje = prediction
      .map((valor, index) => (valor === 1 ? resultados[index] : null))
      .filter((resultado) => resultado !== null)
      .join(", ");

    alert(`Resultado de la predicción: ${mensaje}`);
  };
  return (
    <View>
      <AppBar></AppBar>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.container}>
        <View style={styles.symptoms}>
          <Text>Fiebre:</Text>
          <Switch value={fiebre} onValueChange={setFiebre} />
        </View>

        <View style={styles.symptoms}>
          <Text>Dolor de cabeza:</Text>
          <Switch value={dolorCabeza} onValueChange={setDolorCabeza} />

        </View>
        <View style={styles.symptoms}>
          <Text>Dolor muscular:</Text>
          <Switch value={dolorMuscular} onValueChange={setDolorMuscular} />
        </View>

        <View style={styles.symptoms}>
          <Text>Dolor articular:</Text>
          <Switch value={dolorArticular} onValueChange={setDolorArticular} />
        </View>

        <View style={styles.symptoms}>
          <Text>Náuseas:</Text>
          <Switch value={nauseas} onValueChange={setNauseas} />
        </View>

        <View style={styles.symptoms}>
          <Text>Dolor detrás de los ojos:</Text>
          <Switch value={dolorOjos} onValueChange={setDolorOjos} />
        </View>

        <View style={styles.symptoms}>
          <Text>Fatiga:</Text>
          <Switch value={fatiga} onValueChange={setFatiga} />
        </View>

        <View style={styles.symptoms}>
          <Text>Ganglios inflamados:</Text>
          <Switch value={ganglios} onValueChange={setGanglios} />

        </View>

        <View style={styles.symptoms}>
          <Text>Dolor abdominal:</Text>
          <Switch value={dolorAbdominal} onValueChange={setDolorAbdominal} />
        </View>



        <View style={styles.symptoms}>
          <Text>Vómitos:</Text>
          <Switch value={vomitos} onValueChange={setVomitos} />
        </View>

        <Text>Sangrado:</Text>
        <Switch value={sangrado} onValueChange={setSangrado} />

        <Text>Dificultad para respirar:</Text>
        <Switch value={dificultadRespirar} onValueChange={setDificultadRespirar} />
        <Text>Edad:</Text>
        <Picker
          selectedValue={edad}
          onValueChange={(itemValue) => setEdad(itemValue)}
          style={styles.picker}
        >
          {Array.from({ length: 99 }, (_, index) => (
            <Picker.Item key={index + 1} label={`${index + 1}`} value={`${index + 1}`} />
          ))}
        </Picker>

        <Text>Zona:</Text>
        <Picker
          selectedValue={zona}
          onValueChange={(itemValue) => setZona(itemValue)}
          style={styles.picker}
        >
          {opcionesZonas.map((opcion, index) => (
            <Picker.Item key={index} label={opcion.label} value={opcion.value} />
          ))}
        </Picker>

      </View>
      <Button title="Generar y Enviar JSON" onPress={generarJSON} />
      <View style={styles.container}>


      <Modal visible={visibleModal} transparent animationType="slide">
  <View style={styles.modalContainer}>
    <View style={[styles.modalContent, { borderColor: getBorderColor() }]}>
      <Text style={styles.modalTitle}>Resultado de la Predicción</Text>
      <Text style={styles.predictionText}>
        {prediction && prediction[1] === 1
          ? "Tiene dengue"
          : prediction && prediction[2] === 1
          ? "Tiene dengue grave"
          : "No tiene dengue"}
      </Text>
      <Button title="Cerrar" onPress={() => setVisibleModal(false)} />
    </View>
  </View>
</Modal>



      </View>
      
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  symptoms: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,

  }, modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 5, // Grosor del borde
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  predictionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  }
});

const ZonaSelector = ({ value, onChange }) => {
  return (
    <View style={styles.zonaContainer}>
      <Text>Zona:</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.zonaPicker}
      >
        <Picker.Item label="Centro" value="centro" />
        <Picker.Item label="Norte" value="norte" />
        <Picker.Item label="Sur" value="sur" />
      </Picker>
    </View>
  );
};


export default Nuevo_caso;