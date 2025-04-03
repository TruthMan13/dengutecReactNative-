import { Link } from "expo-router";
import React, { useState } from 'react';
import { Modal, View, Text, Switch, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
const Diagnosticar = () => {
  const [visibleModal, setVisibleModal] = useState(false); // Controla la visibilidad del modal
  const [prediction, setPrediction] = useState(null); // Guarda la predicción
  const [letargo, setLetargo] = useState(false)
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
      lethargy: letargo ? 1 : 0, // Puedes ajustar si es otro estado que define "lethargy"
      age: edad ? parseFloat(edad) / 100 : 0,  // Convertir la edad a flotante
      region: parseFloat(zona) // Ejemplo de asignación a valores según zona
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

          <View style={styles.symptoms} >
            <Text>Letargo:</Text>
            <Switch value={letargo} onValueChange={setLetargo} />
          </View>

          <View style={styles.symptoms}>
            <Text>Dolor abdominal:</Text>
            <Switch value={dolorAbdominal} onValueChange={setDolorAbdominal} />
          </View>



          <View style={styles.symptoms}>
            <Text>Vómitos:</Text>
            <Switch value={vomitos} onValueChange={setVomitos} />
          </View>

          <View style={styles.symptoms}>
            <Text>Sangrado:</Text>
            <Switch value={sangrado} onValueChange={setSangrado} />

          </View >
          <View style={styles.symptoms}>
            <Text>Dificultad para respirar:</Text>
            <Switch value={dificultadRespirar} onValueChange={setDificultadRespirar} />

          </View >

          <View style={styles.ageContainer}>
            <Text style={styles.ageText}>Edad:</Text>
            <Picker
              selectedValue={edad}
              onValueChange={(itemValue) => setEdad(itemValue)}
              style={styles.picker}
            >
              {Array.from({ length: 99 }, (_, index) => (
                <Picker.Item key={index + 1} label={`${index + 1} años`} value={`${index + 1}`} />
              ))}
            </Picker>
          </View>

          <View style={styles.zoneContainer}>
            <Text style={styles.zoneText}>Zona:</Text>
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

        </View>
        <Button title="Generar y Enviar JSON" onPress={generarJSON} />
        <View style={styles.container}>


        <Modal visible={visibleModal} transparent animationType="slide">
    <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { borderColor: getBorderColor() }]}>
            <Text style={styles.modalTitle}>El Diagnóstico es</Text>
            <Text
                style={[
                    styles.predictionText,
                    {
                        color:
                            prediction && prediction[1] === 1
                                ? "#ffa500" // Naranja para "Tiene dengue"
                                : prediction && prediction[2] === 1
                                ? "#ff3333" // Rojo para "Tiene dengue grave"
                                : "#00cc66", // Verde para "No tiene dengue"
                    },
                ]}
            >
                {prediction && prediction[1] === 1
                    ? "Tiene dengue. Es importante que tome precauciones adicionales y consulte con un médico."
                    : prediction && prediction[2] === 1
                    ? "Tiene dengue grave. Necesita atención médica inmediata."
                    : "No tiene dengue. Recuerde mantener las medidas preventivas para evitar infecciones."}
            </Text>
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor:
                            prediction && prediction[1] === 1
                                ? "#ffa500" // Naranja para "Tiene dengue"
                                : prediction && prediction[2] === 1
                                ? "#ff3333" // Rojo para "Tiene dengue grave"
                                : "#00cc66", // Verde para "No tiene dengue"
                    },
                ]}
                onPress={() => setVisibleModal(false)}
            >
                 <Link href={`/Sugerencias`} style={styles.buttonText}>
                    Cerrar
                  </Link>
            </TouchableOpacity>
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
    backgroundColor: "#f5f5f5", // Fondo claro y moderno
  },
  zoneContainer: {
    marginVertical: 15, // Espaciado arriba y abajo
    marginHorizontal: 20, // Márgenes laterales para centrarlo
    padding: 10, // Espaciado interno
    backgroundColor: "#fff", // Fondo blanco
    borderRadius: 8, // Bordes suaves
    borderWidth: 1.5, // Borde delgado
    borderColor: "#2196F3", // Azul vibrante
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Sombra ligera para Android
  },
  zoneText: {
    fontSize: 16, // Tamaño de fuente mediano
    fontWeight: "bold",
    color: "#333", // Gris oscuro para el texto
    marginBottom: 10, // Espacio debajo del título
    textAlign: "left", // Alineación a la izquierda
  },
  ageContainer: {
    marginVertical: 15, // Espacio arriba y abajo para separarlo del resto
    marginHorizontal: 20, // Márgenes laterales para centrar
    padding: 10, // Espaciado interno
    backgroundColor: "#fff", // Fondo blanco
    borderRadius: 8, // Bordes suaves
    borderWidth: 1.5, // Borde delgado

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Sombra ligera
  },
  ageText: {
    fontSize: 16, // Texto mediano
    fontWeight: "bold",
    color: "#333", // Gris oscuro
    marginBottom: 10, // Espacio debajo del título
    textAlign: "left", // Alineación hacia la izquierda
  },

  input: {
    height: 40,
    borderColor: "#4CAF50", // Color verde para el borde
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5, // Bordes redondeados
    backgroundColor: "#ffffff", // Fondo blanco
  },
  symptoms: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff", // Fondo blanco para cada línea
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Sombra para Android
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Color gris oscuro
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#4CAF50", // Color verde del borde
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#4CAF50", // Color verde vibrante
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,

    paddingHorizontal: 10, // Añade algo de ancho
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff", // Fondo blanco
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#4CAF50", // Color verde
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Sombra en Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Gris oscuro
    textAlign: "center",
  },
  predictionText: {
    fontSize: 18,
    color: "#4CAF50", // Texto verde
    marginBottom: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Asegura que el texto esté centrado
},
});


export default Diagnosticar;