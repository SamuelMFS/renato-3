import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ProductCard from '../components/ProductCard';

const menu = {
  cafe: [
    {
      id: '1',
      name: 'Café Expresso',
      description: 'Intenso e encorpado.',
      price: 5.00,
      image: 'https://preview.redd.it/fcog14lakodd1.jpeg?width=640&crop=smart&auto=webp&s=5d7f3a5bb7ee3ccc6336cf3e70a23cac5dcae50a',
    },
    {
      id: '2',
      name: 'Capuccino',
      description: 'Com leite vaporizado e toque de canela.',
      price: 7.50,
      image: 'https://www.netcoffee.com.br/upload/produto/imagem/20d4391aa4d8ccfc401842fdfcb4be2b.webp',
    },
  ],
  lanches: [
    {
      id: '3',
      name: 'Croissant',
      description: 'Massa folhada com manteiga.',
      price: 6.00,
      image: 'https://cdn.awsli.com.br/800x800/1554/1554596/produto/116161301/850fc2bebf.jpg',
    },
    {
      id: '4',
      name: 'Pão de Queijo',
      description: 'Quentinho e crocante.',
      price: 4.50,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQscW78-okPsejSEyl05rcnApKoNc1qB2ErEw&s',
    },
  ],
  sobremesas: [
    {
      id: '5',
      name: 'Bolo de Chocolate',
      description: 'Com cobertura cremosa.',
      price: 6.50,
      image: 'https://images.tcdn.com.br/img/img_prod/913527/180_bolo_de_chocolate_lar_das_criancas_85_anos_1175_1_0fef3fc16a8055abbe2260d5d1411c9e.jpg',
    },
    {
      id: '6',
      name: 'Torta de Limão',
      description: 'Refrescante e leve.',
      price: 6.00,
      image: 'https://vivendadocamarao.vtexassets.com/arquivos/ids/157832/torta-limao-1.png?v=637800944115600000',

    },
  ],
};

export default function MenuScreen({ navigation }: any) {
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product: any) => {
    const index = cart.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonTopLeft}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonTopRight}
        onPress={() => navigation.navigate('Cart', { cart })}
      >
        <Text style={styles.buttonText}>Carrinho</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cardápio</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(menu).map(([secao, itens]) => (
          <View key={secao}>
            <Text style={styles.sectionTitle}>{secao.toUpperCase()}</Text>
            {itens.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                quantidade={cart.filter((p) => p.id === item.id).length}
                onAddToCart={() => handleAddToCart(item)}
                onRemoveFromCart={() => handleRemoveFromCart(item)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fffaf0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8B4513',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginVertical: 12,
  },
  buttonTopLeft: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: '#8B4513',
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonTopRight: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#8B4513',
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
