import { gamerule, MCFunction, Objective, Selector, _ } from "sandstone";
import { clearedLvl1 } from "./levels/level1";

// variables 


const totalPlayersThatClearedLevel1 = Objective.create(
    'limit_level1',
    'dummy'
)

// selectors
export const self = Selector('@s')

//! LOAD
MCFunction('load', () => {
    // changes to game rule
    gamerule('doMobSpawning', false);
    gamerule('doWeatherCycle', false)
    gamerule('sendCommandFeedback', false);

}, {
    runOnLoad: true
})

// //! TICK
MCFunction('tick', () => {
    // level 1 cleared
    clearedLvl1()
}, {
    runEachTick: true
})

