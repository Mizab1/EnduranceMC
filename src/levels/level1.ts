import { effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, ObjectiveInstance, playsound, Score, scoreboard, Selector, sleep, spawnpoint, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel1Tag, failedTag, infoLvl1 } from "../constants";
import { failedFunction, self } from "../main";
import { setupLevel2 } from "./level2";

// neccessary vars
const totalPlayersThatClearedLevel1Obj: ObjectiveInstance<string> = Objective.create(
    'limit_level1',
    'dummy'
);
export const totalPlayersThatClearedLevel1: Score<string> = totalPlayersThatClearedLevel1Obj('player_cleared_lvl_1');


const tagLevel = clearedLevel1Tag;

// setup
export const setupLevel1: MCFunctionInstance<void> = MCFunction('levels/lvl1/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: ['!' + failedTag]
    }));

    tp('@a', infoLvl1.tp, infoLvl1.facing);
    spawnpoint('@a', infoLvl1.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl1.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 1 ================\n",
                color: "gray"
            }, {
                text: "This is first level of the game. \n",
                color: "gold"
            }, {
                text: "Here you have to press the button 1,000 times \n",
                color: "gold"
            }, {
                text: "The first to do the same will win and proceed to the next level. \n",
                color: "gold"
            }, {
                text: "The one who fail to do the same will be eliminated. 9 player will win and \n the remaining 1 will be eliminated.\n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);

})


// player cleared the level
export const clearedLvl1 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(Selector('@s', { tag: [ 'winner', '!' + tagLevel , '!' + failedTag] }), () => {
            playsound('minecraft:block.note_block.chime', 'master', self)
            gamemode('spectator', self);
            tag(self).add(tagLevel);
            title(self).title([{ text: "Level 1 Cleared!", color: "gold" }]);
            title(self).subtitle([{ text: "Good Job!", color: "gold" }]);

            totalPlayersThatClearedLevel1.add(1);
        })
    })
}

// level 1 complition
export const lvl1Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl1/complition', async () => {
    // elimination
    failedFunction(tagLevel);

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 1!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
    await sleep('30t');

    // next level
    setupLevel2();
})

MCFunction('levels/lvl1/force_next_lvl', () => {
    lvl1Complition();
})