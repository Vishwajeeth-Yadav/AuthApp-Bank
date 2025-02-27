import { View, Text, StyleSheet } from "react-native";

export default function OtherServices() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Services</Text>
      <Text style={styles.description}>Explore additional financial services we offer.</Text>
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
