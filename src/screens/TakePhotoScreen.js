import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Modal from "react-native-modal";
import { useIsFocused } from "@react-navigation/native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function TakePhotoScreen({ setCapturedPhotos, navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(uri);
        setPreviewPhoto(uri);
        togglePreviewModal();
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

  const togglePreviewModal = () => {
    setPreviewVisible(!isPreviewVisible);
  };

  const confirmPhoto = () => {
    setCapturedPhotos((oldValue) => [...oldValue, capturedPhoto]);
    setCapturedPhoto(null);
    setPreviewPhoto(null);
    togglePreviewModal();
  };

  const cancelPhoto = () => {
    setCapturedPhoto(null);
    setPreviewPhoto(null);
    togglePreviewModal();
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Gallery")}>
              <MaterialCommunityIcons name="cancel" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <MaterialIcons name="camera" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Ionicons
                name="md-camera-reverse-outline"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <Modal isVisible={isPreviewVisible}>
        <ImageBackground
          source={{ uri: previewPhoto }}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmPhoto}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelPhoto}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
