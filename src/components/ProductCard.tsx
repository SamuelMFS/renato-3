import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  quantidade: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
  quantidade,
  onAddToCart,
  onRemoveFromCart,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.price}>
          {typeof price === 'number' ? `R$ ${price.toFixed(2)}` : 'Preço inválido'}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onRemoveFromCart} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantidade}>{quantidade || 0}</Text>

          <TouchableOpacity onPress={onAddToCart} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 8,
  },
});
