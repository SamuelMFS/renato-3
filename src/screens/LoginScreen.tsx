import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // Configuração do login com Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Substitua pelo seu Client ID do Google
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication!;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          navigation.replace('Menu'); // Redireciona para o Menu após login com sucesso
        })
        .catch((error) => {
          console.error('Erro ao fazer login com o Google:', error.message);
          Alert.alert('Erro', 'Não foi possível fazer login com o Google.');
        });
    }
  }, [response]);

  const handleLogin = () => {
    setErroLogin(''); // limpa erro anterior

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.replace('Menu');
      })
      .catch((error) => {
        let mensagem = 'Não foi possível fazer login.';

        if (error.code === 'auth/invalid-email') {
          mensagem = 'Email inválido. Verifique e tente novamente.';
        } else if (error.code === 'auth/wrong-password') {
          mensagem = 'Senha incorreta.';
        } else if (error.code === 'auth/user-not-found') {
          mensagem = 'Usuário não encontrado.';
        }

        setErroLogin(mensagem);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />

      {erroLogin !== '' && (
        <Text style={styles.erroTexto}>{erroLogin}</Text>
      )}

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Não tem conta? Cadastre-se
      </Text>

      {/* Botão para login com Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()} // Dispara o login com Google
      >
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#8B4513',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#8B4513',
    textDecorationLine: 'underline',
  },
  erroTexto: {
    color: '#cc4c4c', // vermelho mais suave
    backgroundColor: '#ffe6e6', // fundo levemente rosado
    padding: 10,
    marginTop: 12,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#4285F4', // Cor do Google
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
