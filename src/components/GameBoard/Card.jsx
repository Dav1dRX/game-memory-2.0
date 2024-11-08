import { motion } from 'framer-motion';

const Card = ({ card, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotateY: isSelected || card.matched ? 180 : 0,
        scale: card.matched ? 0.9 : 1
      }}
      className={`
        relative w-24 h-24 cursor-pointer perspective-1000
        ${card.matched ? 'bg-green-100' : 'bg-blue-500'}
        rounded-xl shadow-lg hover:shadow-xl
        transform transition-all duration-300
      `}
      onClick={() => !card.matched && !isSelected && onSelect()}
    >
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-4xl backface-hidden"
        animate={{ rotateY: isSelected || card.matched ? 180 : 0 }}
      >
        {card.value}
      </motion.div>
    </motion.div>
  );
};

export default Card;