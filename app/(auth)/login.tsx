

// import { useState } from "react";
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
// import { checkUserProgress } from "./utils/checkUserProgress";

// export default function Login(): JSX.Element {
//   const router = useRouter();
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [googleLoading, setGoogleLoading] = useState<boolean>(false);

//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       Alert.alert("Error", "Email and password cannot be empty.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("https://dev.safeaven.com/api/login", { email, password });

//       if (response.status === 200 && response.data.jwt) {
//         const token = response.data.jwt;
//         await AsyncStorage.setItem("jwt_token", token); // Store JWT token
//         Alert.alert("Success", "Login Successful!");
//         await checkUserProgress(token)
//       } else {
//         throw new Error("Invalid response from server.");
//       }
//     } catch (error: any) {
//       console.error("Login error:", error);
//       const errorMessage =
//         error.response?.data?.message || "An unexpected error occurred. Please try again.";
//       Alert.alert("Login Failed", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setGoogleLoading(true);
//     try {
//       // Simulate Google login process (Replace with actual Google Auth integration)
//       setTimeout(async () => {
//         const fakeToken = "google-auth-token-123"; // Mock token
//         await AsyncStorage.setItem("jwt_token", fakeToken); // Store JWT token
//         setGoogleLoading(false);
//         Alert.alert("Success", "Logged in with Google!");
//         router.push("/(app)/Dashboard");
//       }, 1500);
//     } catch (error) {
//       console.error("Google Login error:", error);
//       Alert.alert("Login Failed", "Failed to login with Google.");
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Email"
//         placeholderTextColor="#A1A1A1"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Password"
//         placeholderTextColor="#A1A1A1"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity 
//         style={[styles.button, loading && styles.buttonDisabled]} 
//         onPress={handleLogin} 
//         disabled={loading}
//       >
//         {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerContainer}>
//         <Text style={styles.registerText}>Don't have an account? Register</Text>
//       </TouchableOpacity>

//       {/* OR Separator */}
//       <View style={styles.separatorContainer}>
//         <View style={styles.separator} />
//         <Text style={styles.separatorText}>OR</Text>
//         <View style={styles.separator} />
//       </View>

//       {/* Google Login Button */}
//       <TouchableOpacity 
//         style={[styles.googleButton, googleLoading && styles.buttonDisabled]} 
//         onPress={handleGoogleLogin} 
//         disabled={googleLoading}
//       >
//         {googleLoading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={styles.googleButtonText}>Login with Google</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     backgroundColor: "#fff",
//     color: "#333",
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#007bff",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   registerContainer: {
//     marginTop: 15,
//   },
//   registerText: {
//     color: "#007bff",
//     fontSize: 16,
//   },
//   separatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//     width: "100%",
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
//     backgroundColor: "#db4437",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   googleButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });


import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUserProgress } from "./utils/checkUserProgress";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  // Google Sign-In Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "",
  });

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      
      const res = await axios.post("https://dev.safeaven.com/api/login", { email, password });
      if (res.status === 200) {
        await AsyncStorage.setItem("jwt_token", res.data.jwt);
        Alert.alert("Success", "Login Successful!");
        await checkUserProgress(res.data.jwt)
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred. Please try again.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await promptAsync();
      if (result?.type === "success") {
        console.log("Google Login Success:", result);

        const googleToken = result.authentication?.accessToken;
        const userInfo = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${googleToken}` },
        }).then((res) => res.json());

        console.log("Google User Info:", userInfo);

        // Send Google user info to backend for verification
        const response = await axios.post("https://dev.safeaven.com/api/google-login", {
          email: userInfo.email,
          name: userInfo.name,
          googleId: userInfo.id,
        });

        if (response.status === 200) {
          const token = response.data.token;
          await AsyncStorage.setItem("jwt_token", token);
          Alert.alert("Success", "Logged in with Google!");
          await checkUserProgress(token)
        } else {
          throw new Error("Unexpected response from server.");
        }
      } else {
        console.log("Google Login Cancelled:", result);
        Alert.alert("Login Failed", "Google sign-in was cancelled.");
      }
    } catch (error) {
      console.error("Google Login error:", error);
      Alert.alert("Login Failed", "Failed to login with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>SafeHaven</Text>
        <Text style={styles.headerSubtitle}>Secure Banking</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Welcome Back</Text>
        <Text style={styles.formSubtitle}>Sign in to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A1A1A1"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A1A1A1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separator} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          style={[styles.googleButton, googleLoading && styles.buttonDisabled]}
          onPress={handleGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View style={styles.googleButtonContent}>
              <Image source={require("../../assets/images/react-logo.png")} style={styles.googleLogo} />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: "#FF6B00",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#1A1A1A",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  registerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "#FF6B00",
    fontWeight: "600",
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
    backgroundColor: "#E0E0E0",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#666",
  },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "600",
  },
});