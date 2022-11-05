import { effect, execute, gamemode, MCFunction, Objective, playsound, rel, Selector, sleep, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel2Tag, clearedLevel3Tag, failedTag, tpLvl3 } from "../constants";
import { failedFunction, self } from "../main";

const tagLevel = clearedLevel3Tag;
const previousLevel = clearedLevel2Tag;

// neccessary vars
const totalPlayersThatClearedLevel3Obj = Objective.create(
    'limit_level3',
    'dummy'
);
export const totalPlayersThatClearedLevel3 = totalPlayersThatClearedLevel3Obj('player_cleared_lvl_3');

// setup
export const setupLevel3 = MCFunction('levels/lvl3/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: [previousLevel, '!' + failedTag]
    }));


    tp('@a', tpLvl3, ["90", "0"]);
    playsound('minecraft:block.note_block.chime', 'master', '@a', tpLvl3, 1, 0.5);
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
                text: "If you fall, your progress will be reset. \n",
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
export const detectFall = MCFunction('detect_fall', () => {
    execute.as('@a').at(self).if(_.block(rel(0, -0.35, 0), 'minecraft:red_stained_glass')).run(() => {
        tellraw(self, [{
            text: "==========================\n",
            color: "gray"
        }, {
            text: "You fell :(\n",
            color: "red"
        }, {
            text: "==========================\n",
            color: "gray"
        }]);
        tp(self, tpLvl3, ['90', '0']);
        playsound('minecraft:block.note_block.didgeridoo', 'master', self, rel(0, 0, 0), 2);
    })
})

// player cleared the level
export const clearedLvl3 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(_.and(_.block(rel(0, -0.35, 0), 'minecraft:polished_granite'), Selector('@s', { tag: '!' + tagLevel })), () => {
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
export const lvl3Complition = MCFunction('levels/lvl3/complition', async () => {

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
})