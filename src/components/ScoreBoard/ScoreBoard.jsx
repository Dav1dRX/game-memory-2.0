
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ScoreBoard = () => {
  const [scores, setScores] = useState({
    singlePlayer: [],
    multiPlayer: []
  });

  useEffect(() => {
    // Cargar puntuaciones del localStorage
    const savedScores = JSON.parse(localStorage.getItem('highScores') || '{"singlePlayer":[],"multiPlayer":[]}');
    setScores(savedScores);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Mejores Puntuaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="singlePlayer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="singlePlayer">Un Jugador</TabsTrigger>
            <TabsTrigger value="multiPlayer">Multijugador</TabsTrigger>
          </TabsList>
          
          <TabsContent value="singlePlayer">
            <div className="space-y-2">
              {scores.singlePlayer.map((score, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span className="font-medium">{score.playerName}</span>
                  <span className="text-gray-600">{score.score} pts</span>
                  <span className="text-sm text-gray-400">{formatDate(score.date)}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="multiPlayer">
            <div className="space-y-2">
              {scores.multiPlayer.map((score, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <div>
                    <div className="font-medium">{score.winner}</div>
                    <div className="text-sm text-gray-500">vs {score.loser}</div>
                  </div>
                  <span className="text-gray-600">{score.score} pts</span>
                  <span className="text-sm text-gray-400">{formatDate(score.date)}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;