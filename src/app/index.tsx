import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Doc AI
      </Text>

      <Text style={styles.subtitle}>
        Analise documentos com inteligência artificial
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Tirar foto
        </Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Selecionar arquivo
        </Text>
      </Pressable>
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

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
  },

  button: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});