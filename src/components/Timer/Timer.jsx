import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';

const Timer = () => {
  const { state } = useGame();
  
  return (
    <motion.div 
      className="text-4xl font-bold text-center p-4"
      animate={{ scale: state.timer % 2 ? 1.1 : 1 }}
    >
      {Math.floor(state.timer / 60)}:
      {(state.timer % 60).toString().padStart(2, '0')}
    </motion.div>
  );
};

export default Timer;