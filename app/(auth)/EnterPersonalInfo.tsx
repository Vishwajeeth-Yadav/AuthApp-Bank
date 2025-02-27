// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ActivityIndicator
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import axios from "axios";

// export default function EnterPersonalInfo() {
//   const router = useRouter();
//   const [salutation, setSalutation] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [dob, setDob] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [jwtToken, setJwtToken] = useState<string | null>(null);
//   const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem("jwt_token");
//       if (!token) {
//         Alert.alert("Session Expired", "Please log in again.");
//         router.replace("/(auth)/login");
//       } else {
//         setJwtToken(token);
//       }
//       setCheckingAuth(false);
//     };
//     checkAuth();
//   }, []);

//   const handleSubmit = async () => {
//     if (!salutation.trim()) {
//       Alert.alert("Error", "Salutation is required (e.g., Mr, Ms).");
//       return;
//     }
//     if (!firstName.trim()) {
//       Alert.alert("Error", "First name is required.");
//       return;
//     }
//     if (!lastName.trim()) {
//       Alert.alert("Error", "Last name is required.");
//       return;
//     }
//     if (!dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       Alert.alert("Error", "Enter a valid Date of Birth (YYYY-MM-DD).");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://dev.safeaven.com/api/user/personal-info",
//         { salutation, firstName, lastName, dob },
//         { headers: { Authorization: `Bearer ${jwtToken}` } }
//       );

//       if (response.data) {
//         Alert.alert("Success", "Personal information saved.");
//         router.push("/(app)/Dashboard");
//       } else {
//         throw new Error(response.data.message || "Failed to save information.");
//       }
//     } catch (error: any) {
//       console.error("Personal Info Error:", error);
//       const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
//       Alert.alert("Error", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (checkingAuth) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6a1b9a" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Enter Personal Information</Text>
//       <Text style={styles.subText}>Fill in the details below</Text>

//       {/* Input Fields */}
//       <TextInput
//         style={styles.input}
//         placeholder="Salutation (Mr, Ms, etc.)"
//         value={salutation}
//         onChangeText={setSalutation}
//         editable={!loading}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={setFirstName}
//         editable={!loading}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Last Name"
//         value={lastName}
//         onChangeText={setLastName}
//         editable={!loading}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Date of Birth (YYYY-MM-DD)"
//         value={dob}
//         onChangeText={setDob}
//         editable={!loading}
//       />

//       {/* Button Container */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={loading}>
//           <Text style={styles.backText}>Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.nextButton, loading && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Next</Text>}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 20,
//     justifyContent: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 5,
//     color: "#000000",
//   },
//   subText: {
//     fontSize: 16,
//     color: "#6a1b9a",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//     color: "#000000",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   backButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   backText: {
//     fontSize: 16,
//     color: "#4a148c",
//   },
//   nextButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     backgroundColor: "#007bff",
//     alignItems: "center",
//   },
//   disabledButton: {
//     backgroundColor: "#ccc",
//   },
//   nextText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

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
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EnterPersonalInfo(): JSX.Element {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [salutation, setSalutation] = useState<string>("Mr");
  const [dob, setDob] = useState<string>("");
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

  const handleNext = async () => {
    if (!firstName || !lastName || !dob || !salutation) {
      Alert.alert("Error", "All fields must be filled.");
      return;
    }

    setLoading(true);
    try {
       // Replace with actual JWT token from storage/context
      const response = await axios.post(
        "https://dev.safeaven.com/api/user/personal-info",
        { firstName, lastName, dob, salutation },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      if (response.status === 200) {
        router.push({
          pathname: "/(auth)/AddExtraInfo",
          params: { firstName, lastName, dob, salutation },
        });
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("Personal Info error:", error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Personal Information</Text>

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

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Next</Text>}
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
