import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddExtraInfo(): JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [firstName, setFirstName] = useState<string>(
    Array.isArray(params.firstName) ? params.firstName[0] : params.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    Array.isArray(params.lastName) ? params.lastName[0] : params.lastName || ""
  );
  const [dob, setDob] = useState<string>(
    Array.isArray(params.dob) ? params.dob[0] : params.dob || ""
  );
  const [salutation, setSalutation] = useState<string>(
    Array.isArray(params.salutation) ? params.salutation[0] : params.salutation || ""
  );
  const [citizenship, setCitizenship] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("jwt_token");
      if (!token) {
        Alert.alert("Session Expired", "Please log in again.");
        router.replace("/(auth)/login");
      } else {
        setJwtToken(token);
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !dob || !salutation || !citizenship || !destination || !purpose) {
      Alert.alert("Error", "All fields must be filled.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        "https://dev.safeaven.com/api/user/update-profile",
        { firstName, lastName, dob, salutation, citizenship, destination, purpose },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully!");
        router.push("/(app)/Dashboard"); // Replace with the actual next step
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("Profile Update error:", error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Additional Information</Text>

      <TextInput 
        style={styles.input} 
        placeholder="First Name" 
        value={firstName} 
        onChangeText={setFirstName} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Salutation (Mr, Ms, etc.)" 
        value={salutation} 
        onChangeText={setSalutation} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Date of Birth (YYYY-MM-DD)" 
        value={dob} 
        onChangeText={setDob} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Citizenship" 
        value={citizenship} 
        onChangeText={setCitizenship} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Destination" 
        value={destination} 
        onChangeText={setDestination} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Purpose (Study, Work, etc.)" 
        value={purpose} 
        onChangeText={setPurpose} 
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSubmit} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    color: "#333",
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
