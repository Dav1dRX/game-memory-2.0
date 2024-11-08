import { motion } from 'framer-motion';

export const Card = ({ card, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        card relative w-24 h-24 
        ${card.matched ? 'bg-green-200' : 'bg-blue-500'}
        rounded-lg shadow-lg cursor-pointer
        flex items-center justify-center text-4xl
      `}
      onClick={() => !card.matched && !isSelected && onSelect()}
    >
      {(isSelected || card.matched) ? card.value : '?'}
    </motion.div>
  );
};