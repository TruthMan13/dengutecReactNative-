import React, { useState } from 'react';
import { Modal, View, Text, Switch, StyleSheet, TextInput, ScrollView } from 'react-native';
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
    const [diagnostico, setDiagnostico] = useState("No dengue");
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
    const [letargo, setLetargo] = useState(false)
    const [dificultadRespirar, setDificultadRespirar] = useState(false);
    const [edad, setEdad] = useState('');
    const [zona, setZona] = useState("0.01")
    const [fecha, setFecha] = useState("2000-01-01");
    





    const generarJSON = () => {
  // Mapear los estados al formato requerido para el JSON
  const data = {
    diagnosis: diagnostico === "No dengue" ? 0 : diagnostico === "Dengue" ? 1 : 2,
    date_of_onset: fecha, 
    abdominal_pain: dolorAbdominal ? 1 : 0,
    age: edad ? parseFloat(edad) / 100 : 0, 
    bleeding: sangrado ? 1 : 0,
    fatigue: fatiga ? 1 : 0,
    fever: fiebre ? 1 : 0,
    headache: dolorCabeza ? 1 : 0,
    joint_pain: dolorArticular ? 1 : 0,
    lethargy: letargo ? 1 : 0,
    muscle_pain: dolorMuscular ? 1 : 0,
    nausea: nauseas ? 1 : 0,
    region: parseFloat(zona),
    respiratory_distress: dificultadRespirar ? 1 : 0,
    retrocular_pain: dolorOjos ? 1 : 0,
    swollen_glands: ganglios ? 1 : 0,
    vomiting: vomitos ? 1 : 0,
  };

  // Crear un mensaje con los síntomas activos (valor 1)
  const sintomasActivos = Object.entries(data)
    .filter(([key, value]) => value === 1) // Filtrar valores en 1
    .map(([key]) => key.replace(/_/g, " ")) // Reemplazar guiones bajos por espacios
    .join(", "); // Unir en una lista legible

  const mensaje = `Se han enviados los datos del caso con exito`;

  // Mostrar el JSON y el mensaje
  console.log("JSON generado:", JSON.stringify(data));
  console.log(mensaje);

  // Opcional: mostrar el mensaje al usuario
  alert(mensaje);

  // Enviar el JSON a la API
  enviarAAPI(JSON.stringify(data));
};

    const enviarAAPI = async (jsonData) => {
        try {
            const response = await fetch("http://192.168.10.101:4000/api/cases", {
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
                // Muestra el modal
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error.message);
        }
    };
  
    return (
        <View>

            <AppBar></AppBar>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.diagnosisContainer}>
                    <Text style={styles.diagnosisText}>Diagnóstico:</Text>
                    <Picker
                        selectedValue={diagnostico}
                        onValueChange={(itemValue) => setDiagnostico(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="No dengue" value="No dengue" />
                        <Picker.Item label="Dengue" value="Dengue" />
                        <Picker.Item label="Dengue grave" value="Dengue grave" />
                    </Picker>
                </View>
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

                    </View  >
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
                    </View >
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

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Fecha (yyyy-mm-dd):</Text>
                    <TextInput
                        style={styles.input}
                        value={fecha}
                        onChangeText={setFecha}
                        placeholder="yyyy-mm-dd"
                        keyboardType="numeric"
                    />
                </View>


                <Button title="Crear Nuevo Caso" onPress={generarJSON} />
                <View style={styles.container}>


                  



                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f7f9fc", // Fondo claro y moderno
    }, dateContainer: {
        marginVertical: 15, // Espacio arriba y abajo
        marginHorizontal: 20, // Márgenes laterales
        padding: 10, // Espaciado interno
        backgroundColor: "#fff", // Fondo blanco para destacar
        borderRadius: 8, // Bordes suaves y redondeados
        borderWidth: 1.5, // Borde más delgado
        borderColor: "#FF5722", // Color naranja vibrante para diferenciar
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra ligera
    },
    dateText: {
        fontSize: 16, // Tamaño de texto mediano
        fontWeight: "bold",
        color: "#333", // Gris oscuro para el texto
        marginBottom: 10, // Espacio debajo del título
        textAlign: "left", // Alineación a la izquierda para claridad
    },
    input: {
        height: 40,
        
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10, // Espacio interno
        backgroundColor: "#f9f9f9", // Fondo claro
        fontSize: 16, // Tamaño de fuente ajustado para entrada
        color: "#333", // Gris oscuro para el texto
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
    diagnosisContainer: {
        marginVertical: 15, // Espacio arriba y abajo
        marginHorizontal: 20, // Márgenes laterales
        padding: 10, // Espaciado interno más compacto
        backgroundColor: "#fff", // Fondo blanco
        borderRadius: 8, // Bordes suaves
        borderWidth: 1.5, // Borde delgado

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra para Android
    },
    diagnosisText: {
        fontSize: 18, // Texto más visible
        fontWeight: "bold",
        color: "#333", // Gris oscuro
        textAlign: "center",
    },
    picker: {
        backgroundColor: "#ffffff",

        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    input: {
        height: 40,

        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    symptoms: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#dcdcdc", // Borde gris claro
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Sombra en Android
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333", // Texto gris oscuro
        textAlign: "center",
    },
    button: {
        backgroundColor: "#4CAF50", // Botón verde
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25, // Redondeado
        alignSelf: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff", // Texto blanco
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5, // Sombra en Android
        borderColor: "#4CAF50",
        borderWidth: 2,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
    },
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