import { motion } from 'framer-motion';

export const Card = ({ card, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotateY: isSelected || card.matched ? 180 : 0
      }}
      className={`
        relative w-24 h-24 cursor-pointer
        ${card.matched ? 'bg-green-200' : 'bg-blue-500'}
        rounded-lg shadow-lg
      `}
      onClick={() => !card.matched && !isSelected && onSelect()}
    >
      <div className="absolute inset-0 flex items-center justify-center text-2xl">
        {(isSelected || card.matched) ? card.value : '?'}
      </div>
    </motion.div>
  );
};