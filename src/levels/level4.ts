import { abs, effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, ObjectiveInstance, playsound, rel, Score, Selector, setblock, sleep, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel3Tag, clearedLevel4Tag, failedTag, tpLvl4 } from "../constants";
import { failedFunction, self } from "../main";

const tagLevel: string = clearedLevel4Tag;
const previousLevel: string = clearedLevel3Tag;

// neccessary vars
const totalPlayersThatClearedLevel4Obj: ObjectiveInstance<string> = Objective.create(
    'limit_level4',
    'dummy'
);
export const totalPlayersThatClearedLevel4: Score<string> = totalPlayersThatClearedLevel4Obj('player_cleared_lvl_4');

// setup
export const setupLevel4: MCFunctionInstance<void> = MCFunction('levels/lvl4/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: [previousLevel, '!' + failedTag]
    }));


    tp('@a', tpLvl4, ["90", "0"]);
    playsound('minecraft:block.note_block.chime', 'master', '@a', tpLvl4, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 4 ================\n",
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

// player cleared the level
export const clearedLvl4 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(_.and(_.block(rel(0, -0.35, 0), 'minecraft:polished_granite'), Selector('@s', { tag: '!' + tagLevel })), () => {
            playsound('minecraft:block.note_block.chime', 'master', self)
            gamemode('spectator', self);
            tag(self).add(tagLevel);
            title(self).title([{ text: "Level 4 Cleared!", color: "gold" }]);
            title(self).subtitle([{ text: "Good Job!", color: "gold" }]);

            totalPlayersThatClearedLevel4.add(1)
        })
    })
}

// level 4 complition
export const lvl4Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl4/complition', async () => {

    // elimination
    failedFunction(tagLevel);

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 4!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
})

// timer init
MCFunction('levels/lvl4/timer_init', () => {
    setblock(abs(132, 22, 116), 'minecraft:redstone_block');
    setblock(abs(132, 22, 116), 'minecraft:air');
})