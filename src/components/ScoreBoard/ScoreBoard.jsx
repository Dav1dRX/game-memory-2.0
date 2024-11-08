import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';

const ScoreBoard = () => {
  const [activeTab, setActiveTab] = useState('single');
  const { state } = useGame();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scoreboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab}>
          <TabsList>
            <TabsTrigger 
              value="single"
              isActive={activeTab === 'single'}
              onClick={() => setActiveTab('single')}
            >
              Single Player
            </TabsTrigger>
            <TabsTrigger 
              value="multi"
              isActive={activeTab === 'multi'}
              onClick={() => setActiveTab('multi')}
            >
              Multiplayer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {state.highScores?.map((score, index) => (
                <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>{score.playerName}</span>
                  <span>{score.score}</span>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="multi">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {Object.values(state.players).map(player => (
                <div key={player.id} className="p-4 bg-gray-50 rounded-lg text-center">
                  <h3 className="font-bold">{player.name}</h3>
                  <p>Score: {player.score}</p>
                  <p>Matches: {player.matches}</p>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;