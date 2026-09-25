import {
  StyleSheet,
  View,
} from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppDescription } from '@/components/app-description';
import { Header } from '@/components/header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <AppDescription />

      <ActionButton
        label="Tirar foto"
        testID="camera-button"
      />

      <ActionButton
        label="Selecionar arquivo"
        testID="file-button"
      />
      <ActionButton label="Histórico" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});
