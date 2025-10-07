import React from 'react';
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PermissionModal = ({showModal, setShowModal}) => {
  const handleOpenSettings = async () => {
    try {
      Linking.openSettings();
    } catch (error) {
      console.warn('Unable to open settings:', error);
    }
  };

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Notification बंद आहेत</Text>
          <Text style={styles.modalMessage}>
            महत्वाची माहिती मिळवण्यासाठी Notification परवानगी आवश्यक आहे.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowModal(false)}>
              <Text style={styles.closeText}>बंद करा</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.settingsButton]}
              onPress={handleOpenSettings}>
              <Text style={styles.settingsText}>परवानगी द्या</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 50,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: '#ccc',
  },
  settingsButton: {
    backgroundColor: '#FF7A00',
  },
  closeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PermissionModal;
