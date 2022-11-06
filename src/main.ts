import { effect, execute, gamemode, gamerule, MCFunction, say, Selector, SelectorClass, sleep, tag, title, tp, _ } from "sandstone";
import { failedTag, hubCoord, noOfPlayer } from "./constants";
import { clearedLvl1, lvl1Complition, setupLevel1, totalPlayersThatClearedLevel1 } from "./levels/level1";
import { clearedLvl2, lvl2Complition, totalPlayersThatClearedLevel2 } from "./levels/level2";
import { clearedLvl3, detectFall, lvl3Complition, totalPlayersThatClearedLevel3 } from "./levels/level3";

// variables 

// selectors
export const self: SelectorClass<true, true> = Selector('@s');

// functions
export const failedFunction = (tagName) => {
    execute.as(Selector('@a', {
        tag: ['!' + tagName, '!' + failedTag]
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
    //effects 
    effect.give('@a', 'minecraft:night_vision', 999, 0, true);
    effect.give('@a', 'minecraft:saturation', 999, 4, true);
    effect.give('@a', 'minecraft:regeneration', 999, 3, true);
    effect.give('@a', 'minecraft:resistance', 999, 3, true);

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

    //level 3
    clearedLvl3();
    detectFall();
    _.if(totalPlayersThatClearedLevel3.matches([(noOfPlayer - 3), null]), () => {
        totalPlayersThatClearedLevel3.set(0);
        lvl3Complition();
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
