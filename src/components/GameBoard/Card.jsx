import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export const Card = ({ card, isSelected, onSelect }) => {
  const { state } = useContext(GameContext);
  const { currentPlayer } = state;

  const getPlayerColors = () => {
    if (card.matched) return 'from-emerald-900/95 to-teal-900/95 border-green-400/50';
    return currentPlayer === 1 
      ? 'from-cyan-900/95 to-blue-900/95 border-cyan-400/50'
      : 'from-violet-900/95 to-indigo-900/95 border-purple-400/50';
  };

  const getTextColor = () => {
    if (card.matched) return 'text-green-400';
    return currentPlayer === 1 ? 'text-cyan-400' : 'text-purple-400';
  };

  return (
    <div className="card-container">
      <motion.div
        className={`card-inner ${isSelected || card.matched ? 'flipped' : ''} 
                   ${card.matched ? 'card-matched' : ''} 
                   ${isSelected ? 'card-selected' : ''}`}
        initial={false}
        animate={{ 
          rotateY: isSelected || card.matched ? 180 : 0,
          scale: card.matched ? [1, 1.1, 1] : 1
        }}
        transition={{
          rotateY: {
            duration: 0.8,
            type: "spring",
            stiffness: 150,
            damping: 15
          },
          scale: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
        onClick={() => !card.matched && !isSelected && onSelect()}
      >
        {/* Front Face */}
        <div 
          className="card-face front" 
          data-player={currentPlayer}
        >
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getPlayerColors()}`}>
            <motion.span 
              className={`text-5xl font-bold relative z-10 ${getTextColor()}`}
              animate={{ 
                textShadow: [
                  "0 0 8px currentColor, 0 0 12px currentColor",
                  "0 0 15px currentColor, 0 0 20px currentColor"
                ]
              }}
              transition={{
                duration: 2,
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
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getPlayerColors()}`}>
            <motion.span 
              className={`text-5xl font-bold ${getTextColor()}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
                textShadow: [
                  "0 0 10px currentColor",
                  "0 0 20px currentColor"
                ]
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {card.value}
            </motion.span>
          </div>
        </div>

        {/* Match Particles */}
        <AnimatePresence>
          {card.matched && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="match-particle"
                  style={{
                    '--x': `${Math.cos(i * 60) * 100}px`,
                    '--y': `${Math.sin(i * 60) * 100}px`
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};