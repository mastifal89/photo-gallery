import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

export default function GalleryScreen({ capturedPhotos }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImageModal = (uri, index) => {
    setSelectedImage(uri);
    setSelectedIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  const renderItem = ({ item, index }) => (
    <Image
      source={{ uri: item }}
      style={styles.fullScreenImage}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={capturedPhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openImageModal(item, index)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      {/* Modal for displaying the full-screen image */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="slide"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={capturedPhotos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            getItemLayout={(data, index) => ({
              length: Dimensions.get("window").width,
              offset: Dimensions.get("window").width * index,
              index,
            })}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});