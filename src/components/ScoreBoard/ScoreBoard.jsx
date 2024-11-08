import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreBoard = () => {
  const { state } = useGame();
  const [activeTab, setActiveTab] = useState('single');
  
  const scores = state.highScores?.[activeTab] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          High Scores - {activeTab === 'single' ? 'Single Player' : 'Multiplayer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab}>
          <TabsList>
            <TabsTrigger 
              value="single" 
              onClick={() => setActiveTab('single')}
              className={activeTab === 'single' ? 'active' : ''}
            >
              Single Player
            </TabsTrigger>
            <TabsTrigger 
              value="multi" 
              onClick={() => setActiveTab('multi')}
              className={activeTab === 'multi' ? 'active' : ''}
            >
              Multiplayer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <AnimatePresence>
              {scores.map((score, index) => (
                <motion.div
                  key={`score-${score.date}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between p-2 bg-gray-50 rounded mb-2"
                >
                  <span>{score.playerName}</span>
                  <span>{score.score}</span>
                </motion.div> 
              ))}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;