// Mock data for prototyping phase

// Customer Jobs
export const mockActiveJobs = [
  {
    id: "TRZ-123456",
    status: "en-route",
    address: "123 Main Street, London, UK",
    date: "2023-06-15",
    time: "14:00-16:00",
    items: 12,
    estimatedHours: 2,
    driverName: "John Smith",
    driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    driverEta: "15 mins",
  },
  {
    id: "TRZ-789012",
    status: "scheduled",
    address: "456 Park Avenue, Manchester, UK",
    date: "2023-06-20",
    time: "10:00-13:00",
    items: 8,
    estimatedHours: 3,
  },
];

export const mockPastJobs = [
  {
    id: "TRZ-987654",
    status: "complete",
    address: "789 Oak Road, Birmingham, UK",
    date: "2023-06-01",
    time: "09:00-11:00",
    items: 5,
    estimatedHours: 2,
    driverName: "Sarah Johnson",
    driverImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
];

// Driver Jobs
export const mockAvailableJobs = [
  {
    id: "job1",
    status: "available",
    pickup: "123 Main St, London",
    dropoff: "456 Park Ave, London",
    estimatedTime: "2 hours",
    payment: 120,
    distance: "5.2 miles",
    customerName: "John Smith",
    items: ["Sofa", "Dining Table", "Bed Frame"],
  },
  {
    id: "job2",
    status: "available",
    pickup: "789 Oak Rd, London",
    dropoff: "101 Pine St, London",
    estimatedTime: "1.5 hours",
    payment: 90,
    distance: "3.8 miles",
    customerName: "Emma Johnson",
    items: ["Wardrobe", "Bookshelf", "TV Stand"],
  },
];

export const mockCurrentJobs = [
  {
    id: "job3",
    status: "in_progress",
    pickup: "222 Elm St, London",
    dropoff: "333 Maple Ave, London",
    estimatedTime: "2.5 hours",
    payment: 150,
    distance: "6.1 miles",
    customerName: "Sarah Williams",
    items: ["Refrigerator", "Washing Machine", "Couch"],
  },
];

export const mockHistoryJobs = [
  {
    id: "job4",
    status: "completed",
    pickup: "444 Cedar Ln, London",
    dropoff: "555 Birch Rd, London",
    estimatedTime: "1 hour",
    payment: 75,
    distance: "2.5 miles",
    customerName: "Michael Brown",
    items: ["Desk", "Office Chair", "Filing Cabinet"],
  },
  {
    id: "job5",
    status: "completed",
    pickup: "666 Willow Way, London",
    dropoff: "777 Spruce St, London",
    estimatedTime: "3 hours",
    payment: 180,
    distance: "7.3 miles",
    customerName: "David Jones",
    items: ["King Bed", "Dresser", "Nightstands", "Dining Set"],
  },
];

// Mock payslips and invoices
export const mockPayslips = [
  {
    id: "PS001",
    period: "May 2023",
    amount: 1250,
    date: "31/05/2023",
    status: "Paid",
  },
  {
    id: "PS002",
    period: "June 2023",
    amount: 1420,
    date: "30/06/2023",
    status: "Paid",
  },
  {
    id: "PS003",
    period: "July 2023",
    amount: 1380,
    date: "31/07/2023",
    status: "Paid",
  },
];

export const mockInvoices = [
  {
    id: "INV001",
    description: "Fuel expenses",
    amount: 120,
    date: "15/05/2023",
    status: "Approved",
  },
  {
    id: "INV002",
    description: "Vehicle maintenance",
    amount: 250,
    date: "22/06/2023",
    status: "Pending",
  },
  {
    id: "INV003",
    description: "Parking fees",
    amount: 45,
    date: "10/07/2023",
    status: "Approved",
  },
];

// Mock detected items for create job
export const mockDetectedItems = [
  { id: 1, name: "Sofa", dimensions: "200x90x85cm", volume: "1.53m³" },
  {
    id: 2,
    name: "Coffee Table",
    dimensions: "120x60x45cm",
    volume: "0.32m³",
  },
  { id: 3, name: "Bookshelf", dimensions: "80x30x180cm", volume: "0.43m³" },
];

// Mock quote for create job
export const mockQuote = {
  totalVolume: "2.28m³",
  estimatedHours: 3,
  hourlyRate: 45,
  totalPrice: 135,
  insurance: "Basic coverage included",
};

// Mock route details
export const mockRouteDetails = {
  distance: "5.2 miles",
  duration: "15 mins",
  trafficCondition: "Light traffic",
};

// Mock authentication function
export const mockAuthentication = (
  email: string,
  password: string,
  callback: (success: boolean) => void,
) => {
  // Simulate network delay
  setTimeout(() => {
    // Accept any non-empty email and password for prototyping
    const success = email.trim() !== "" && password.trim() !== "";
    callback(success);
  }, 1500);
};

// Mock job creation function
export const mockCreateJob = (
  jobDetails: any,
  callback: (jobId: string) => void,
) => {
  // Simulate network delay
  setTimeout(() => {
    // Generate a random job ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const jobId = `TRZ-${randomId}`;
    callback(jobId);
  }, 2000);
};

// Mock media upload function
export const mockMediaUpload = (type: "image" | "video") => {
  return {
    id: Date.now(),
    type,
    uri:
      type === "image"
        ? "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&q=80"
        : "https://images.unsplash.com/photo-1558997519-83c9716b1b07?w=400&q=80",
  };
};
