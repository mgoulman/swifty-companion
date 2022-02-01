import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Search from './Search';
import image from './assets/42.jpeg'

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Search />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
  },
})


export default App;