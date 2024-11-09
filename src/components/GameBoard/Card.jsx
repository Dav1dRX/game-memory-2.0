import { motion, AnimatePresence } from 'framer-motion';

export const Card = ({ card, isSelected, onSelect }) => {
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
        <div className="card-face front">
          <div className="w-full h-full flex items-center justify-center">
            <motion.span 
              className="text-5xl text-cyan-400 font-bold relative z-10"
              animate={{ 
                textShadow: [
                  "0 0 8px #00fff0, 0 0 12px #00fff0",
                  "0 0 15px #00fff0, 0 0 20px #00fff0"
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
          <div className={`
            w-full h-full flex items-center justify-center
            ${card.matched 
              ? 'bg-gradient-to-br from-emerald-900/95 to-teal-900/95 border-2 border-green-400/50' 
              : 'bg-gradient-to-br from-violet-900/95 to-indigo-900/95 border-2 border-cyan-400/50'
            }`}
          >
            <motion.span 
              className={`text-5xl font-bold ${card.matched ? 'text-green-400' : 'text-cyan-400'}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1,
                rotate: 0,
                textShadow: card.matched 
                  ? ["0 0 10px #00ff00", "0 0 20px #00ff00"]
                  : ["0 0 10px #00fff0", "0 0 20px #00fff0"]
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