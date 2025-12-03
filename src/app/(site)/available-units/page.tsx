'use client';

import { useEffect, useState } from 'react';
import { FiX, FiMapPin, FiDollarSign, FiHome, FiStar, FiFilter, FiGrid } from 'react-icons/fi';
import { TbRulerMeasure, TbBath } from 'react-icons/tb';
import { MdBed, MdKitchen } from 'react-icons/md';
import { FaCar } from 'react-icons/fa';
import PropertyCard from '../../../components/PropertyCard';
import Link from 'next/link';

interface House {
  id: number;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  type: string;
  rooms: number;
  beds: number;
  baths: number;
  kitchens: number;
  area: number;
  description: string;
  amenities: string[];
  images: string[];
}

const houses: House[] = [
  {
    id: 1,
    name: 'Dream House Reality',
    address: 'Evergreen 14 Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 367,
    rating: 4.9,
    type: 'Home',
    rooms: 6,
    beds: 4,
    baths: 2,
    kitchens: 2,
    area: 2820,
    description:
      'Experience luxury living at Dream House Reality with spacious rooms, modern amenities, and a serene neighborhood.',
    amenities: ['Garden', 'Gym', 'Garage'],
    images: ['/images/rental/rental1.jpg', '/images/rental/rental4.jpg', '/images/rental/rental5.jpg'],
  },
  {
    id: 2,
    name: 'Atap Langit Homes',
    address: 'Edelweis City Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 278,
    rating: 4.7,
    type: 'Apartment',
    rooms: 4,
    beds: 3,
    baths: 2,
    kitchens: 1,
    area: 1800,
    description:
      'Modern apartment living with rooftop views and proximity to city amenities.',
    amenities: ['Gym', 'Pool'],
    images: ['/images/rental/rental2.jpg', '/images/rental/rental1.jpg', '/images/rental/rental5.jpg'],
  },
  {
    id: 3,
    name: 'Midnight Ridge Villa',
    address: '440 Thamrin Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 452,
    rating: 4.8,
    type: 'Villa',
    rooms: 6,
    beds: 4,
    baths: 2,
    kitchens: 2,
    area: 2820,
    description:
      'Welcome to Midnight Ridge Villa, a modern retreat set on a quiet hillside with stunning views of valleys and starry nights.',
    amenities: ['Garden', 'Garage'],
    images: ['/images/rental/rental3.jpg', '/images/rental/rental2.jpg', '/images/rental/rental4.jpg'],
  },
  {
    id: 4,
    name: 'Unity Urban Homes',
    address: 'Forest City Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 278,
    rating: 4.7,
    type: 'Home',
    rooms: 5,
    beds: 3,
    baths: 2,
    kitchens: 1,
    area: 2000,
    description:
      'Comfortable urban home nestled in a quiet community with easy access to parks and schools.',
    amenities: ['Garden', 'Garage'],
    images: ['/images/rental/rental4.jpg', '/images/rental/rental3.jpg', '/images/rental/rental1.jpg'],
  },
  {
    id: 5,
    name: 'Dream House',
    address: 'Evergreen 15 Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 367,
    rating: 4.9,
    type: 'Apartment',
    rooms: 5,
    beds: 3,
    baths: 2,
    kitchens: 1,
    area: 2000,
    description:
      'Another dream home with cozy interiors and beautifully landscaped surroundings.',
    amenities: ['Garden', 'Gym', 'Garage'],
    images: ['/images/rental/rental5.jpg', '/images/rental/rental2.jpg', '/images/rental/rental3.jpg'],
  },
  {
    id: 6,
    name: 'Lalaland Thick Villa',
    address: 'Forest Land Jakarta, Indonesia',
    city: 'Jakarta, Indonesia',
    price: 278,
    rating: 4.7,
    type: 'Villa',
    rooms: 5,
    beds: 3,
    baths: 2,
    kitchens: 1,
    area: 2100,
    description:
      'Spacious villa with modern design elements and spectacular outdoor spaces.',
    amenities: ['Garden', 'Garage'],
    images: ['/images/rental/rental2.jpg', '/images/rental/rental4.jpg', '/images/rental/rental1.jpg'],
  },
  {
    id: 7,
    name: 'Semarang Cozy Home',
    address: 'Central Park Semarang, Indonesia',
    city: 'Semarang, Indonesia',
    price: 300,
    rating: 4.2,
    type: 'Home',
    rooms: 4,
    beds: 3,
    baths: 2,
    kitchens: 1,
    area: 1800,
    description:
      'Cozy family home in Semarang with a warm atmosphere and convenient location.',
    amenities: ['Garden'],
    images: ['/images/rental/rental3.jpg', '/images/rental/rental5.jpg', '/images/rental/rental4.jpg'],
  },
];

