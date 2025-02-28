import { View, Text } from "react-native";

interface SnackbarProps {
  visible: boolean;
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ visible, message, type, onDismiss }) => {
  if (!visible) return null;

  return (
    <View style={{ backgroundColor: type === "error" ? "red" : "green", padding: 10 }}>
      <Text style={{ color: "white" }}>{message}</Text>
      <Text onPress={onDismiss} style={{ color: "yellow" }}>Dismiss</Text>
    </View>
  );
};

export default Snackbar;
