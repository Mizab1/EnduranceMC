import { bossbar, effect, execute, gamemode, gamerule, MCFunction, Objective, ObjectiveInstance, Score, Selector, SelectorClass, spawnpoint, tag, title, _ } from "sandstone";
import { ConditionType } from "sandstone/flow";
import { failedTag, ForcedFailedAtLvl4, ForcedFailedAtLvl5, ForcedFailedAtLvl6, hubCoord, noOfPlayer, winner, winnerTmp } from "./constants";
import { clearedLvl1, lvl1Complition, totalPlayersThatClearedLevel1 } from "./levels/level1";
import { clearedLvl2, lvl2Complition, totalPlayersThatClearedLevel2 } from "./levels/level2";
import { clearedLvl3, detectFallLvl3, lvl3Complition, totalPlayersThatClearedLevel3 } from "./levels/level3";
import { getBossbarName, lvl4Complition } from "./levels/level4";
import { detectFallLevel5, detectSneakingLvl5, lvl5Complition } from "./levels/level5";
import { lvl6Complition } from "./levels/level6";
import { isPlayingLevel7, lvl7Complition } from "./levels/level7";

// variables 
const PlayerDeathObj: ObjectiveInstance = Objective.create('death_count', 'deathCount');
const playerDeath: Score<string> = PlayerDeathObj('@s');

const LevelClearedObj: ObjectiveInstance = Objective.create('level_clear_obj', 'dummy');
export const levelCleared: Score<string> = LevelClearedObj('level_cleared');

const playerDeathCondition: ConditionType = playerDeath.matches([1, null]);

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

        title(Selector('@a', { tag: `!${failedTag}` })).title([
            {
                text: 'You Cleared this level!',
                color: 'gold'
            }
        ])
    })
}

//! LOAD
MCFunction('load', () => {
    // changes to game rule
    gamerule('doMobSpawning', false);
    gamerule('doWeatherCycle', false)
    gamerule('sendCommandFeedback', false);
    gamerule('doImmediateRespawn', true);

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
    clearedLvl2();
    _.if(totalPlayersThatClearedLevel2.matches([(noOfPlayer - 2), null]), () => {
        totalPlayersThatClearedLevel2.set(0);
        lvl2Complition();
    })

    //level 3
    clearedLvl3();
    detectFallLvl3();
    _.if(totalPlayersThatClearedLevel3.matches([(noOfPlayer - 3), null]), () => {
        totalPlayersThatClearedLevel3.set(0);
        lvl3Complition();
    })

    //level 4
    execute.as('@a').at(self).if(Selector('@s', { tag: ForcedFailedAtLvl4})).run(() => {
        bossbar.remove(getBossbarName());
        tag(self).remove(ForcedFailedAtLvl4);
        tag(self).add(failedTag);
        gamemode('spectator', self);
        title(self).title([{
            text: "You Failed",
            color: 'red'
        }])

        lvl4Complition();
    })
    
    //level 5
    detectFallLevel5();
    detectSneakingLvl5();
    execute.as('@a').at(self).if(Selector('@s', { tag: ForcedFailedAtLvl5})).run(() => {
        tag(self).remove(ForcedFailedAtLvl5);
        tag(self).add(failedTag);
        gamemode('spectator', self);
        title(self).title([{
            text: "You Failed",
            color: 'red'
        }])

        title(Selector('@a', { tag: `!${failedTag}` })).title([
            {
                text: 'You Cleared this level!',
                color: 'gold'
            }
        ])

        lvl5Complition();
    })
    
    //level 6
    execute.as('@a').at(self).if(Selector('@s', { tag: ForcedFailedAtLvl6})).run(() => {
        tag(self).remove(ForcedFailedAtLvl6);
        tag(self).add(failedTag);
        gamemode('spectator', self);
        title(self).title([{
            text: "You Failed",
            color: 'red'
        }])

        title(Selector('@a', { tag: `!${failedTag}` })).title([
            {
                text: 'You Cleared this level!',
                color: 'gold'
            }
        ])

        lvl6Complition();
    })
    
    //level 7
    _.if(isPlayingLevel7.matches(1), () => {
        execute.as('@a').at(self).if(playerDeathCondition).run(() => {
            playerDeath.set(0);
    
            gamemode('spectator', self);
            title(self).title([
                {
                    text: 'You Lost :(',
                    color: 'red'
                }
            ])
        })
    }).else(() => {
        execute.as('@a').at(self).if(playerDeathCondition).run(() => {
            playerDeath.set(0);
        })
    })
    execute.as('@a').at(self).if(Selector('@s', { tag: winnerTmp})).run(() => {
        tag(self).remove(winnerTmp);
        tag(self).add(winner)

        lvl7Complition();
    })
}, {
    runEachTick: true
})
