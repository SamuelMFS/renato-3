import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Certifique-se de que a configuração do Firebase está correta

export default function ProfileScreen({ navigation }: any) {
  const user = auth.currentUser;

  const [nome, setNome] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');

  const [pedidos, setPedidos] = useState<any[]>([]);

  // Carregar dados salvos localmente
  useEffect(() => {
    const loadUserData = async () => {
      const nomeSalvo = await AsyncStorage.getItem('nome');
      const emailSalvo = await AsyncStorage.getItem('email');
      if (nomeSalvo) setNome(nomeSalvo);
      if (emailSalvo) setEmail(emailSalvo);

      const pedidosString = await AsyncStorage.getItem('pedidos');
      const pedidosData = pedidosString ? JSON.parse(pedidosString) : [];
      setPedidos(pedidosData);
    };

    loadUserData();
  }, []);

  const handleAlterarNome = async () => {
    if (nome === '') {
      Alert.alert('Erro', 'Por favor, insira um nome válido.');
      return;
    }

    updateProfile(user!, {
      displayName: nome,
    })
      .then(() => {
        AsyncStorage.setItem('nome', nome); // Salvar nome alterado localmente
        Alert.alert('Sucesso', 'Nome alterado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao alterar nome:', error);
        Alert.alert('Erro', 'Não foi possível alterar o nome.');
      });
  };

  const handleAlterarSenha = async () => {
    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senhaAtual === '') {
      Alert.alert('Erro', 'Por favor, insira a senha atual.');
      return;
    }

    const userCredential = auth.currentUser;
    const credential = await auth.EmailAuthProvider.credential(
      userCredential?.email!,
      senhaAtual
    );

    userCredential?.reauthenticateWithCredential(credential)
      .then(() => {
        updatePassword(user!, novaSenha)
          .then(() => {
            Alert.alert('Sucesso', 'Senha alterada com sucesso!');
            setSenhaAtual('');
            setNovaSenha('');
          })
          .catch((error) => {
            console.error('Erro ao alterar senha:', error);
            Alert.alert('Erro', 'Não foi possível alterar a senha.');
          });
      })
      .catch((error) => {
        console.error('Erro de autenticação:', error);
        Alert.alert('Erro', 'Senha atual incorreta.');
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Desconectado', 'Você saiu da sua conta.');
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Erro ao sair', error.message);
      });
  };

  const renderPedido = ({ item }: any) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.pedidoText}>Método: {item.metodo}</Text>
      <Text style={styles.pedidoText}>Status: {item.status}</Text>
      <Text style={styles.pedidoText}>Total: R$ {item.total.toFixed(2)}</Text>
      <Text style={styles.pedidoText}>Data de Criação: {new Date(item.dataCriacao).toLocaleString()}</Text>
      <Text style={styles.pedidoText}>Itens:</Text>
      {item.itens.map((produto: any, index: number) => (
        <Text key={index} style={styles.pedidoText}>- {produto.name}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TouchableOpacity style={styles.button} onPress={handleAlterarNome}>
        <Text style={styles.buttonText}>Alterar Nome</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
        placeholder="Email"
      />

      <Text style={styles.label}>Senha Atual:</Text>
      <TextInput
        style={styles.input}
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
        placeholder="Senha Atual"
      />

      <Text style={styles.label}>Nova Senha:</Text>
      <TextInput
        style={styles.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        placeholder="Nova Senha"
      />
      <TouchableOpacity style={styles.button} onPress={handleAlterarSenha}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Seus Pedidos:</Text>
      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          renderItem={renderPedido}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      ) : (
        <Text style={styles.info}>Nenhum pedido encontrado.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fffaf0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#8B4513',
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
  pedidoContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  pedidoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});
