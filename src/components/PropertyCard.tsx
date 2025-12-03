'use client';

import { FC } from 'react';
import { FiMapPin, FiStar, FiBookmark } from 'react-icons/fi';
import '../PropertyCard.css';

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

interface PropertyCardProps {
    house: House;
    onSelect: (house: House) => void;
    isSelected?: boolean;
}

const getTypeColor = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'home') return '#16a34a';
    if (t === 'apartment') return '#eab308';
    if (t === 'villa') return '#a855f7';
    if (t === 'bungalow') return '#14b8a6';
    return '#374151';
};

const getAmenityColor = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a === 'garden') return '#16a34a';
    if (a === 'gym') return '#6366f1';
    if (a === 'garage') return '#334155';
    return '#374151';
};

const PropertyCard: FC<PropertyCardProps> = ({ house, onSelect, isSelected = false }) => {
    return (
        <div 
            className={`property-card ${isSelected ? 'selected' : ''}`} 
            onClick={() => onSelect(house)}
        >
            <div className="card-image-container">
                {house.images && house.images.length > 0 ? (
                    <img src={house.images[0]} alt={house.name} className="card-image" />
                ) : (
                    <div className="placeholder" />
                )}
                <div className="property-type-badge" style={{ color: getTypeColor(house.type) }}>
                    {house.type}
                </div>
                <button className="bookmark-btn">
                    <FiBookmark className="icon-md bookmark-icon" />
                </button>
            </div>
            <div className="card-body">
                <h4 className="property-name">{house.name}</h4>
                <div className="location-container">
                    <FiMapPin className="icon-sm text-muted" />
                    <span className="location">{house.address}</span>
                </div>
                {house.amenities && house.amenities.length > 0 && (
                    <div className="amenities-row">
                        {house.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="amenity-chip" style={{ color: getAmenityColor(a) }}>
                                {a}
                            </span>
                        ))}
                    </div>
                )}
                <div className="price-rating-container">
                    <span className="price">${house.price}/month</span>
                    <div className="rating-container">
                        <FiStar className="icon-sm text-accent" />
                        <span className="rating">{house.rating}/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;