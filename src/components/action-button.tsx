import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
  label: string;
  testID?: string;
};

export function ActionButton({
  label,
  testID,
}: ActionButtonProps) {
  return (
    <Pressable
      style={styles.button}
      testID={testID}
    >
      <Text style={styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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