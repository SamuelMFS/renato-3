import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function OrderStatusScreen({ route }: any) {
  const { cart } = route.params;
  const totalMinutos = cart.length * 5;
  const totalSegundos = totalMinutos * 60;

  const [segundosRestantes, setSegundosRestantes] = useState(totalSegundos);
  const [finalizado, setFinalizado] = useState(false);

  // Função de notificação para dispositivos móveis
  const sendMobileNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pedido Pronto para Retirada!',
        body: 'Seu pedido já pode ser retirado.',
        sound: true,
      },
      trigger: null, // Isso envia a notificação imediatamente
    });
  };

  // Função de notificação para navegadores
  const sendBrowserNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Pedido Pronto para Retirada!', {
        body: 'Seu pedido já pode ser retirado.',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Pedido Pronto para Retirada!', {
            body: 'Seu pedido já pode ser retirado.',
          });
        }
      });
    }
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          setFinalizado(true);

          // Enviar notificação ao final do timer
          if (Platform.OS === 'web') {
            sendBrowserNotification();
          } else {
            sendMobileNotification();
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento Confirmado!</Text>

      {!finalizado ? (
        <>
          <Text style={styles.timerLabel}>Seu pedido estará pronto em:</Text>
          <Text style={styles.timer}>{formatarTempo(segundosRestantes)}</Text>
        </>
      ) : (
        <Text style={styles.ready}>✅ Pronto para retirada!</Text>
      )}
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
  timerLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  ready: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
  },
});
