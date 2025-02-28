// import { useState, useEffect } from "react";
// import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Avatar, Button, ActivityIndicator, Snackbar, Text, FAB } from "react-native-paper";
// import ProfilePictureModal from "../profile/ProFilePictureModal";

// const Profile = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" });
//   const router = useRouter();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const jwt_token = await AsyncStorage.getItem("jwt_token");
//       if (!jwt_token) throw new Error("User not authenticated");

//       const response = await fetch("https://dev.safeaven.com/api/user/me", {
//         headers: { Authorization: `Bearer ${jwt_token}` },
//       });

//       const data = await response.json();
//       if (!data.user) throw new Error("Invalid user data format");

//       setUserData(data.user);
//     } catch (error) {
//       console.error("Profile Fetch Error:", error);
//       setSnackbar({ visible: true, message: "Failed to load profile", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = (newImageUrl: string) => {
//     setUserData((prev: any) => ({ ...prev, profilePicture: newImageUrl }));
//   };

//   if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Profile Header Section */}
//          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileContainer}>
//         <Avatar.Image 
//           size={110} 
//           source={{ uri: userData?.profilePicture || "https://avatar.iran.liara.run/public/boy" }} 
//           style={styles.avatar} 
//         />
//          <Text style={styles.userName}>{userData?.firstname} {userData?.lastname}</Text>
//          <Text style={styles.emailText}>✉ Email: {userData?.email}</Text>
//       </TouchableOpacity>

//       {/* User Information Section */}
//       <View style={styles.infoContainer}>
//         <InfoItem label="📞 Mobile" value={userData?.mobile} />
//         <InfoItem label="🌍 Citizenship" value={userData?.citizenship} />
//         <InfoItem label="🏠 Country" value={userData?.destination} />
//         <InfoItem label="🎯 Purpose" value={userData?.purpose} />
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.buttonsContainer}>
//         <Button mode="contained" onPress={() => router.push("../profile/ChangePassword")} style={styles.button}>
//           Change Password
//         </Button>
//         <Button mode="contained" onPress={() => router.push("../profile/ChangeEmail")} style={styles.button}>
//           Change Email
//         </Button>
//         <Button mode="contained" onPress={() => router.push("../profile/ChangeMobile")} style={styles.button}>
//           Change Mobile
//         </Button>
//       </View>

//       {/* Floating Upload Profile Button */}
//       <FAB 
//         icon="camera"
//         style={styles.fab}
//         onPress={() => setModalVisible(true)}
//         label="Change Picture"
//       />

//       {/* Profile Picture Modal */}
//       <ProfilePictureModal 
//         visible={modalVisible} 
//         onClose={() => setModalVisible(false)} 
//         onUploadSuccess={handleProfileUpdate} 
//       />

//       {/* Snackbar Alerts */}
//       <Snackbar 
//         visible={snackbar.visible} 
//         onDismiss={() => setSnackbar({ ...snackbar, visible: false })} 
//         style={snackbar.type === "error" ? styles.snackbarError : styles.snackbarSuccess}
//       >
//         {snackbar.message}
//       </Snackbar>
//     </ScrollView>
//   );
// };

// // Reusable Info Item Component
// const InfoItem = ({ label, value }: { label: string; value: string }) => (
//   <View style={styles.infoItem}>
//     <Text style={styles.infoLabel}>{label}</Text>
//     <Text style={styles.infoValue}>{value || "N/A"}</Text>
//   </View>
// );

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#F5F5F5",
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileContainer: {
//     alignItems: "center",
//     paddingVertical: 30,
//     backgroundColor: "#6200EE",
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   // profileHeader: {
//   //   alignItems: "center",
//   //   paddingVertical: 30,
//   //   backgroundColor: "#6200EE",
//   //   borderRadius: 15,
//   //   marginBottom: 20,
//   // },
//   avatar: {
//     backgroundColor: "#EEE",
//     borderWidth: 2,
//     borderColor: "#FFF",
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#FFF",
//     marginTop: 10,
//   },
//   emailText: {
//     fontSize: 16,
//     color: "#FFF",
//   },
//   infoContainer: {
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     padding: 15,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   infoItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#DDD",
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   infoValue: {
//     fontSize: 16,
//     color: "#555",
//   },
//   buttonsContainer: {
//     marginTop: 10,
//   },
//   button: {
//     marginVertical: 5,
//     backgroundColor: "#6200EE",
//     borderRadius: 5,
//   },
//   fab: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//     backgroundColor: "#6200EE",
//   },
//   snackbarError: {
//     backgroundColor: "#D32F2F",
//   },
//   snackbarSuccess: {
//     backgroundColor: "#388E3C",
//   },
// });


import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, ActivityIndicator, Snackbar, Text } from "react-native-paper";
import ProfilePictureModal from "../profile/ProfilePictureModal";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" });
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const jwt_token = await AsyncStorage.getItem("jwt_token");
      if (!jwt_token) throw new Error("User not authenticated");

      const response = await fetch("https://dev.safeaven.com/api/user/me", {
        headers: { Authorization: `Bearer ${jwt_token}` },
      });

      const data = await response.json();
      if (!data.user) throw new Error("Invalid user data format");

      setUserData(data.user);
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      setSnackbar({ visible: true, message: "Failed to load profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (newImageUrl: string) => {
    setUserData((prev: any) => ({ ...prev, profilePicture: newImageUrl }));
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar.Image 
            size={110} 
            source={{ uri: userData?.profilePicture || "https://avatar.iran.liara.run/public/boy" }} 
            style={styles.avatar} 
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{userData?.firstname} {userData?.lastname}</Text>
        <Text style={styles.emailText}>✉ {userData?.email}</Text>
      </View>

      {/* User Information Section */}
      <View style={styles.infoContainer}>
        <InfoItem label="📞 Mobile" value={userData?.mobile} />
        <InfoItem label="🌍 Citizenship" value={userData?.citizenship} />
        <InfoItem label="🏠 Country" value={userData?.destination} />
        <InfoItem label="🎯 Purpose" value={userData?.purpose} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <Button mode="contained" onPress={() => router.push("../profile/ChangePassword")} style={styles.button}>
          Change Password
        </Button>
        <Button mode="contained" onPress={() => router.push("../profile/ChangeEmail")} style={styles.button}>
          Change Email
        </Button>
        <Button mode="contained" onPress={() => router.push("../profile/ChangeMobile")} style={styles.button}>
          Change Mobile
        </Button>
      </View>

      {/* Profile Picture Modal */}
      <ProfilePictureModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onUploadSuccess={handleProfileUpdate} 
      />

      {/* Snackbar Alerts */}
      <Snackbar 
        visible={snackbar.visible} 
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })} 
        style={snackbar.type === "error" ? styles.snackbarError : styles.snackbarSuccess}
      >
        {snackbar.message}
      </Snackbar>
    </ScrollView>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || "N/A"}</Text>
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FF8500", // Orange Accent
    borderRadius: 15,
    marginBottom: 20,
    borderColor:"black",
    borderTopWidth:5,
    borderLeftWidth:5,
    borderRightWidth:1.5
  },
  avatar: {
    backgroundColor: "#EEE",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop:10,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    marginHorizontal:10,
    marginVertical: 5,
    backgroundColor: "#FF8500", // Orange Accent
    borderRadius: 10,
  },
  snackbarError: {
    backgroundColor: "#D32F2F",
  },
  snackbarSuccess: {
    backgroundColor: "#388E3C",
  },
});

