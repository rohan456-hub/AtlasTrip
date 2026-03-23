export const demoFlights = [
  {
    airline: "Skyline Air",
    flightNumber: "SK102",
    from: "New York",
    to: "Paris",
    departureTime: "2026-04-20T09:00",
    arrivalTime: "2026-04-20T19:30",
    duration: "7h 30m",
    price: 780,
    seatsAvailable: 18,
    classType: "Economy",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    airline: "Aurora Jet",
    flightNumber: "AJ220",
    from: "Dubai",
    to: "Tokyo",
    departureTime: "2026-05-01T11:00",
    arrivalTime: "2026-05-01T22:40",
    duration: "9h 10m",
    price: 930,
    seatsAvailable: 12,
    classType: "Business",
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80"
  },
  {
    airline: "Maple Wings",
    flightNumber: "MW410",
    from: "Toronto",
    to: "London",
    departureTime: "2026-05-08T08:20",
    arrivalTime: "2026-05-08T18:15",
    duration: "7h 55m",
    price: 845,
    seatsAvailable: 22,
    classType: "Economy",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80"
  },
  {
    airline: "Pacific Air",
    flightNumber: "PA318",
    from: "Singapore",
    to: "Sydney",
    departureTime: "2026-05-11T14:30",
    arrivalTime: "2026-05-11T23:10",
    duration: "7h 40m",
    price: 990,
    seatsAvailable: 15,
    classType: "Premium Economy",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80"
  },
  {
    airline: "Desert Connect",
    flightNumber: "DC144",
    from: "Delhi",
    to: "Dubai",
    departureTime: "2026-05-14T06:00",
    arrivalTime: "2026-05-14T08:30",
    duration: "3h 30m",
    price: 420,
    seatsAvailable: 30,
    classType: "Economy",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    airline: "Auric Skies",
    flightNumber: "AS602",
    from: "Mumbai",
    to: "Zurich",
    departureTime: "2026-05-19T01:30",
    arrivalTime: "2026-05-19T08:45",
    duration: "9h 45m",
    price: 1120,
    seatsAvailable: 9,
    classType: "Business",
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=1200&q=80"
  }
];

export const demoHotels = [
  {
    name: "Saffron Grand",
    city: "Bali",
    country: "Indonesia",
    pricePerNight: 220,
    rating: 4.8,
    amenities: ["Pool", "Spa", "Breakfast", "Ocean View"],
    roomsAvailable: 14,
    description: "A tropical retreat with premium concierge services.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Nordic Nest Hotel",
    city: "Reykjavik",
    country: "Iceland",
    pricePerNight: 310,
    rating: 4.6,
    amenities: ["WiFi", "Sauna", "Breakfast"],
    roomsAvailable: 8,
    description: "Boutique comfort close to the northern lights routes.",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Royal Atlas Palace",
    city: "Marrakech",
    country: "Morocco",
    pricePerNight: 185,
    rating: 4.7,
    amenities: ["Pool", "Breakfast", "Courtyard", "Airport Shuttle"],
    roomsAvailable: 17,
    description: "Elegant riad-inspired luxury stay in the heart of Marrakech.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Shibuya Sky Stay",
    city: "Tokyo",
    country: "Japan",
    pricePerNight: 260,
    rating: 4.9,
    amenities: ["WiFi", "City View", "Breakfast", "Gym"],
    roomsAvailable: 11,
    description: "Modern city hotel perfect for fast-paced Tokyo exploration.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Desert Pearl Resort",
    city: "Dubai",
    country: "UAE",
    pricePerNight: 340,
    rating: 4.8,
    amenities: ["Pool", "Spa", "Beach Access", "Fine Dining"],
    roomsAvailable: 13,
    description: "A polished luxury resort with skyline comfort and resort indulgence.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Alpine Crest Lodge",
    city: "Interlaken",
    country: "Switzerland",
    pricePerNight: 295,
    rating: 4.7,
    amenities: ["Mountain View", "Breakfast", "Spa", "WiFi"],
    roomsAvailable: 10,
    description: "A mountain lodge stay designed for scenic rail and alpine holidays.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  }
];

export const demoTours = [
  {
    title: "Swiss Alps Escape",
    destination: "Switzerland",
    duration: "6 Days",
    price: 1499,
    groupSize: 10,
    description: "Scenic rail journeys, alpine stays, and guided mountain walks.",
    highlights: ["Glacier Express", "Lake Lucerne", "Mountain Lodge"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", details: "Private transfer and welcome dinner." },
      { day: 2, title: "Lucerne", details: "Lake cruise and old town exploration." }
    ],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Morocco Desert Trails",
    destination: "Morocco",
    duration: "5 Days",
    price: 1190,
    groupSize: 12,
    description: "Markets, riads, and a sunset camel ride into the dunes.",
    highlights: ["Marrakech", "Sahara Camp", "Atlas Drive"],
    itinerary: [
      { day: 1, title: "Marrakech", details: "Medina walk and rooftop dinner." },
      { day: 2, title: "Desert Route", details: "Drive through the Atlas and into camp." }
    ],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Japan Sakura Circuit",
    destination: "Japan",
    duration: "7 Days",
    price: 1680,
    groupSize: 8,
    description: "Tokyo energy, Kyoto tradition, and iconic seasonal viewing routes.",
    highlights: ["Tokyo", "Kyoto", "Mount Fuji", "Food tour"],
    itinerary: [
      { day: 1, title: "Tokyo Arrival", details: "Check-in and evening skyline walk." },
      { day: 2, title: "City & Culture", details: "Temple visits, neighborhoods, and sushi tasting." }
    ],
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Dubai Luxury Escape",
    destination: "Dubai",
    duration: "4 Days",
    price: 1290,
    groupSize: 14,
    description: "Luxury city stay with skyline access, shopping, and desert experiences.",
    highlights: ["Burj Khalifa", "Desert Safari", "Marina Cruise"],
    itinerary: [
      { day: 1, title: "Downtown Dubai", details: "Hotel check-in and city landmark access." },
      { day: 2, title: "Desert Evening", details: "Safari drive, camp dinner, and cultural show." }
    ],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "India Golden Journey",
    destination: "India",
    duration: "6 Days",
    price: 990,
    groupSize: 16,
    description: "A classic India route through heritage architecture, markets, and royal cities.",
    highlights: ["Delhi", "Agra", "Jaipur", "Taj Mahal"],
    itinerary: [
      { day: 1, title: "Delhi", details: "Arrival, old city drive, and cultural dinner." },
      { day: 2, title: "Agra", details: "Sunrise Taj Mahal visit and guided fort walk." }
    ],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Bali Island Reset",
    destination: "Indonesia",
    duration: "5 Days",
    price: 1105,
    groupSize: 10,
    description: "Beachside relaxation, rice terrace views, and curated island experiences.",
    highlights: ["Ubud", "Seminyak", "Temple Tour", "Spa Retreat"],
    itinerary: [
      { day: 1, title: "Bali Arrival", details: "Private transfer and sunset welcome dinner." },
      { day: 2, title: "Ubud", details: "Rice terrace route and local culture experience." }
    ],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
  }
];
