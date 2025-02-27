import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type DashboardCardProps = {
  title?: string;
  value?: string | number;
  icon?: keyof typeof MaterialIcons.glyphMap;
  color?: string;
};

export default function DashboardCard({
  title = "Title",
  value = "0",
  icon = "info",
  color = "#007bff",
}: DashboardCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <MaterialIcons name={icon} size={32} color="#fff" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginHorizontal: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
