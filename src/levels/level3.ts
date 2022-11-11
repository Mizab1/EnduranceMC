import { effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, ObjectiveInstance, playsound, rel, Score, Selector, sleep, spawnpoint, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel2Tag, clearedLevel3Tag, failedTag, infoLvl3 } from "../constants";
import { failedFunction, self } from "../main";
import { setupLevel4 } from "./level4";

const tagLevel: string = clearedLevel3Tag;
const previousLevel: string = clearedLevel2Tag;

// neccessary vars
const totalPlayersThatClearedLevel3Obj: ObjectiveInstance<string> = Objective.create(
    'limit_level3',
    'dummy'
);
export const totalPlayersThatClearedLevel3: Score<string> = totalPlayersThatClearedLevel3Obj('player_cleared_lvl_3');

// setup
export const setupLevel3: MCFunctionInstance<void> = MCFunction('levels/lvl3/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: ['!' + failedTag]
    }));


    tp('@a', infoLvl3.tp, infoLvl3.facing);
    spawnpoint('@a', infoLvl3.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl3.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 3 ================\n",
                color: "gray"
            }, {
                text: "This is third level of the game. \n",
                color: "gold"
            }, {
                text: "Here you have jump and reach the end of the parkour.\n",
                color: "gold"
            }, {
                text: "If you fall, your progress will reset. \n",
                color: "gold"
            }, {
                text: "The one who fail to finish will be eliminated. \n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);

})

// detect fall
export const detectFallLvl3: MCFunctionInstance<void> = MCFunction('levels/lvl3/detect_fall', () => {
    execute.as('@a').at(self).if(_.block(rel(0, -0.35, 0), 'minecraft:red_stained_glass')).run(() => {
        tellraw(self, [{
            text: "\n==========================\n",
            color: "gray"
        }, {
            text: "You fell :(\n",
            color: "red"
        }, {
            text: "==========================\n",
            color: "gray"
        }]);
        tp(self, infoLvl3.tp, infoLvl3.facing);
        playsound('minecraft:block.note_block.didgeridoo', 'master', self, rel(0, 0, 0), 2);
    })
})

// player cleared the level
export const clearedLvl3 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(_.and(Selector('@s', { x: -227, y: 97, z:262, dx:-4, dy:2, dz: -24}), Selector('@s', { tag: '!' + tagLevel })), () => {
            playsound('minecraft:block.note_block.chime', 'master', self)
            gamemode('spectator', self);
            tag(self).add(tagLevel);
            title(self).title([{ text: "Level 3 Cleared!", color: "gold" }]);
            title(self).subtitle([{ text: "Good Job!", color: "gold" }]);

            totalPlayersThatClearedLevel3.add(1)
        })
    })
}

// level 3 complition
export const lvl3Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl3/complition', async () => {

    // elimination
    failedFunction(tagLevel);

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 3!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
    setupLevel4();
})

MCFunction('levels/lvl3/force_next_lvl', () => {
    lvl3Complition();
})