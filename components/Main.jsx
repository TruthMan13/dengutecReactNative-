import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { Button } from "react-native-elements";

const Main = () => {
    return (
        <View style={styles.container}>
            {/* Mensaje de advertencia */}
       

            <ImageBackground source={require('../assets/imagen1.jpg')} style={[styles.box]}>
                <Button
                    buttonStyle={[styles.button, styles.alignLeft]}
                    title={
                        <Link href="Diagnosticar" style={{ color: 'white', textDecoration: 'none' }}>
                            Diagnosticar
                        </Link>
                    }
                />
            </ImageBackground>

            <ImageBackground source={require('../assets/imangen2.jpg')} style={[styles.box]}>
                <Button
                    buttonStyle={[styles.button, styles.alignRight]}
                    title={
                        <Link href="Nuevo_caso" style={{ color: 'white', textDecoration: 'none' }}>
                            Nuevo caso
                        </Link>
                    }
                />
            </ImageBackground>

            <ImageBackground source={require('../assets/imagen1.jpg')} style={[styles.box]}>
                <Button
                    buttonStyle={{ margin: 10 }}
                    
                    title={
                        <Link href="Sugerencias" style={{ color: 'white', textDecoration: 'none' }}>
                            Prevención
                        </Link>
                    }
                />
            </ImageBackground>
            
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 10,
      backgroundColor: 'white',
  },
  warningContainer: {
      backgroundColor: '#fff3cd', // Fondo amarillo claro
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ffeeba',
      marginBottom: 16,
  },
  warningText: {
      fontSize: 16,
      color: '#856404', // Texto marrón oscuro
      textAlign: 'center',
      fontWeight: 'bold',
  },
  box: {
      width: "100%",
      height: 160,
      margin: 5,
      backgroundColor: 'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
},
  alignRight: {
      alignSelf: 'flex-start', // Alinea el contenedor a la derecha
  },
  alignLeft: {
      alignSelf: 'flex-end', // Alinea el contenedor a la izquierda
  },
});

export default Main;
