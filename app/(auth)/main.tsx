import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useRouter } from "expo-router";

export default function MainPage() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" /> */}
      
      {/* Background Elements */}
      <View style={styles.backgroundTop} />
      <View style={styles.backgroundBottom} />
      <View style={styles.overlayCircle1} />
      <View style={styles.overlayCircle2} />
      <View style={styles.overlayLine} />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Logo & Header */}
        <View style={styles.headerContainer}>
          <Image 
            source={require("../../assets/images/favicon.png")} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.title}>SafeHaven</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>PREMIER BANKING</Text>
          </View>
        </View>

        {/* Motto */}
        <Text style={styles.motto}>Secure. Reliable. Professional.</Text>
      </View>

      {/* Bottom Container with Buttons */}
      <View style={styles.bottomContainer}>
        <View style={styles.cardElement}>
          <View style={styles.cardChip} />
          <Text style={styles.cardText}>Start your financial journey</Text>
        </View>
        
        {/* Buttons */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => router.push("/(auth)/register")}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "auto",
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#1A1A1A"
  },
  backgroundTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "60%",
    backgroundColor: "#1A1A1A",
  },
  backgroundBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
    backgroundColor: "#FFFFFF",
  },
  overlayCircle1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 0, 0.3)",
    top: -200,
    right: -100,
  },
  overlayCircle2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 0, 0.3)",
    top: -120,
    right: -50,
  },
  overlayLine: {
    position: "absolute",
    width: "150%",
    height: 1,
    backgroundColor: "rgba(255, 107, 0, 0.5)",
    top: "60%",
    left: "-25%",
    transform: [{ rotate: "-10deg" }],
  },
  contentContainer: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  headerContainer: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    tintColor: "#FF6B00"
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  taglineContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#FF6B00",
    borderRadius: 4,
    marginTop: 10,
  },
  tagline: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  motto: {
    fontSize: 16,
    fontWeight: "400",
    color: "#CCCCCC",
    marginTop: 30,
    textAlign: "center",
  },
  bottomContainer: {
    height: "40%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "flex-end",
  },
  cardElement: {
    width: "100%",
    height: 70,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    marginBottom: 25,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  cardChip: {
    width: 30,
    height: 20,
    backgroundColor: "#FF6B00",
    borderRadius: 4,
    marginRight: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  loginButton: {
    width: "100%",
    height: 58,
    backgroundColor: "#FF6B00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  registerButton: {
    width: "100%",
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 1,
  },
});