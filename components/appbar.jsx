import React from 'react';
import { Header, Icon} from 'react-native-elements';
import { useRouter, useSegments } from 'expo-router';

const AppBar = () => {
  const router = useRouter();
  const segments = useSegments();

  const handleHomePress = () => {
    router.push('/'); // Navega a la ruta raíz ("/")
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
      centerComponent={{ text: currentScreenName, style: { color: '#FFFFFF' } }}
      containerStyle={{
        backgroundColor: '#1A73E8', // Color de fondo de la App Bar
        justifyContent: 'space-around',
      }}
    />
  );
};

export default AppBar;