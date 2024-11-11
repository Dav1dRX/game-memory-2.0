import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import { Card as CardType } from '../../types/game';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({ card, isSelected, onSelect }) => {
  const { state } = useContext(GameContext);
  const { currentPlayer } = state;
  const [isFlipping, setIsFlipping] = useState(false);

  // Handle flip animation timing
  useEffect(() => {
    if (!isSelected && isFlipping) {
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 600); // Reduced from default timing
      return () => clearTimeout(timer);
    }
  }, [isSelected, isFlipping]);

  // Update flipping state when selection changes
  useEffect(() => {
    if (isSelected) {
      setIsFlipping(true);
    }
  }, [isSelected]);

  const getPlayerStyles = () => {
    if (card.matched) {
      return {
        background: 'from-emerald-900/90 to-teal-900/90',
        border: 'border-green-500/50',
        shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
        text: 'text-green-400',
        glow: ['0 0 8px #00ff00', '0 0 12px #00ff00']
      };
    }
   
    return currentPlayer === 1 ? {
      background: 'from-cyan-900/90 to-blue-900/90',
      border: 'border-cyan-500/50',
      shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      text: 'text-cyan-400',
      glow: ['0 0 8px #00fff0', '0 0 12px #00fff0']
    } : {
      background: 'from-violet-900/90 to-indigo-900/90',
      border: 'border-purple-500/50',
      shadow: 'shadow-[0_0_20px_rgba(147,51,234,0.4)]',
      text: 'text-purple-400',
      glow: ['0 0 8px #a855f7', '0 0 12px #a855f7']
    };
  };

  const styles = getPlayerStyles();

  return (
    <motion.div 
      className="card-container"
      onClick={() => {
        if (!card.matched && !isSelected && !isFlipping) {
          onSelect();
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <div 
        className={`card-inner ${isSelected || card.matched ? 'flipped' : ''}`}
        style={{ 
          transition: `transform ${card.matched ? '0.3s' : '0.2s'} cubic-bezier(0.175, 0.885, 0.32, 1.275)`
        }}
      >
        {/* Front Face */}
        <div className="card-face front">
          <div className={`
            w-full h-full bg-gradient-to-br ${styles.background}
            border-2 ${styles.border} rounded-xl
            flex items-center justify-center
            ${styles.shadow} transition-all duration-150
            ${!card.matched && !isSelected ? 'hover:shadow-lg hover:scale-105' : ''}
          `}>
            <motion.span
              className={`text-5xl font-bold ${styles.text}`}
              animate={{
                textShadow: styles.glow
              }}
              transition={{
                duration: 0.8,
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
          <motion.div
            className={`
              w-full h-full rounded-xl flex items-center justify-center
              ${card.matched
                ? 'bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border-2 border-green-400/50'
                : `bg-gradient-to-br ${styles.background} border-2 ${styles.border}`
              }
            `}
            initial={false}
            animate={{
              opacity: card.matched ? 0.5 : 1,
              scale: card.matched ? 0.95 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <motion.span
              className={`text-5xl font-bold ${card.matched ? 'text-green-400/70' : styles.text}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                textShadow: styles.glow
              }}
              transition={{ 
                duration: 0.2,
                textShadow: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              {card.value}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;