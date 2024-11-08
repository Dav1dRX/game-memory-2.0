// src/components/GameBoard/Card.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType } from '../../types/game';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({ card, isSelected, onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          rotateY: isSelected || card.matched ? 180 : 0 
        }}
        exit={{ scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-24 h-24 cursor-pointer
          ${card.matched ? 'bg-green-200' : 'bg-blue-500'}
          rounded-lg shadow-lg transform transition-all
        `}
        onClick={() => !card.matched && !isSelected && onSelect()}
      >
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-2xl"
          animate={{ opacity: isSelected || card.matched ? 1 : 0 }}
        >
          {card.value}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};