import React, { useState, useEffect } from 'react';
import './App.css';

// Hotel data interface
interface Hotel {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: number;
  description: string;
  price: number;
  image: string;
  amenities?: string[]; // Added amenities property
}

function App() {
  const [destination, setDestination] = useState('Jaipur, Rajasthan, India');
  const [checkIn, setCheckIn] = useState('2025-04-16');
  const [checkOut, setCheckOut] = useState('2025-04-17');
  const [sortBy, setSortBy] = useState('distance');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  
  // Filter state variables
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Simulate fetching hotels data
  useEffect(() => {
    // Mock data based on the screenshot
    const mockHotels = [
      {
        id: 1,
        name: "Fairfield by Marriott Jaipur",
        rating: 4.2,
        reviews: 255,
        distance: 0.8,
        description: "Jaipur, India, hotel with sweeping Aravalli Hills views set in the commercial and business district.",
        price: 4987,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        amenities: ["Free WiFi", "Swimming Pool", "Gym", "Restaurant"]
      },
      {
        id: 2,
        name: "Jaipur Marriott Hotel",
        rating: 4.3,
        reviews: 1489,
        distance: 4.9,
        description: "Award-winning hotel in Jaipur, India, with spacious rooms, a spa and specialty restaurant",
        price: 7600,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service"]
      },
      {
        id: 3,
        name: "Le Méridien Jaipur Resort & Spa",
        rating: 4.5,
        reviews: 526,
        distance: 10.2,
        description: "A luxury resort in Jaipur with elegant hotel accommodations, a spa and indoor/outdoor event space.",
        price: 8200,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Room Service", "Fitness Center", "Airport Shuttle"]
      }
    ];
    setHotels(mockHotels);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search parameters
    console.log('Searching for hotels in:', destination);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle price range change
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Filter hotels based on selected filters
  const filteredHotels = hotels.filter(hotel => {
    // Filter by price - using priceRange array values instead of separate variables
    const priceInRange = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    
    // Filter by rating
    const ratingMatches = selectedRatings.length === 0 || selectedRatings.some(r => Math.floor(hotel.rating) === r);
    
    // Filter by amenities
    const amenitiesMatch = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => hotel.amenities?.includes(amenity));
    
    return priceInRange && ratingMatches && amenitiesMatch;
  });

  // Available amenities for filtering
  const amenitiesList = [
    "Free WiFi", "Swimming Pool", "Restaurant", "Spa", 
    "Gym", "Room Service", "Airport Shuttle", "Fitness Center"
  ];

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <span className="brand-logo">🏨</span>
            <h1 className="brand-name">LuxStay</h1>
          </div>
          <div className="navbar-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/" className="nav-link">Destinations</a>
            <a href="/" className="nav-link">Offers</a>
            <a href="/" className="nav-link">Contact</a>
          </div>
          <div className="navbar-actions">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Experience Luxury Beyond Compare</h1>
            <p className="hero-subtitle">Find your perfect stay with exclusive deals at top-rated hotels worldwide</p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Best Price Guarantee</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Free Cancellation</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">24/7 Customer Support</span>
              </div>
            </div>
            <button className="hero-cta">Explore Special Deals</button>
          </div>
          <div className="hero-video">
            <iframe
              src="https://www.youtube.com/embed/qNaK7bDlFY4"
              title="Luxury Hotel Experience"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-caption">Experience our luxury hotel destinations</div>
          </div>
        </div>
      </section>

      <header className="search-header">
        <div className="container">
          <div className="search-row">
            <div className="search-item location">
              <label>DESTINATION</label>
              <div className="input-container">
                <span className="location-icon">📍</span>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            
            <div className="search-item date">
              <label>CHECK IN</label>
              <div className="input-container">
                <span className="calendar-icon">📅</span>
                <div className="date-display">
                  {formatDate(checkIn)}
                </div>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="search-item date">
              <label>CHECK OUT</label>
              <div className="input-container">
                <span className="calendar-icon">📅</span>
                <div className="date-display">
                  {formatDate(checkOut)}
                </div>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <button className="update-search-button" onClick={handleSearch}>Update Search</button>
          </div>
        </div>
      </header>
      
      <main className="results-container">
        <div className="container">
          <div className="results-header">
            <span className="results-count">{filteredHotels.length} of {hotels.length} Results</span>
            <div className="sort-container">
              <label>Sort by: </label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="distance">Distance</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          <div className="results-content">
            {/* Filter Sidebar */}
            <div className="filter-sidebar">
              {/* Price Range Filter */}
              <div className="filter-card">
                <div className="filter-header">
                  <h3>Price Range</h3>
                </div>
                <div className="filter-body">
                  <div className="price-range">
                    <input 
                      type="range" 
                      min="1000" 
                      max="10000" 
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
                      className="price-slider"
                    />
                    <input 
                      type="range" 
                      min="1000" 
                      max="10000" 
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                      className="price-slider"
                    />
                    <div className="price-inputs">
                      <input 
                        type="number" 
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
                        className="price-input"
                      />
                      <span className="price-range-text">to</span>
                      <input 
                        type="number" 
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                        className="price-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div className="filter-card">
                <div className="filter-header">
                  <h3>Star Rating</h3>
                </div>
                <div className="filter-body">
                  <div className="star-filter">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div className="star-option" key={rating}>
                        <input 
                          type="checkbox" 
                          id={`rating-${rating}`} 
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <label htmlFor={`rating-${rating}`}>
                          {Array(rating).fill('').map((_, i) => (
                            <span key={i} className="star-icon">⭐</span>
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="filter-card">
                <div className="filter-header">
                  <h3>Amenities</h3>
                </div>
                <div className="filter-body">
                  <div className="amenities-list">
                    {amenitiesList.map((amenity, index) => (
                      <div className="amenity-option" key={index}>
                        <input 
                          type="checkbox" 
                          id={`amenity-${index}`}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                        />
                        <label htmlFor={`amenity-${index}`}>{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Results Area */}
            <div className="results-area">
              <div className="hotel-list">
                {filteredHotels.map(hotel => (
                  <div className="hotel-card" key={hotel.id}>
                    <div className="hotel-image">
                      <img src={hotel.image} alt={hotel.name} />
                      <div className="image-nav">
                        <button className="nav-button prev">❮</button>
                        <button className="nav-button next">❯</button>
                      </div>
                      <div className="image-dots">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    
                    <div className="hotel-info">
                      <h2>{hotel.name}</h2>
                      
                      <div className="hotel-meta">
                        <div className="rating">
                          <span className="star">⭐</span> {hotel.rating} ({hotel.reviews} reviews)
                        </div>
                        <div className="distance">
                          <span className="distance-icon">📍</span> {hotel.distance} mi from destination
                        </div>
                      </div>
                      
                      <p className="hotel-description">{hotel.description}</p>
                      
                      <div className="hotel-actions">
                        <button className="view-details">View Details</button>
                      </div>
                    </div>
                    
                    <div className="hotel-price">
                      <div className="price-amount">
                        {hotel.price.toLocaleString()}
                        <span className="currency"> INR</span>
                        <div className="per-night">/ Night</div>
                      </div>
                      <button className="view-rates-button">View Rates</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="map-button-container">
            <button className="map-button">
              <span className="map-icon">🗺️</span> Map
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
