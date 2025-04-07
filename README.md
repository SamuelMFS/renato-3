# Cafeteria App

Este é um projeto de aplicativo de cafeteria que permite aos usuários fazer pedidos, pagar por diferentes métodos e acompanhar o status de seus pedidos.

## Requisitos

Para rodar esse projeto localmente, você precisará de:

- Node.js instalado na sua máquina (versão recomendada: LTS)
- npm (gerenciador de pacotes do Node)
- Expo (para rodar o aplicativo React Native)

## Rodando o Projeto

Siga os passos abaixo para rodar o projeto localmente.

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/cafeteria-app.git
```

### 2. Acesse a pasta do projeto:

```bash
cd renato-3
```

### 3. Instale as dependências do projeto:

No root do projeto, rode o seguinte comando para instalar todas as dependências:

```bash
npm install
```

### 4. Execute o aplicativo no navegador:

Depois de instalar as dependências, para rodar a versão web do projeto, execute:

```bash
npm run web
```

Isso iniciará o projeto em modo de desenvolvimento, e você poderá acessá-lo no navegador em:

```
http://localhost:3000
```

### 5. Rodando no Dispositivo Móvel:

Se você quiser rodar no dispositivo móvel, utilize o Expo:

```bash
npm start
```

Isso abrirá o QR Code no terminal, e você pode escanear esse código com o app **Expo Go** no seu celular para ver o aplicativo em funcionamento.

## Funcionalidades

- **Login**: O usuário pode se autenticar via **Email e Senha** ou usar **Login com Google**.
- **Menu**: Os usuários podem selecionar produtos do menu e adicionar ao carrinho.
- **Pagamento**: O aplicativo suporta **Cartão de Crédito**, **Cartão de Débito**, **Pix** e **Dinheiro**.
- **Status do Pedido**: Após o pagamento, o usuário pode ver o status do pedido com um timer regressivo até o pedido estar pronto para retirada.
- **Perfil do Usuário**: O usuário pode visualizar e alterar seu nome e senha, além de visualizar o histórico de pedidos.

## Dependências

Este projeto utiliza as seguintes dependências:

- `expo`
- `react-navigation`
- `firebase`
- `expo-auth-session`
- `expo-notifications`
- `@react-native-async-storage/async-storage`

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
