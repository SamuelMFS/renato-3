import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PixPaymentScreen({ route }: any) {
  const { cart } = route.params;
  const [tempo, setTempo] = useState(30);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((t) => (t === 0 ? 30 : t - 1));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatar = (seg: number) => `00:${String(seg).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento via Pix</Text>

      <Image
        source={require('../../assets/QR.png')} // imagem de QR falso salva localmente
        style={styles.qr}
      />

      <Text style={styles.timer}>
        Código expira em {formatar(tempo)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  qr: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  timer: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
});