const AvailableUnit = () => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [landArea, setLandArea] = useState<[number, number]>([0, 5000]);
  const [isCustomPrice, setIsCustomPrice] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Determine unique locations, types, and amenities for filter options
  const locations = Array.from(new Set(houses.map((h) => h.city)));
  const types = Array.from(new Set(houses.map((h) => h.type)));
  const allAmenities = Array.from(new Set(houses.flatMap((h) => h.amenities)));

  const filteredHouses = houses.filter((house) => {
    const matchLocation =
      locationFilter.length === 0 || locationFilter.includes(house.city);
    const matchType =
      typeFilter.length === 0 || typeFilter.includes(house.type);
    const matchPrice =
      house.price >= priceRange[0] && house.price <= priceRange[1];
    const matchArea =
      house.area >= landArea[0] && house.area <= landArea[1];
    const matchAmenities =
      amenitiesFilter.length === 0 ||
      amenitiesFilter.some(amenity => house.amenities.includes(amenity));

    return matchLocation && matchType && matchPrice && matchArea && matchAmenities;
  });

  const handleLocationChange = (city: string) => {
    setLocationFilter((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  };

  const handleTypeChange = (t: string) => {
    setTypeFilter((prev) =>
      prev.includes(t) ? prev.filter((c) => c !== t) : [...prev, t]
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenitiesFilter((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setLocationFilter([]);
    setTypeFilter([]);
    setAmenitiesFilter([]);
    setPriceRange([0, 1000]);
    setLandArea([0, 5000]);
    setIsCustomPrice(false);
  };

  const handleCardClick = (house: House) => {
    setSelectedHouse(house);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHouse(null);
  };

  const modalImages = selectedHouse
    ? [
      selectedHouse.images[0],
      '/images/rental/indoor-1.jpg',
      '/images/rental/indoor-2.jpg',
    ]
    : [];

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined') {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop && isFilterOpen) {
          setIsFilterOpen(false);
        }
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:static lg:translate-x-0 lg:h-auto lg:w-80 lg:rounded-lg lg:shadow-lg lg:m-4 lg:overflow-y-auto lg:max-h-none`}
        >
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                <FiX className="w-5 h-5 text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300" />
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Custom Filter</h2>
              <button
                onClick={clearAllFilters}
                className="text-primary-lightBlue hover:text-primary-darkBlue text-sm font-medium transition-colors duration-300"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FiMapPin className="w-4 h-4 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Location</h3>
                </div>
              </div>
              {locations.map((loc) => (
                <label key={loc} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={locationFilter.includes(loc)}
                    onChange={() => handleLocationChange(loc)}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary-lightBlue transition-colors duration-300"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{loc}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FiDollarSign className="w-4 h-4 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Price Range</h3>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={!isCustomPrice}
                    onChange={() => setIsCustomPrice(false)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Under $1,000</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={!isCustomPrice}
                    onChange={() => setIsCustomPrice(false)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">$1,000 - $15,000</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={!isCustomPrice}
                    onChange={() => setIsCustomPrice(false)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">More Than $15,000</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={isCustomPrice}
                    onChange={() => setIsCustomPrice(true)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Custom</span>
                </label>
              </div>

              {isCustomPrice && (
                <div className="mt-4">
                  <div className="relative h-2">
                    <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                    <div
                      className="absolute top-0 h-2 bg-primary-lightBlue rounded-full transition-colors duration-300"
                      style={{
                        left: `${(priceRange[0] / 1000) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`
                      }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>${(priceRange[0] / 1000).toFixed(0)}K</span>
                    <span>${(priceRange[1] / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <TbRulerMeasure className="w-4 h-4 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Land Area</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min sq ft</label>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={landArea[0]}
                    onChange={(e) => setLandArea([parseInt(e.target.value) || 0, landArea[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-lightBlue focus:border-primary-lightBlue transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max sq ft</label>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={landArea[1]}
                    onChange={(e) => setLandArea([landArea[0], parseInt(e.target.value) || 0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary-lightBlue focus:border-primary-lightBlue transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FiHome className="w-4 h-4 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Type Of Place</h3>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes('Home')}
                    onChange={() => handleTypeChange('Home')}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary-lightBlue"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Single Family Home</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes('Apartment')}
                    onChange={() => handleTypeChange('Apartment')}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary-lightBlue"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Apartment</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes('Villa')}
                    onChange={() => handleTypeChange('Villa')}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary-lightBlue"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Condo/Townhouse</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={typeFilter.includes('Bungalow')}
                    onChange={() => handleTypeChange('Bungalow')}
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary-lightBlue"
                    style={{ accentColor: '#3183B7' }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Bungalow</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FiStar className="w-4 h-4 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Amenities</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityChange(amenity)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${amenitiesFilter.includes(amenity)
                      ? 'bg-primary-lightBlue text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)}></div>
        )}
        <div className="flex-1 p-4">
          <button
            className="lg:hidden fixed bottom-6 right-6 z-40 rounded-full bg-primary-lightBlue hover:bg-primary-darkBlue text-white p-3 shadow-lg transition-transform duration-300"
            onClick={() => setIsFilterOpen((p) => !p)}
            aria-label="Toggle filters"
          >
            {isFilterOpen ? (
              <FiX className="w-6 h-6 transform transition-transform duration-300 rotate-0" />
            ) : (
              <FiFilter className="w-6 h-6 transform transition-transform duration-300 rotate-0" />
            )}
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHouses.map((house) => (
              <PropertyCard
                key={house.id}
                house={house}
                onSelect={handleCardClick}
                isSelected={false}
              />
            ))}
          </div>

          {filteredHouses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your filter criteria.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 bg-primary-lightBlue text-white rounded-lg hover:bg-primary-darkBlue"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedHouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedHouse!.name}</h2>
                  <p className="text-gray-600">{selectedHouse!.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-bold text-primary-lightBlue">${selectedHouse!.price}/month</p>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FiX className="w-6 h-6 text-primary-lightBlue hover:text-primary-darkBlue transition-colors duration-300" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                  <div className="md:col-span-2">
                    <div className="h-[240px] md:h-[300px]">
                      <img
                        src={modalImages[0]}
                        alt={`${selectedHouse!.name} - Main`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-2 gap-4 h-[240px] md:h-[300px]">
                    <img
                      src={modalImages[1]}
                      alt={`${selectedHouse!.name} - Indoor 1`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <img
                      src={modalImages[2]}
                      alt={`${selectedHouse!.name} - Indoor 2`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex border-b border-gray-200 mb-6">
                {['Overview', 'Reviews', 'About'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                      ? 'border-primary-lightBlue text-primary-lightBlue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'Overview' && (
                <div>
                  <p className="text-gray-700 mb-6">{selectedHouse!.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <FiGrid className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{selectedHouse!.rooms} Rooms</span>
                    </div>
                    <div className="flex items-center">
                      <MdBed className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{selectedHouse!.beds} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <TbBath className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{selectedHouse!.baths} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <MdKitchen className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{selectedHouse!.kitchens} Kitchen</span>
                    </div>
                    <div className="flex items-center">
                      <TbRulerMeasure className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">{selectedHouse!.area.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center">
                      <FaCar className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">1 Garage</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHouse!.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-lightBlue/10 text-primary-lightBlue rounded-full text-sm transition-colors duration-300"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/contact-us">
                      <button className="px-6 py-2 border border-primary-lightBlue text-primary-lightBlue rounded-lg hover:bg-primary-lightBlue/10 transition-colors">
                        Contact Agent
                      </button>
                    </Link>
                    <Link href="/available-unit">
                      <button className="px-6 py-2 bg-primary-lightBlue text-white rounded-lg hover:bg-primary-darkBlue transition-colors">
                        View Unit
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div>
                  <p className="text-gray-700">Reviews will be displayed here.</p>
                </div>
              )}

              {activeTab === 'About' && (
                <div>
                  <p className="text-gray-700">Additional information about the property will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .min-h-screen {
            min-height: auto;
          }
          .flex-col {
            flex-direction: column;
          }
          .w-full {
          width: 100%;
          }
          .max-h-96 {
            max-height: 24rem;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1280px) {
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default AvailableUnit;