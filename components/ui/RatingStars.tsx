
import React from 'react';
import { StarIcon } from '../../assets/icons';

interface RatingStarsProps {
    rating: number;
    maxStars?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={`full-${i}`} filled />
            ))}
            {halfStar && <StarIcon key="half" half />}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIcon key={`empty-${i}`} />
            ))}
        </div>
    );
};

export default RatingStars;
