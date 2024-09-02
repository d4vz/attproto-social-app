import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './root-navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    return;
  }

  console.log('Navigation not ready, waiting...');
}
