export interface Card {
    id: number;
    value: string;
    matched: boolean;
  }
  
  export interface Player {
    name: string;
    score: number;
  }
  
  export interface GameState {
    isPlaying: boolean;
    gameMode: 'single' | 'multi';
    currentPlayer: number;
    players: Record<number, Player>;
    cards: Card[];
    selectedCards: Card[];
    matches: number;
    timer: number;
  }
  
  export type GameAction = 
    | { type: 'START_GAME'; payload: { mode: 'single' | 'multi' } }
    | { type: 'SELECT_CARD'; payload: Card }
    | { type: 'MATCH_FOUND' }
    | { type: 'SWITCH_PLAYER' }
    | { type: 'UPDATE_TIMER' }
    | { type: 'CLEAR_SELECTED' };