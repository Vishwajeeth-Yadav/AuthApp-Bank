import { View, Text, StyleSheet } from "react-native";

export default function Insurance() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insurance</Text>
      <Text style={styles.description}>Secure your future with our best insurance plans.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
