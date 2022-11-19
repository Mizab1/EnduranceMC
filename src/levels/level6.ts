import { effect, execute, gamemode, MCFunction, MCFunctionInstance, playsound, Selector, sleep, spawnpoint, tellraw, title, tp } from "sandstone";
import { clearedLevel5Tag, clearedLevel6Tag, excluded, failedTag, infoLvl6 } from "../constants";
import { self } from "../main";
import { setupLevel7 } from "./level7";

const tagLevel: string = clearedLevel6Tag;
const previousLevel: string = clearedLevel5Tag;

// neccessary vars
// const totalPlayersThatClearedLevel6Obj: ObjectiveInstance<string> = Objective.create(
//     'limit_level6',
//     'dummy'
// );
// export const totalPlayersThatClearedLevel6: Score<string> = totalPlayersThatClearedLevel6Obj('player_cleared_lvl_6');

// setup
export const setupLevel6: MCFunctionInstance<void> = MCFunction('levels/lvl6/setup', () => {
    gamemode('survival', Selector('@a', {
        tag: ['!' + failedTag, `!${excluded}`]
    }));


    tp(Selector('@a', { tag: `!${excluded}` }), infoLvl6.tp, infoLvl6.facing);
    spawnpoint('@a', infoLvl6.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl6.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 6 ================\n",
                color: "gray"
            }, {
                text: "This is sixth level of the game. \n",
                color: "gold"
            }, {
                text: "You have to find all the items that Nathan asked.\n",
                color: "gold"
            }, {
                text: "One who failed to find the item will be eliminated. \n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);
})

// level 6 complition
export const lvl6Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl6/complition', async () => {

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag, `!${excluded}`] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 6!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give(Selector('@a', { tag: `!${excluded}` }), 'minecraft:blindness', 3, 0, true);
    setupLevel7();
})
