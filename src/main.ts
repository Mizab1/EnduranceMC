import { bossbar, effect, execute, gamemode, gamerule, MCFunction, Selector, SelectorClass, spawnpoint, tag, title, _ } from "sandstone";
import { failedTag, ForcedFailedAtLvl4, hubCoord, noOfPlayer } from "./constants";
import { clearedLvl1, lvl1Complition, totalPlayersThatClearedLevel1 } from "./levels/level1";
import { lvl2Complition, totalPlayersThatClearedLevel2 } from "./levels/level2";
import { clearedLvl3, detectFall, lvl3Complition, totalPlayersThatClearedLevel3 } from "./levels/level3";
import { getBossbarName, lvl4Complition } from "./levels/level4";

// variables 

// selectors
export const self: SelectorClass<true, true> = Selector('@s');

// functions
export const failedFunction = (tagName) => {
    execute.as(Selector('@a', {
        tag: ['!' + tagName, '!' + failedTag],
        limit: 1,
        sort: 'random'
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

    // spawnpoint to lobby
    spawnpoint('@a', hubCoord);
    
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
    // clearedLvl2();
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

    //level 4
    execute.as('@a').at(self).if(Selector('@s', { tag: ForcedFailedAtLvl4})).run(() => {
        bossbar.remove(getBossbarName());
        tag(self).remove(ForcedFailedAtLvl4);
        tag(self).add(failedTag)
        gamemode('spectator', self);
        title(self).title([{
            text: "You Failed",
            color: 'red'
        }])

        lvl4Complition();
    })
}, {
    runEachTick: true
})
