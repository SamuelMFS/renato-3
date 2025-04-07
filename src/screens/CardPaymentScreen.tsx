import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function CardPaymentScreen({ route, navigation }: any) {
  const { cart } = route.params;

  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const validarCampos = () => {
    if (
      numero.length !== 16 ||
      !/^\d+$/.test(numero) ||
      nome.trim().length < 3 ||
      !/^\d{2}\/\d{2}$/.test(validade) ||
      cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)
    ) {
      Alert.alert('Dados inválidos', 'Verifique os campos preenchidos.');
      return false;
    }
    return true;
  };

  const handleConfirmar = () => {
    if (!validarCampos()) return;

    Alert.alert('Pagamento aprovado!', 'Redirecionando para o status do pedido...');
    navigation.replace('OrderStatus', { cart });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Pagamento com Cartão</Text>

      <TextInput
        placeholder="Número do Cartão"
        style={styles.input}
        keyboardType="numeric"
        maxLength={16}
        value={numero}
        onChangeText={(text) => setNumero(text.replace(/\D/g, ''))}
      />

      <TextInput
        placeholder="Nome no Cartão"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Validade (MM/AA)"
            style={styles.input}
            maxLength={5}
            value={validade}
            onChangeText={(text) => setValidade(text.replace(/[^0-9/]/g, ''))}
          />
        </View>
      
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="CVV"
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            value={cvv}
            onChangeText={(text) => setCvv(text.replace(/\D/g, ''))}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.buttonText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
});
