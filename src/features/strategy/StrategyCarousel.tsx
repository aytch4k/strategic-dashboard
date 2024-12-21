import React, { useState } from 'react';
import { Strategy } from '../../types/dashboard';
import { StrategyCard } from './StrategyCard';

interface StrategyCarouselProps {
  strategies: Strategy[];
}

export const StrategyCarousel: React.FC<StrategyCarouselProps> = ({ strategies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((current) => 
      current === strategies.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((current) => 
      current === 0 ? strategies.length - 1 : current - 1
    );
  };

  if (!strategies.length) return null;

  return (
    <div className="relative h-full">
      <div className="overflow-hidden h-full">
        <div 
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {strategies.map((strategy) => (
            <div key={strategy.id} className="w-full flex-shrink-0 px-4">
              <StrategyCard 
                strategy={strategy}
                onPrev={prevSlide}
                onNext={nextSlide}
                showNavigation={strategies.length > 1}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
        {strategies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};