import React from 'react';
import {Fire, MoveForward, TurnLeft, TurnRight} from './data/Moves';
import {Dice} from './Dice';
import useGameStateManager from './GameStateManager';
import {GamePhase, GameState, GameStateManager} from './types';
// @ts-ignore
import arrowLeft from './assets/arrowLeft.png';
// @ts-ignore
import arrowRight from './assets/arrowRight.png';
// @ts-ignore
import arrowUp from './assets/arrowUp.png';

export const Toolbar = ({onChangeGameState, gameStateManager} : {onChangeGameState: (a: boolean) => void, gameStateManager: GameStateManager}) => {
	return (
		<div className="toolbar" >
			<div className="toolbar-inner">
				<div className="toolbar-left">
					{
						gameStateManager.state.running ?
							(
								<div className="toolbar-button" onClick={() => onChangeGameState(false)}>
									Stop
								</div>
							) :
							(
								<div className="toolbar-button" onClick={() => onChangeGameState(true)}>
									Start
								</div>
							)
					}
					{
						gameStateManager.state.gamePhase == GamePhase.Plan ? (
							<>
								<div className={`toolbar-button toolbar-icon-button ${gameStateManager.state.currentAP < TurnLeft.cost ? 'disabled' : ''}`}  onClick={() => gameStateManager.queueMove(TurnLeft)}>
									<img src={arrowLeft} />
									<span>Turn left</span>
									<i>AP: {TurnLeft.cost}</i>
								</div>
								<div className={`toolbar-button toolbar-icon-button ${gameStateManager.state.currentAP < TurnRight.cost ? 'disabled' : ''}`}    onClick={() => gameStateManager.queueMove(TurnRight)}>
									<img src={arrowRight} />
									<span>Turn right</span>
									<i>AP: {TurnRight.cost}</i>
								</div>
								<div className={`toolbar-button toolbar-icon-button ${gameStateManager.state.currentAP < MoveForward.cost ? 'disabled' : ''}`}  onClick={() => gameStateManager.queueMove(MoveForward)}>
									<img src={arrowUp} />
									<span>Move</span>
									<i>AP: {MoveForward.cost}</i>
								</div>
								<div className={`toolbar-button toolbar-icon-button ${gameStateManager.state.currentAP < Fire.cost ? 'disabled' : ''}`}  onClick={() => gameStateManager.queueMove(Fire)}>
									<img src={arrowUp} />
									<span>Fire</span>
									<i>AP: {Fire.cost}</i>
								</div>
								<div className="flex-1"/>

								<div className="toolbar-button" onClick={() => gameStateManager.updateState({currentAP: 0})}>
									Execute
								</div>
							</>
						) : <></>
					}
				</div>
				<div className="toolbar-separator">

				</div>
				<div className="toolbar-middle">
					<div className="action-points">
						<span className="action-points-label">Action points</span>
						<span className="action-points-value">{gameStateManager.state.currentAP} / {gameStateManager.state.currentMaxAP}</span>
					</div>
				</div>
				<div className="toolbar-separator">

				</div>
				<div className="toolbar-right">
					{
						gameStateManager.state.currentDice.map((face, index) => <Dice side={face} key={`dice-${index}`}/>)
					}
				</div>
			</div>
		</div>
	)
}
