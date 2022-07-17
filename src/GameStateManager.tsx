import {useState} from 'react';
import {GameEngine} from 'react-game-engine';
import {EntityProps, GamePhase, GameState, GameStateManager, Move, PlayerProps, StringKeyObject} from './types';

export const randomBetween = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const initializeEntities = (): StringKeyObject => {

	const player: PlayerProps = {
		x: 0, y: 1, isEnemy: false, rotation: 90, queuedMoves: [], renderer: <Entity />
	}

	const enemy1: EntityProps = {
		x: 5, y: 2, isEnemy: true, rotation: 270
	}

	const enemy2: EntityProps = {
		x: 4, y: 3, isEnemy: true, rotation: 270
	}

	let entities = {
		player,
		enemy1,
		enemy2
	};

	// @ts-ignore
	return entities;
};

const useGameStateManager = (): GameStateManager => {
	const [state, setState] = useState<GameState>({running: false, gamePhase: GamePhase.Plan, currentAP: 0, currentMaxAP: 0, currentDice: [], queuedMoves: []});
	const [entities, setEntities] = useState<StringKeyObject>(initializeEntities());

	return {
		state,
		entities,
		updateState: (update: Partial<GameState>) => {
			setState({
				...state,
				...update
			});
		},
		queueMove: (move: Move) => {
			setState({
				...state,
				queuedMoves: [...state.queuedMoves, move],
				currentAP: state.currentAP - move.cost
			})
		},
		resetWorld: (gameEngine: GameEngine) => {
			const newEntities = initializeEntities();
			// @ts-ignore
			gameEngine.swap(newEntities);
			setEntities(newEntities);
		}
	};
};

export default useGameStateManager;
