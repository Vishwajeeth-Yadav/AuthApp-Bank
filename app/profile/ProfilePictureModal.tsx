import { View, Text, Modal, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfilePictureModalProps {
  visible: boolean;
  onClose: () => void;
  onUploadSuccess: (newImageUrl: string) => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({ visible, onClose, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadProfilePicture(result.assets[0].uri);
    }
  };

  const uploadProfilePicture = async (imageUri: string) => {
    try {
      setUploading(true);
      const jwt_token = await AsyncStorage.getItem("jwt_token");
      if (!jwt_token) throw new Error("User not authenticated");

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch("https://dev.safeaven.com/api/user/upload-pic", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt_token}`, "Content-Type": "multipart/form-data" },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        onUploadSuccess(result.imageUrl); // Update profile picture in Profile.tsx
        onClose();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload Failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteProfilePicture = async () => {
    try {
      setDeleting(true);
      const jwt_token = await AsyncStorage.getItem("jwt_token");
      if (!jwt_token) throw new Error("User not authenticated");

      const response = await fetch("https://dev.safeaven.com/api/user/delete-pic", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt_token}` },
      });

      const result = await response.json();
      if (result) {
        onUploadSuccess("https://avatar.iran.liara.run/public/boy"); // Reset to default image
        onClose();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Delete Failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Profile Picture</Text>
          <Button mode="contained" onPress={pickImage} loading={uploading} disabled={uploading} style={styles.button}>
            Choose Image
          </Button>
          <Button 
            mode="contained" 
            onPress={deleteProfilePicture} 
            loading={deleting} 
            disabled={deleting} 
            style={styles.deleteButton}
          >
            Delete Picture
          </Button>
          <Button onPress={onClose} style={styles.closeButton}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePictureModal;

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  button: { width: "100%", marginVertical: 5 },
  deleteButton: { backgroundColor: "red", width: "100%", marginVertical: 5 },
  closeButton: { marginTop: 10 },
});
