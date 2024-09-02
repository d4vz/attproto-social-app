import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, Input, Text, View } from 'tamagui';
import { useAppNavigation } from '../hooks/use-app-navigation';
import AuthService from '../services/auth-service';
import AppStorage from '../utils/storage';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(identifier, password);
      const { accessJwt, refreshJwt } = response;
      await AppStorage.saveTokens(accessJwt, refreshJwt);
      navigation.navigate('Home');
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        setError('Erro ao fazer login, tente novamente mais tarde');
        return;
      }

      if (err.response?.status === 401) {
        setError('Usuário ou senha incorretos');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const { accessJwt } = await AppStorage.getTokens();

      if (accessJwt) {
        navigation.navigate('Home');
      } else {
        await AppStorage.clearTokens();
      }
    };

    fetchToken();
  }, []);

  return (
    <View
      display="flex"
      alignItems="center"
      h="100%"
      justifyContent="center"
      p="$8"
      gap="$4"
    >
      <Text fontSize={24} fontWeight="bold" textTransform="uppercase">
        Seja bem-vindo
        <Text color="$accentColor">!</Text>
      </Text>

      <Input
        width="100%"
        placeholder="Handle ou Email"
        value={identifier}
        onChangeText={setIdentifier}
      />

      <Input
        width="100%"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text color="$red10Light">{error}</Text> : null}

      <Button backgroundColor="$accentColor" width="100%" onPress={handleLogin}>
        {isLoading ? <ActivityIndicator /> : 'Entrar'}
      </Button>
    </View>
  );
}
