import { execute, gamemode, gamerule, MCFunction, Objective, Selector, SelectorClass, tag, title, tp, _ } from "sandstone";
import { clearedLevel1Tag, clearedLevel2Tag, failedTag, hubCoord, noOfPlayer, tpLvl1 } from "./constants";
import { clearedLvl1, lvl1Complition, setupLevel1, totalPlayersThatClearedLevel1 } from "./levels/level1";
import { clearedLvl2, lvl2Complition, totalPlayersThatClearedLevel2 } from "./levels/level2";

// variables 

// selectors
export const self: SelectorClass<true, true> = Selector('@s');

// functions
export const failedFunction = (tagName) => {
    execute.as(Selector('@a', {
        tag: [ '!' + tagName, '!' + failedTag ]
    })).run(() => {
        tag(self).add(failedTag)
        gamemode('spectator', self);
        title(self).title([{
            text: "You Failed",
            color: 'red'
        }])
    })
} 

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
    clearedLvl1();
    // level 1 complition
    _.if(totalPlayersThatClearedLevel1.matches([(noOfPlayer - 1), null]), () => {
        totalPlayersThatClearedLevel1.set(0);
        lvl1Complition();
    })

    //level 2
    clearedLvl2();
    _.if(totalPlayersThatClearedLevel2.matches([(noOfPlayer - 2), null]), () => {
        totalPlayersThatClearedLevel2.set(0);
        lvl2Complition();
    })
}, {
    runEachTick: true
})

// hub button
MCFunction('hub_button', () => {
    setupLevel1();
})
MCFunction('tp_to_hub', () => {
    tp('@a', hubCoord, ['0', '0'])
})

