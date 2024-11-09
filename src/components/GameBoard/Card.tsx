import { motion } from 'framer-motion'; 
import { Card as CardType } from '../../types/game';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({ card, isSelected, onSelect }) => {
  return (
    <div className="card-container" onClick={() => !card.matched && !isSelected && onSelect()}>
      <div className={`card-inner ${isSelected || card.matched ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="card-face front">
          <div className="w-full h-full bg-gradient-to-br from-violet-900/90 to-indigo-900/90
                       border-2 border-cyan-500/50 rounded-xl
                       flex items-center justify-center
                       shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <motion.span 
              className="text-5xl text-cyan-400 font-bold"
              animate={{ 
                textShadow: [
                  "0 0 8px #00fff0, 0 0 12px #00fff0",
                  "0 0 15px #00fff0, 0 0 20px #00fff0"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ?
            </motion.span>
          </div>
        </div>

        {/* Back Face */}
        <div className="card-face back">
          <div className={`
            w-full h-full rounded-xl flex items-center justify-center
            ${card.matched 
              ? 'bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border-2 border-green-400/50' 
              : 'bg-gradient-to-br from-cyan-900/90 to-blue-900/90 border-2 border-cyan-400/50'
            }`}>
            <motion.span 
              className={`text-5xl font-bold ${card.matched ? 'text-green-400' : 'text-cyan-400'}`}
            >
              {card.value}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};