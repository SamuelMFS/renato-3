import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentScreen({ route, navigation }: any) {
  const { cart, total } = route.params;
  const [metodoSelecionado, setMetodoSelecionado] = useState<string | null>(null);

  const handleConfirmar = async () => {
    if (!metodoSelecionado) {
      Alert.alert('Selecione uma forma de pagamento!');
      return;
    }

    // Cria um novo pedido com as informações do carrinho e método de pagamento
    const pedido = {
      itens: cart,
      metodo: metodoSelecionado,
      total: total,
      status: 'pendente', // Status inicial do pedido
      dataCriacao: new Date().toISOString(),
    };

    try {
      // Salva o pedido localmente usando AsyncStorage
      const pedidosString = await AsyncStorage.getItem('pedidos');
      let pedidos = pedidosString ? JSON.parse(pedidosString) : [];

      // Adiciona o novo pedido à lista
      pedidos.push(pedido);

      // Salva a lista de pedidos novamente
      await AsyncStorage.setItem('pedidos', JSON.stringify(pedidos));

      console.log(`✅ Pedido salvo localmente. Redirecionando para a tela de status...`);

      if (metodoSelecionado === 'Dinheiro') {
        navigation.replace('OrderStatus', { cart });
        return;
      }

      if (metodoSelecionado === 'Cartão de Crédito' || metodoSelecionado === 'Cartão de Débito') {
        navigation.navigate('CardPayment', { cart });
        return;
      }

      if (metodoSelecionado === 'Pix') {
        navigation.navigate('PixPayment', { cart });
        return;
      }

      Alert.alert(
        'Pagamento confirmado!',
        `Forma: ${metodoSelecionado}\nTotal: R$ ${total.toFixed(2)}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('OrderStatus', { cart });
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao salvar pedido localmente:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o pedido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>
      <Text style={styles.info}>Total: R$ {total.toFixed(2)}</Text>

      <View style={styles.containerMetodos}>
        <TouchableOpacity onPress={() => setMetodoSelecionado('Cartão de Crédito')} style={[styles.botaoMetodo, metodoSelecionado === 'Cartão de Crédito' && styles.botaoMetodoSelecionado]}>
          <Text style={styles.textoMetodo}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMetodoSelecionado('Cartão de Débito')} style={[styles.botaoMetodo, metodoSelecionado === 'Cartão de Débito' && styles.botaoMetodoSelecionado]}>
          <Text style={styles.textoMetodo}>Cartão de Débito</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMetodoSelecionado('Pix')} style={[styles.botaoMetodo, metodoSelecionado === 'Pix' && styles.botaoMetodoSelecionado]}>
          <Text style={styles.textoMetodo}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMetodoSelecionado('Dinheiro')} style={[styles.botaoMetodo, metodoSelecionado === 'Dinheiro' && styles.botaoMetodoSelecionado]}>
          <Text style={styles.textoMetodo}>Dinheiro</Text>
        </TouchableOpacity>
      </View>

      {metodoSelecionado && (
        <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmar}>
          <Text style={styles.textoConfirmar}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fffaf0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 24,
    color: '#333',
  },
  containerMetodos: {
    width: '100%',
    gap: 12,
    marginBottom: 28,
  },
  botaoMetodo: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoMetodoSelecionado: {
    backgroundColor: '#8B4513',
  },
  textoMetodo: {
    fontSize: 16,
    color: '#333',
  },
  textoMetodoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoConfirmar: {
    backgroundColor: '#8B4513',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  textoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
