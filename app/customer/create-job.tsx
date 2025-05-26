import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import {
  Camera,
  Upload,
  ArrowRight,
  Check,
  X,
  CreditCard,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const CreateJobScreen = () => {
  const router = useRouter();
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
  const [detectedItems, setDetectedItems] = useState([
    { id: 1, name: "Sofa", dimensions: "200x90x85cm", volume: "1.53m³" },
    {
      id: 2,
      name: "Coffee Table",
      dimensions: "120x60x45cm",
      volume: "0.32m³",
    },
    { id: 3, name: "Bookshelf", dimensions: "80x30x180cm", volume: "0.43m³" },
  ]);
  const [quote, setQuote] = useState({
    totalVolume: "2.28m³",
    estimatedHours: 3,
    hourlyRate: 45,
    totalPrice: 135,
    insurance: "Basic coverage included",
  });

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle payment completion and navigate to dashboard
      router.push("/customer/dashboard");
    }
  };

  const handlePreviousStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleMediaUpload = () => {
    // In a real implementation, this would open the camera or gallery
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    alert("This would open the camera or gallery selector");
  };

  const renderStepIndicator = () => {
    return (
      <View className="flex-row justify-center items-center mb-6 mt-2">
        {[1, 2, 3].map((step) => (
          <View key={step} className="flex-row items-center">
            <View
              className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= step ? "bg-blue-500" : "bg-gray-300"}`}
            >
              <Text className="text-white font-bold">{step}</Text>
            </View>
            {step < 3 && (
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

        <View className="bg-gray-100 p-4 rounded-lg mb-6">
          <Text className="text-sm text-gray-700 font-medium mb-2">
            📋 A4 Reference Sheet Required
          </Text>
          <Text className="text-xs text-gray-600">
            Place a standard A4 paper sheet (210 × 297 mm) visibly in at least
            one photo or video to help our AI accurately estimate the size of
            your items.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-4 mb-6">
          {uploadedMedia.map((media) => (
            <View key={media.id} className="relative">
              <Image
                source={{ uri: media.uri }}
                className="w-24 h-24 rounded-lg"
                contentFit="cover"
              />
              <TouchableOpacity
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                onPress={() => {
                  // Remove media logic would go here
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <X size={16} color="white" />
              </TouchableOpacity>
              {media.type === "video" && (
                <View className="absolute bottom-1 right-1 bg-black bg-opacity-50 rounded-full p-1">
                  <Text className="text-white text-xs">Video</Text>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center"
            onPress={handleMediaUpload}
          >
            <Upload size={24} color="#666" />
            <Text className="text-gray-600 text-xs mt-2">Add Media</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-4 mb-4">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-gray-200 py-3 rounded-lg"
            onPress={handleMediaUpload}
          >
            <Camera size={20} color="#333" />
            <Text className="ml-2 font-medium">Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-gray-200 py-3 rounded-lg"
            onPress={handleMediaUpload}
          >
            <Upload size={20} color="#333" />
            <Text className="ml-2 font-medium">Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderQuoteReviewStep = () => {
    return (
      <View className="flex-1">
        <Text className="text-xl font-bold mb-4">Review Quote</Text>
        <Text className="text-gray-600 mb-6">
          Our AI has analyzed your uploads and detected the following items. You
          can edit this list if needed.
        </Text>

        <View className="bg-white border border-gray-200 rounded-lg mb-6">
          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg">Detected Items</Text>
          </View>

          {detectedItems.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center p-4 border-b border-gray-100"
            >
              <View>
                <Text className="font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-xs">{item.dimensions}</Text>
              </View>
              <Text className="text-gray-700">{item.volume}</Text>
            </View>
          ))}

          <TouchableOpacity
            className="p-4 flex-row items-center justify-center"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              alert("This would open the item editor");
            }}
          >
            <Text className="text-blue-500 font-medium">Edit Items</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-blue-50 p-4 rounded-lg mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Total Volume:</Text>
            <Text className="font-bold">{quote.totalVolume}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Estimated Hours:</Text>
            <Text className="font-bold">{quote.estimatedHours} hours</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Hourly Rate:</Text>
            <Text className="font-bold">£{quote.hourlyRate}</Text>
          </View>
          <View className="border-t border-blue-200 my-2" />
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-bold">Total Price:</Text>
            <Text className="font-bold text-lg">£{quote.totalPrice}</Text>
          </View>
          <Text className="text-xs text-gray-600 mt-2">{quote.insurance}</Text>
        </View>
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

        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
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
            <Text className="font-bold text-lg">£{quote.totalPrice}</Text>
          </View>
        </View>

        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <Text className="font-bold text-lg mb-4">Payment Method</Text>

          <TouchableOpacity
            className="flex-row items-center justify-between p-3 bg-gray-100 rounded-lg mb-3"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <View className="flex-row items-center">
              <CreditCard size={20} color="#333" />
              <Text className="ml-3">Credit/Debit Card</Text>
            </View>
            <Check size={20} color="#3b82f6" />
          </TouchableOpacity>

          <Text className="text-xs text-gray-500 mt-2">
            Your payment information is processed securely via Stripe. We don't
            store your card details.
          </Text>
        </View>
      </View>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderMediaUploadStep();
      case 2:
        return renderQuoteReviewStep();
      case 3:
        return renderPaymentStep();
      default:
        return renderMediaUploadStep();
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Generate Quote";
      case 2:
        return "Proceed to Payment";
      case 3:
        return "Complete Booking";
      default:
        return "Next";
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {renderStepIndicator()}
        {renderCurrentStep()}
        <View className="h-20" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 py-3 bg-gray-200 rounded-lg flex-row justify-center items-center"
            onPress={handlePreviousStep}
          >
            <Text className="font-medium">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-2 py-3 bg-blue-500 rounded-lg flex-row justify-center items-center flex-grow-[2]"
            onPress={handleNextStep}
          >
            <Text className="font-medium text-white">{getButtonText()}</Text>
            <ArrowRight size={20} color="white" className="ml-2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateJobScreen;
