import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { X, Save } from "lucide-react-native";

interface NoteModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
  jobId: string;
}

const NoteModal = ({
  visible,
  onClose,
  onSave,
  initialNote = "",
  jobId,
}: NoteModalProps) => {
  const [note, setNote] = useState(initialNote);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-[90%] rounded-xl p-5 shadow-xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Job Notes</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 mb-2">Job ID: {jobId}</Text>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Add your notes</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 min-h-[120px]"
              placeholder="Enter notes about this job..."
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-lg flex-row items-center justify-center"
            onPress={handleSave}
          >
            <Save size={18} color="white" />
            <Text className="text-white font-bold ml-2">Save Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;
