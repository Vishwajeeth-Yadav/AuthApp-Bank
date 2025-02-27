import { View, Text, StyleSheet } from "react-native";

export default function BankingAccounts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Banking Accounts</Text>
      <Text style={styles.description}>View and manage your bank accounts securely.</Text>
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
