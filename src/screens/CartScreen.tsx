import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen({ route, navigation }: any) {
  const initialCart = route.params?.cart || [];
  const [cart, setCart] = useState(initialCart);

  const groupCart = () => {
    return cart.reduce((acc: any, item: any) => {
      const found = acc.find((i: any) => i.id === item.id);
      if (found) {
        found.qtd += 1;
      } else {
        acc.push({ ...item, qtd: 1 });
      }
      return acc;
    }, []);
  };

  const handleAdd = (item: any) => {
    setCart([...cart, item]);
  };

  const handleRemove = (item: any) => {
    const index = cart.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const handleRemoveAll = (item: any) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de fechar o pedido.');
      return;
    }
  
    const total = cart.reduce((sum, item) => sum + item.price, 0);
  
    navigation.navigate('Payment', { cart, total });
  };

  const groupedItems = groupCart();

  const totalPedido = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>

      <FlatList
        data={groupedItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>
                Qtd: {item.qtd} | Total: R$ {(item.price * item.qtd).toFixed(2)}
              </Text>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() =>
                  item.qtd === 1 ? handleRemoveAll(item) : handleRemove(item)
                }
                style={styles.controlButton}
              >
                {item.qtd === 1 ? (
                  <Ionicons name="trash-outline" size={20} color="#fff" />
                ) : (
                  <Text style={styles.controlText}>–</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.quantidade}>{item.qtd}</Text>

              <TouchableOpacity
                onPress={() => handleAdd(item)}
                style={styles.controlButton}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total do pedido:</Text>
        <Text style={styles.totalValue}>R$ {totalPedido.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Fechar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fffaf0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 40,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  controlButton: {
    backgroundColor: '#8B4513',
    padding: 8,
    borderRadius: 8,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
  quantidade: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 20,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
});
