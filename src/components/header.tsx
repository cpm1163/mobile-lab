import { StyleSheet, Text, View } from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Doc AI
      </Text>

      <Text style={styles.subtitle}>
        Analise documentos com inteligência artificial
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
  },
});
