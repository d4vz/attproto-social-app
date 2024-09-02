import AsyncStorage from '@react-native-async-storage/async-storage';

class AppStorage {
  static async saveTokens(
    accessJwt: string,
    refreshJwt: string
  ): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['accessJwt', accessJwt],
        ['refreshJwt', refreshJwt]
      ]);
    } catch (e) {
      console.error('Failed to save tokens', e);
    }
  }

  static async getTokens(): Promise<{
    accessJwt: string | null;
    refreshJwt: string | null;
  }> {
    try {
      const values = await AsyncStorage.multiGet(['accessJwt', 'refreshJwt']);
      return {
        accessJwt: values[0][1],
        refreshJwt: values[1][1]
      };
    } catch (e) {
      console.error('Failed to fetch tokens', e);
      return { accessJwt: null, refreshJwt: null };
    }
  }

  static async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(['accessJwt', 'refreshJwt']);
    } catch (e) {
      console.error('Failed to clear tokens', e);
    }
  }
}

export default AppStorage;
