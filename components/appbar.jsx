import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useRouter, useSegments } from 'expo-router';

const AppBar = () => {
  const router = useRouter();
  const segments = useSegments();

  const handleHomePress = () => {
    router.push('/'); // Navega a la ruta raíz ("/")
  };

  const handleGymPress = async () => {
    try {
      const response = await fetch('http://192.168.10.101:4000/api//run_learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'start' }), // Envías datos JSON si es necesario
      });

     
      alert('Se ejecutó la solicitud con éxito'); // O muestra un mensaje al usuario
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      alert('Ocurrió un error al comunicarse con el servidor'); // Muestra un mensaje en caso de error
    }
  };

  const currentScreenName = segments[segments.length - 1] || 'DegunTech'; // Obtiene el nombre de la pantalla actual

  return (
    <Header
      leftComponent={
        <Icon
          name="home"
          type="material"
          color="white"
          onPress={handleHomePress}
        />
      }
      centerComponent={{ text: currentScreenName, style: { color: '#FFFFFF', fontWeight: 'bold' } }}
      rightComponent={
        <Icon
          name="fitness-center" // Ícono de pesas
          type="material"
          color="white"
          onPress={handleGymPress} // Ejecuta la solicitud HTTP al presionar
        />
      }
      containerStyle={{
        backgroundColor: '#1A73E8', // Color de fondo de la barra
        justifyContent: 'space-around',
      }}
    />
  );
};

export default AppBar;
