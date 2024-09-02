import { View } from 'tamagui';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Timeline } from '../components/timeline';

export default function HomePage() {
  return (
    <SafeAreaView>
      <View p="$4" display="flex" gap="$4">
        <Timeline />
      </View>
    </SafeAreaView>
  );
}
