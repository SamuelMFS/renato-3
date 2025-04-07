import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({ navigation }: any) {
  const viewRef = useRef<any>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (viewRef.current) {
        viewRef.current.fadeOut(600).then(() => {
          navigation.replace('Login');
        });
      }
    }, 2500); // tempo total até iniciar transição

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animatable.View
      ref={viewRef}
      animation="fadeIn"
      duration={1000}
      style={styles.container}
    >
      <Animatable.Image
        animation="fadeInDown"
        duration={1000}
        delay={300}
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Animatable.Text
        animation="fadeInUp"
        duration={1000}
        delay={800}
        style={styles.title}
      >
        Cafeteria App
      </Animatable.Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf0',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B4513',
  },
});
