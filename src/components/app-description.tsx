import { StyleSheet, Text } from 'react-native';

export function AppDescription() {
  return (
    <Text style={styles.description}>
      Envie uma foto ou arquivo para começar.
    </Text>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
  },
});
