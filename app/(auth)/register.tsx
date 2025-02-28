import { useState } from "react";
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

export default function Register(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Email cannot be empty.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://dev.safeaven.com/api/signup/email", { email });

      if (response.status === 200) {
        Alert.alert("Success", "OTP sent to your email.");
        router.push(`/(auth)/VerifyEmail?email=${encodeURIComponent(email)}`);
      } else {
        throw new Error(response.data?.message || "Unexpected error.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Signup Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      // Simulate Google signup (Replace with real Google Auth integration)
      setTimeout(() => {
        setGoogleLoading(false);
        Alert.alert("Success", "Signed up with Google!");
        router.push("/(app)/Dashboard");
      }, 1500);
    } catch (error) {
      console.error("Google Signup error:", error);
      Alert.alert("Signup Failed", "Failed to sign up with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>

      {/* Google Signup Button */}
      <TouchableOpacity
        style={[styles.googleButton, googleLoading && styles.disabledButton]}
        onPress={handleGoogleSignup}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        )}
      </TouchableOpacity>

      {/* OR Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separator} />
      </View>

      {/* Email Signup */}
      <View style={styles.content}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#A1A1A1"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Next</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#555",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 5,
  },
  content: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#555",
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#db4437",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  googleButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
    color: "#555",
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   Platform,
//   KeyboardAvoidingView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import { Snackbar } from "react-native-paper";

// export default function Register(): JSX.Element {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [googleLoading, setGoogleLoading] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");
//   const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
//   const [snackbarColor, setSnackbarColor] = useState<string>("#FF6B00"); // Default orange

//   const showSnackbar = (message: string, color: string = "#FF6B00") => {
//     setSnackbarMessage(message);
//     setSnackbarColor(color);
//     setSnackbarVisible(true);
//   };

//   const handleRegister = async () => {
//     if (!email.trim()) {
//       showSnackbar("Email cannot be empty.", "#DC3545"); // Red for error
//       return;
//     }
//     if (!email.includes("@")) {
//       showSnackbar("Please enter a valid email address.", "red"); // Red for error
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("https://dev.safeaven.com/api/signup/email", { email });

//       if (response.status === 200) {
//         showSnackbar("OTP sent to your email.", "#28A745"); // Green for success
//         setTimeout(() => {
//           router.push(`/(auth)/VerifyEmail?email=${encodeURIComponent(email)}`);
//         }, 1000);

//       } else {
//         throw new Error(response.data?.message || "Unexpected error.");
//       }
//     } catch (error: any) {
//       console.error("Signup error:", error);
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong. Please try again.";
//       showSnackbar(errorMessage, "#eb0e23"); // Red for error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setGoogleLoading(true);
//     try {
//       setTimeout(() => {
//         setGoogleLoading(false);
//         showSnackbar("Signed up with Google!", "#28A745"); // Green for success
//         router.push("/(app)/Dashboard");
//       }, 1500);
//     } catch (error) {
//       console.error("Google Signup error:", error);
//       showSnackbar("Failed to sign up with Google.", "#DC3545"); // Red for error
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   return (

//     <KeyboardAvoidingView
//       behavior={Platform.OS === "android" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.container}>
//         {/* Logo Positioned Higher */}
//         <Image source={require("../../assets/images/icon.png")} style={styles.logo} />

//         {/* Welcome Text */}
//         <Text style={styles.heading}>Let’s Get Started</Text>
//         <Text style={styles.subheading}>Create an account to continue</Text>

//         {/* Email Signup */}
//         <View style={styles.content}>
//           <Text style={styles.label}>Email Address</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="#A1A1A1"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//             editable={!loading}
//           />
//         </View>

//         {/* OR Separator Below Email */}
//         <View style={styles.separatorContainer}>
//           <View style={styles.separator} />
//           <Text style={styles.separatorText}>OR</Text>
//           <View style={styles.separator} />
//         </View>

//         {/* Google Signup Button Below OR */}
//         <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup} disabled={googleLoading}>
//           {googleLoading ? <ActivityIndicator color="white" /> : <Text style={styles.googleButtonText}>Sign up with Google</Text>}
//         </TouchableOpacity>

//         {/* Back & Next Buttons at Bottom */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={loading}>
//             <Text style={styles.backText}>Back</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.nextButton} onPress={handleRegister} disabled={loading}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Next</Text>}
//           </TouchableOpacity>
//         </View>

//         {/* Snackbar for Notifications */}
//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={3000}
//           style={{ backgroundColor: snackbarColor }}
//           action={{
//             label: "OK",
//             onPress: () => setSnackbarVisible(false),
//           }}
//         >
//           {snackbarMessage}
//         </Snackbar>
//       </View>
//     </KeyboardAvoidingView >
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     justifyContent: "center", // Keep content centered (except buttons)
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//     marginTop: 50, // Keep logo higher
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 10,
//     color: "#000",
//   },
//   subheading: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#555",
//     marginBottom: 30,
//   },
//   content: {
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 10, // Move content higher
//   },
//   label: {
//     fontSize: 16,
//     color: "#000",
//     alignSelf: "flex-start",
//     marginBottom: 5,
//     marginLeft: 5,
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#FF6B00",
//     borderRadius: 10,
//     padding: 14,
//     fontSize: 16,
//     backgroundColor: "#fff",
//     color: "#000",
//   },
//   separatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 20,
//   },
//   separator: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#ccc",
//   },
//   separatorText: {
//     marginHorizontal: 10,
//     fontSize: 14,
//     color: "#555",
//   },
//   googleButton: {
//     width: "100%",
//     backgroundColor: "#FF6B00",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 30, // Add space above buttons
//   },
//   googleButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     position: "absolute",
//     bottom: 20, // Keep buttons at the bottom
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     flex: 1,
//     paddingVertical: 10, // Smaller button height
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#FF6B00",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   backText: {
//     fontSize: 16,
//     color: "#FF6B00",
//     fontWeight: "bold",
//   },
//   nextButton: {
//     flex: 1,
//     paddingVertical: 10, // Smaller button height
//     borderRadius: 8,
//     backgroundColor: "#FF6B00",
//     alignItems: "center",
//   },
//   nextText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });