import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppBar from '../components/appbar';

const Sugerencias = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Advertencia preventiva */}
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>
                        ⚠️ Esta aplicación es preventiva y no sustituye la labor de un médico. 
                        Si tiene algún malestar, acuda al médico.
                    </Text>
                </View>

                {/* Contenido de sugerencias */}
                <Text style={styles.title}>Elimina los criaderos de mosquitos:</Text>
                <Text style={styles.sectionText}>
                    Elimina el agua estancada: El mosquito Aedes aegypti, transmisor del dengue, se reproduce en agua acumulada. 
                    Vacía y limpia regularmente recipientes como floreros, macetas, cubetas, llantas, botellas y cualquier otro objeto 
                    que pueda acumular agua.
                </Text>
                <Text style={styles.sectionText}>
                    Tapa los recipientes de agua: Si no puedes eliminar el agua, asegúrate de tapar bien los recipientes para evitar que 
                    los mosquitos depositen sus huevos.
                </Text>
                <Text style={styles.sectionText}>
                    Limpia canaletas y desagües: Mantén limpios los desagües y canaletas para que el agua fluya correctamente y no se acumule.
                </Text>

                <Text style={styles.title}>Protégete de las picaduras de mosquitos:</Text>
                <Text style={styles.sectionText}>
                    Usa repelente de insectos: Aplica repelente de mosquitos en la piel expuesta, siguiendo las instrucciones del fabricante.
                </Text>
                <Text style={styles.sectionText}>
                    Viste ropa protectora: Usa ropa de manga larga y pantalones largos, preferiblemente de colores claros, para reducir la 
                    exposición a las picaduras de mosquitos.
                </Text>
                <Text style={styles.sectionText}>
                    Utiliza mosquiteros: Coloca mosquiteros en puertas y ventanas, y utiliza mosquiteros para dormir, especialmente si vives 
                    en una zona de alta incidencia de dengue.
                </Text>
                <Text style={styles.sectionText}>
                    Evita las horas de mayor actividad del mosquito: El mosquito Aedes aegypti suele picar durante el día, especialmente al 
                    amanecer y al atardecer. Procura limitar las actividades al aire libre durante estas horas.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Color de fondo suave
    },
    scrollViewContent: {
        padding: 16, // Añade espacio alrededor del contenido
    },
    warningContainer: {
        backgroundColor: '#fff3cd', // Fondo amarillo claro para la advertencia
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ffeeba',
    },
    warningText: {
        fontSize: 16,
        color: '#856404', // Texto marrón oscuro (tono de advertencia)
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // Color de texto oscuro
        marginBottom: 12, // Espaciado después del título
    },
    sectionText: {
        fontSize: 16,
        color: '#555', // Color de texto más claro
        lineHeight: 24, // Mejor separación entre líneas
        marginBottom: 16, // Espaciado después de cada párrafo
    },
});

export default Sugerencias;
