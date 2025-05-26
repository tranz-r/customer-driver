import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { Image as RNImage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera as CameraIcon,
  Upload,
  ArrowRight,
  Check,
  X,
  CreditCard,
  MapPin,
  Route,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Video,
  Building,
  Mail,
  Lock,
  User,
  Bank,
} from "lucide-react-native";
import { useRouter, useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  mockDetectedItems,
  mockQuote,
  mockRouteDetails,
  mockAuthentication,
  mockCreateJob,
  mockMediaUpload,
} from "../utils/mockData";

const CreateJobScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedMedia, setUploadedMedia] = useState([
    {
      id: 1,
      type: "image",
      uri: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&q=80",
    },
    {
      id: 2,
      type: "video",
      uri: "https://images.unsplash.com/photo-1558997519-83c9716b1b07?w=400&q=80",
    },
  ]);
  const [detectedItems, setDetectedItems] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showDetectedItemsSection, setShowDetectedItemsSection] =
    useState(false);
  const [originPostcode, setOriginPostcode] = useState("");
  const [destinationPostcode, setDestinationPostcode] = useState("");
  const [routeDetails, setRouteDetails] = useState(mockRouteDetails);
  const [quote, setQuote] = useState(mockQuote);

  // Item editing state
  const [editingItem, setEditingItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDimensions, setItemDimensions] = useState("");
  const [itemVolume, setItemVolume] = useState("");
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [itemsModified, setItemsModified] = useState(false);

  // Authentication state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [jobId, setJobId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Only show auth modal before payment step
    if (currentStep === 3) {
      // Show auth modal before proceeding to payment
      setShowAuthModal(true);
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle payment completion
      processPayment();
    }
  };

  const processPayment = () => {
    // Simulate payment processing
    setIsLoggingIn(true);

    // Use mock job creation function
    const jobDetails = {
      items: detectedItems,
      origin: originPostcode,
      destination: destinationPostcode,
      quote: quote,
      paymentMethod: paymentMethod,
    };

    mockCreateJob(jobDetails, (jobId) => {
      setIsLoggingIn(false);
      setJobId(jobId);
      setShowSuccessModal(true);
    });
  };

  const handleCompleteBooking = () => {
    setShowSuccessModal(false);
    router.push("/customer/dashboard");
  };

  const handlePreviousStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const handleMediaUpload = (type) => {
    // In a real implementation, this would open the camera or gallery
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Use mock media upload function
    const newMedia = mockMediaUpload(type);
    setUploadedMedia([...uploadedMedia, newMedia]);
  };

  const handleRemoveMedia = (id) => {
    setUploadedMedia(uploadedMedia.filter((media) => media.id !== id));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemDimensions(item.dimensions);
    setItemVolume(item.volume);
    setIsAddingNewItem(false);
    setShowItemModal(true);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setItemName("");
    setItemDimensions("");
    setItemVolume("");
    setIsAddingNewItem(true);
    setShowItemModal(true);
  };

  const handleSaveItem = () => {
    if (!itemName || !itemDimensions || !itemVolume) {
      Alert.alert("Missing Information", "Please fill in all item details");
      return;
    }

    if (isAddingNewItem) {
      // Add new item
      const newId =
        detectedItems.length > 0
          ? Math.max(...detectedItems.map((item) => item.id)) + 1
          : 1;
      const newItem = {
        id: newId,
        name: itemName,
        dimensions: itemDimensions,
        volume: itemVolume,
      };
      setDetectedItems([...detectedItems, newItem]);
    } else {
      // Update existing item
      setDetectedItems(
        detectedItems.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: itemName,
                dimensions: itemDimensions,
                volume: itemVolume,
              }
            : item,
        ),
      );
    }

    setItemsModified(true);
    setShowItemModal(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success);
  };

  const handleDeleteItem = () => {
    if (!isAddingNewItem && editingItem) {
      setDetectedItems(
        detectedItems.filter((item) => item.id !== editingItem.id),
      );
      setItemsModified(true);
      setShowItemModal(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const recalculateQuote = () => {
    // In a real app, this would recalculate based on the items
    // For now, we'll just simulate a recalculation
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Calculate total volume
    const totalVolume = detectedItems
      .reduce((sum, item) => {
        const volumeValue = parseFloat(item.volume.replace("m³", ""));
        return sum + (isNaN(volumeValue) ? 0 : volumeValue);
      }, 0)
      .toFixed(2);

    // Update quote with new calculations
    const estimatedHours = Math.max(2, Math.ceil(totalVolume / 0.8));
    const totalPrice = estimatedHours * quote.hourlyRate;

    setQuote({
      ...quote,
      totalVolume: `${totalVolume}m³`,
      estimatedHours,
      totalPrice,
    });

    setItemsModified(false);
    Alert.alert(
      "Quote Updated",
      "Your quote has been recalculated based on your changes.",
    );
  };

  const handleAuth = () => {
    setIsLoggingIn(true);
    // Use mock authentication function
    mockAuthentication(email, password, (success) => {
      setIsLoggingIn(false);
      if (success) {
        setShowAuthModal(false);
        // Proceed to payment step
        setCurrentStep(4);
      } else {
        // For prototyping, we'll just log the error and still allow login
        console.log(
          "Authentication would fail in production, but allowing for prototype",
        );
        setShowAuthModal(false);
        setCurrentStep(4);
      }
    });
  };

  const renderStepIndicator = () => {
    return (
      <View className="flex-row justify-center items-center mb-6 mt-2">
        {[1, 2, 3, 4].map((step) => (
          <View key={step} className="flex-row items-center">
            <View
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= step ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <Text className="text-white font-bold">{step}</Text>
            </View>
            {step < 4 && (
              <View
                className={`h-1 w-10 ${currentStep > step ? "bg-blue-500" : "bg-gray-300"}`}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderMediaUploadStep = () => {
    return (
      <View className="flex-1">
        <Text className="text-xl font-bold mb-4">Upload Media</Text>
        <Text className="text-gray-600 mb-6">
          Please upload photos or videos of the items you need to move. Make
          sure to include an A4 sheet of paper in at least one image for scale
          reference.
        </Text>

        <View className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
          <Text className="text-sm text-blue-800 font-medium mb-2">
            📋 A4 Reference Sheet Required
          </Text>
          <Text className="text-sm text-blue-700">
            Place a standard A4 paper sheet (210 × 297 mm) visibly in at least
            one photo or video to help our AI accurately estimate the size of
            your items.
          </Text>
        </View>

        <Text className="font-medium text-gray-800 mb-3">Your Media</Text>
        <View className="flex-row flex-wrap gap-4 mb-6">
          {uploadedMedia.map((media) => (
            <View key={media.id} className="relative">
              <RNImage
                source={{ uri: media.uri }}
                style={{ width: 112, height: 112, borderRadius: 12 }}
              />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1.5"
                onPress={() => handleRemoveMedia(media.id)}
              >
                <X size={16} color="white" />
              </TouchableOpacity>
              {media.type === "video" && (
                <View className="absolute bottom-2 right-2 bg-black bg-opacity-60 rounded-full p-1.5">
                  <Video size={16} color="white" />
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300"
            onPress={() => handleMediaUpload("image")}
          >
            <Upload size={24} color="#6b7280" />
            <Text className="text-gray-600 text-sm mt-2">Add Media</Text>
          </TouchableOpacity>
        </View>

        {showDetectedItemsSection && (
          <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="font-bold text-lg">Detected Items</Text>
              <TouchableOpacity
                className="bg-blue-100 p-2 rounded-lg"
                onPress={handleAddNewItem}
              >
                <Plus size={18} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            {detectedItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row justify-between items-center p-4 border-b border-gray-100"
                onPress={() => handleEditItem(item)}
              >
                <View className="flex-1">
                  <Text className="font-medium">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">
                    {item.dimensions}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-700 mr-3">{item.volume}</Text>
                  <Edit2 size={16} color="#6b7280" />
                </View>
              </TouchableOpacity>
            ))}

            {detectedItems.length === 0 && (
              <View className="p-6 items-center">
                <Text className="text-gray-500 text-center">
                  No items detected yet
                </Text>
                <Text className="text-gray-400 text-center text-sm mt-1">
                  Tap the + button to add items manually
                </Text>
              </View>
            )}
          </View>
        )}

        <Text className="font-medium text-gray-800 mb-3">
          Capture New Media
        </Text>
        <View className="flex-row gap-4 mb-4">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-blue-600 py-4 rounded-xl shadow-sm"
            onPress={() => handleMediaUpload("image")}
          >
            <CameraIcon size={20} color="#fff" />
            <Text className="ml-2 font-medium text-white">Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-purple-600 py-4 rounded-xl shadow-sm"
            onPress={() => handleMediaUpload("video")}
          >
            <Video size={20} color="#fff" />
            <Text className="ml-2 font-medium text-white">Record Video</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-green-600 py-4 rounded-xl shadow-sm mt-4 mb-6"
          onPress={() => {
            if (uploadedMedia.length === 0) {
              Alert.alert(
                "No Media",
                "Please upload at least one photo or video before submitting for detection.",
              );
              return;
            }
            setIsDetecting(true);
            // Simulate API call with a timeout
            setTimeout(() => {
              setDetectedItems(mockDetectedItems);
              setIsDetecting(false);
              setShowDetectedItemsSection(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success);
            }, 3000);
          }}
          disabled={isDetecting}
        >
          {isDetecting ? (
            <>
              <RefreshCw
                size={20}
                color="#fff"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
              <Text className="ml-2 font-medium text-white">
                Detecting Items...
              </Text>
            </>
          ) : (
            <>
              <CameraIcon size={20} color="#fff" />
              <Text className="ml-2 font-medium text-white">
                Submit for Item Detection
              </Text>
            </>
          )}
        </TouchableOpacity>

        {isDetecting && (
          <View className="items-center mb-6">
            <Text className="text-gray-600 mb-2">
              Our AI is analyzing your media...
            </Text>
            <View className="flex-row items-center">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className="h-2 w-2 rounded-full bg-blue-500 mx-1"
                  style={{
                    opacity: 0.6,
                    transform: [{ scale: 1 }],
                  }}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderLocationStep = () => {
    return (
      <View className="flex-1">
        <Text className="text-xl font-bold mb-4">Enter Location Details</Text>
        <Text className="text-gray-600 mb-6">
          Please provide the pickup and delivery postcodes for your move.
        </Text>

        <View className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
          <View className="mb-4">
            <Text className="font-medium mb-2">Origin Postcode</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <MapPin size={20} color="#4b5563" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="e.g. SW1A 1AA"
                value={originPostcode}
                onChangeText={setOriginPostcode}
              />
            </View>
          </View>

          <View>
            <Text className="font-medium mb-2">Destination Postcode</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <MapPin size={20} color="#4b5563" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="e.g. E1 6AN"
                value={destinationPostcode}
                onChangeText={setDestinationPostcode}
              />
            </View>
          </View>
        </View>

        {/* Map View */}
        <View className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
          <RNImage
            source={{
              uri: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&q=80",
            }}
            style={{ width: "100%", height: 160 }}
          />
          <View className="p-4">
            <View className="flex-row items-center mb-2">
              <Route size={18} color="#4b5563" />
              <Text className="font-medium ml-2">Route Details</Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Distance:</Text>
              <Text className="font-medium">{routeDetails.distance}</Text>
            </View>

            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Estimated Drive Time:</Text>
              <Text className="font-medium">{routeDetails.duration}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Traffic:</Text>
              <Text className="font-medium">
                {routeDetails.trafficCondition}
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-sm text-gray-500 italic">
          Note: Distance and traffic conditions may affect the final quote.
        </Text>
      </View>
    );
  };

  const renderQuoteReviewStep = () => {
    return (
      <View className="flex-1">
        <Text className="text-xl font-bold mb-4">Review Quote</Text>
        <Text className="text-gray-600 mb-6">
          Our AI has analyzed your uploads and detected the following items.
        </Text>

        <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg">Detected Items</Text>
          </View>

          {detectedItems.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center p-4 border-b border-gray-100"
            >
              <View className="flex-1">
                <Text className="font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-xs">{item.dimensions}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-700">{item.volume}</Text>
              </View>
            </View>
          ))}

          {detectedItems.length === 0 && (
            <View className="p-6 items-center">
              <Text className="text-gray-500 text-center">
                No items detected
              </Text>
              <Text className="text-gray-400 text-center text-sm mt-1">
                Please go back to the media upload step to add items
              </Text>
            </View>
          )}
        </View>

        {itemsModified && (
          <TouchableOpacity
            className="bg-green-600 py-3 px-4 rounded-xl flex-row items-center justify-center mb-6 shadow-sm"
            onPress={recalculateQuote}
          >
            <RefreshCw size={18} color="#fff" />
            <Text className="text-white font-medium ml-2">
              Recalculate Quote
            </Text>
          </TouchableOpacity>
        )}

        <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg">Route Information</Text>
          </View>
          <View className="p-4">
            <View className="flex-row justify-between mb-3">
              <View className="flex-row items-center">
                <MapPin size={16} color="#4b5563" className="mr-2" />
                <Text className="text-gray-700">Origin:</Text>
              </View>
              <Text className="font-medium">
                {originPostcode || "Not specified"}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <View className="flex-row items-center">
                <MapPin size={16} color="#4b5563" className="mr-2" />
                <Text className="text-gray-700">Destination:</Text>
              </View>
              <Text className="font-medium">
                {destinationPostcode || "Not specified"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Route size={16} color="#4b5563" className="mr-2" />
                <Text className="text-gray-700">Distance:</Text>
              </View>
              <Text className="font-medium">{routeDetails.distance}</Text>
            </View>
          </View>
        </View>

        <View className="bg-blue-50 p-5 rounded-xl mb-6 border border-blue-100 shadow-sm">
          <Text className="font-bold text-lg mb-3 text-blue-900">
            Quote Summary
          </Text>
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-700">Total Volume:</Text>
            <Text className="font-bold">{quote.totalVolume}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-700">Estimated Hours:</Text>
            <Text className="font-bold">{quote.estimatedHours} hours</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-700">Hourly Rate:</Text>
            <Text className="font-bold">£{quote.hourlyRate}</Text>
          </View>
          <View className="border-t border-blue-200 my-3" />
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-bold">Total Price:</Text>
            <Text className="font-bold text-xl text-blue-700">
              £{quote.totalPrice}
            </Text>
          </View>
          <Text className="text-sm text-blue-700 mt-2">{quote.insurance}</Text>
        </View>

        {/* Item Edit Modal */}
        <Modal visible={showItemModal} transparent={true} animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white w-[90%] rounded-xl p-5 shadow-xl">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">
                  {isAddingNewItem ? "Add New Item" : "Edit Item"}
                </Text>
                <TouchableOpacity onPress={() => setShowItemModal(false)}>
                  <X size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Item Name</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="e.g. Sofa, Table, Chair"
                  value={itemName}
                  onChangeText={setItemName}
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Dimensions (LxWxH)</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="e.g. 200x90x85cm"
                  value={itemDimensions}
                  onChangeText={setItemDimensions}
                />
              </View>

              <View className="mb-6">
                <Text className="text-gray-700 mb-2">Volume</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="e.g. 1.53m³"
                  value={itemVolume}
                  onChangeText={setItemVolume}
                />
              </View>

              <View className="flex-row gap-3">
                {!isAddingNewItem && (
                  <TouchableOpacity
                    className="flex-1 bg-red-500 py-3 rounded-lg flex-row items-center justify-center"
                    onPress={handleDeleteItem}
                  >
                    <Trash2 size={18} color="white" />
                    <Text className="text-white font-bold ml-2">Delete</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  className="flex-1 bg-blue-600 py-3 rounded-lg"
                  onPress={handleSaveItem}
                >
                  <Text className="text-white font-bold text-center">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderPaymentStep = () => {
    return (
      <View className="flex-1">
        <Text className="text-xl font-bold mb-4">Payment</Text>
        <Text className="text-gray-600 mb-6">
          Complete your booking by making a payment. You can add more hours
          later if needed.
        </Text>

        <View className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6">
          <Text className="font-bold text-lg mb-4">Order Summary</Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">
              {quote.estimatedHours} hours removal service
            </Text>
            <Text className="font-bold">£{quote.totalPrice}</Text>
          </View>

          <View className="border-t border-gray-200 my-3" />

          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-bold">Total:</Text>
            <Text className="font-bold text-lg text-blue-700">
              £{quote.totalPrice}
            </Text>
          </View>
        </View>

        <View className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6">
          <Text className="font-bold text-lg mb-4">Payment Method</Text>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 ${paymentMethod === "card" ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"} rounded-xl mb-3`}
            onPress={() => {
              setPaymentMethod("card");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <View className="flex-row items-center">
              <CreditCard
                size={20}
                color={paymentMethod === "card" ? "#3b82f6" : "#6b7280"}
              />
              <Text
                className={`ml-3 font-medium ${paymentMethod === "card" ? "text-blue-700" : "text-gray-700"}`}
              >
                Credit/Debit Card
              </Text>
            </View>
            {paymentMethod === "card" && <Check size={20} color="#3b82f6" />}
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between p-4 ${paymentMethod === "bank" ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"} rounded-xl mb-3`}
            onPress={() => {
              setPaymentMethod("bank");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <View className="flex-row items-center">
              <Bank
                size={20}
                color={paymentMethod === "bank" ? "#3b82f6" : "#6b7280"}
              />
              <Text
                className={`ml-3 font-medium ${paymentMethod === "bank" ? "text-blue-700" : "text-gray-700"}`}
              >
                Bank Transfer
              </Text>
            </View>
            {paymentMethod === "bank" && <Check size={20} color="#3b82f6" />}
          </TouchableOpacity>

          <Text className="text-sm text-gray-600 mt-3">
            Your payment information is processed securely via Stripe. We don't
            store your payment details.
          </Text>
        </View>

        {/* Success Modal */}
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="slide"
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white w-[90%] rounded-xl p-6 shadow-xl items-center">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                <Check size={32} color="#22c55e" />
              </View>

              <Text className="text-2xl font-bold text-center mb-2">
                Booking Successful!
              </Text>
              <Text className="text-gray-600 text-center mb-6">
                Your removal job has been booked successfully. You can track its
                progress in your dashboard.
              </Text>

              <View className="bg-gray-50 w-full p-4 rounded-xl mb-6">
                <Text className="text-center text-gray-600 mb-1">
                  Your Job ID
                </Text>
                <Text className="text-center text-2xl font-bold text-blue-700">
                  {jobId}
                </Text>
              </View>

              <TouchableOpacity
                className="bg-blue-600 py-3 px-6 rounded-xl w-full"
                onPress={handleCompleteBooking}
              >
                <Text className="text-white font-bold text-center text-lg">
                  Go to Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderMediaUploadStep();
      case 2:
        return renderLocationStep();
      case 3:
        return renderQuoteReviewStep();
      case 4:
        return renderPaymentStep();
      default:
        return renderMediaUploadStep();
    }
  };

  const renderAuthModal = () => {
    return (
      <Modal visible={showAuthModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold">
                {isRegistering ? "Create Account" : "Sign In"}
              </Text>
              <TouchableOpacity onPress={() => setShowAuthModal(false)}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-600 mb-6">
              {isRegistering
                ? "Create an account to continue with your booking"
                : "Sign in to continue with your booking"}
            </Text>

            {isRegistering && (
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Full Name</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                  <User size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-2"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
            )}

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Email</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                <Mail size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-2">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                <Lock size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              className="bg-blue-600 py-3 rounded-lg mb-4"
              onPress={handleAuth}
              disabled={isLoggingIn}
            >
              <Text className="text-white font-bold text-center text-lg">
                {isLoggingIn
                  ? "Please wait..."
                  : isRegistering
                    ? "Sign Up"
                    : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500">OR</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            <View className="flex-row space-x-4 mb-6">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-white border border-gray-300 py-3 rounded-lg"
                onPress={() => handleAuth()}
              >
                <RNImage
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                  }}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="ml-2 font-medium">Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-black py-3 rounded-lg"
                onPress={() => handleAuth()}
              >
                <RNImage
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                  }}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="ml-2 font-medium text-white">Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text className="text-blue-600 text-center">
                {isRegistering
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Next: Enter Location";
      case 2:
        return "Generate Quote";
      case 3:
        return "Proceed to Payment";
      case 4:
        return "Complete Booking";
      default:
        return "Next";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-5">
        {renderStepIndicator()}
        {renderCurrentStep()}
        <View className="h-24" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 shadow-sm">
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 py-4 bg-gray-100 rounded-xl flex-row justify-center items-center shadow-sm"
            onPress={handlePreviousStep}
          >
            <Text className="font-medium text-gray-700">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-2 py-4 bg-blue-600 rounded-xl flex-row justify-center items-center flex-grow-[2] shadow-sm"
            onPress={handleNextStep}
          >
            <Text className="font-medium text-white text-base">
              {getButtonText()}
            </Text>
            <ArrowRight size={20} color="white" className="ml-2" />
          </TouchableOpacity>
        </View>
      </View>

      {renderAuthModal()}
    </SafeAreaView>
  );
};

export default CreateJobScreen;
