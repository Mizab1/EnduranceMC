import { abs, effect, execute, fill, gamemode, MCFunction, MCFunctionInstance, playsound, rel, Selector, setblock, sleep, spawnpoint, tellraw, TimeArgument, title, tp, _ } from "sandstone";
import { clearedLevel4Tag, clearedLevel5Tag, failedTag, infoLvl5 } from "../constants";
import { levelCleared, self } from "../main";
import { isSneaking } from "../predicates";
import { setupLevel6 } from "./level6";

const tagLevel: string = clearedLevel5Tag;
const previousLevel: string = clearedLevel4Tag;
const clearBlockTime: TimeArgument = '45s';

// neccessary vars
// const totalPlayersThatClearedLevel5Obj: ObjectiveInstance<string> = Objective.create(
//     'limit_level5',
//     'dummy'
// );
// export const totalPlayersThatClearedLevel5: Score<string> = totalPlayersThatClearedLevel5Obj('player_cleared_lvl_5');

// setup
export const setupLevel5: MCFunctionInstance<void> = MCFunction('levels/lvl5/setup', () => {
    levelCleared.set(4);
    gamemode('adventure', Selector('@a', {
        tag: ['!' + failedTag]
    }));


    tp('@a', infoLvl5.tp, infoLvl5.facing);
    spawnpoint('@a', infoLvl5.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl5.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 5 ================\n",
                color: "gray"
            }, {
                text: "This is fifth level of the game. \n",
                color: "gold"
            }, {
                text: "You have to stay on ladder but no sneaking allowed.\n",
                color: "gold"
            }, {
                text: "Every 45 seconds 1 block from top disappears. \n",
                color: "gold"
            }, {
                text: "The last player standing will win. \n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);
        clearBlock();
})

// level 5 complition
export const lvl5Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl5/complition', async () => {

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 5!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
    setupLevel6();
})

// detect fall
export const detectFallLevel5: MCFunctionInstance<void> = MCFunction('levels/lvl5/detect_fall', () => {
    execute.as('@a').at(self).run(() => {
        _.if(_.block(rel(0, -2, 0), 'minecraft:end_portal'), () => {
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
            tp(self, infoLvl5.tp, infoLvl5.facing);
            playsound('minecraft:block.note_block.didgeridoo', 'master', self, rel(0, 0, 0), 2);
        })
        _.if(_.block(rel(0, -0.35, 0), 'minecraft:smooth_basalt'), () => {
            tellraw(self, [{
                text: "\n==========================\n",
                color: "gray"
            }, {
                text: "You reached top :(\n",
                color: "red"
            }, {
                text: "==========================\n",
                color: "gray"
            }]);
            tp(self, infoLvl5.tp, infoLvl5.facing);
            playsound('minecraft:block.note_block.didgeridoo', 'master', self, rel(0, 0, 0), 2);
        })
    })
})
// detect sneaking
export const detectSneakingLvl5 = MCFunction('levels/lvl5/detect_sneaking_lvl5', () => {
    execute.as(Selector('@a', {
        x: 86,
        y: 97,
        z: 180,
        dx: -69,
        dy:20,
        dz:57,
        predicate: isSneaking
    })).at(self).run(() => {
        tp(self, infoLvl5.tp, infoLvl5.facing);
        tellraw(self, [
            {
                text: "==========================\n",
                color: "gray"
            },{
                text: "You sneaked :(\n",
                color: 'red'
            }, {
                text: "==========================\n",
                color: "gray"
            }
        ])
    })
})

// clear block every 45 seconds
const clearBlock: MCFunctionInstance = MCFunction('levels/lvl5/clear_block', async () => {
    for(let i = 0; i < 12; i++){
        await sleep(clearBlockTime);
        setblock(abs(77, 111 - i, 214), 'air');
        setblock(abs(55, 111 - i, 214), 'air');
        setblock(abs(33, 111 - i, 214), 'air');

        setblock(abs(33, 111 - i, 192), 'air');
        setblock(abs(55, 111 - i, 192), 'air');
        setblock(abs(77, 111 - i, 192), 'air');
    }
})

//reset 
const reset: MCFunctionInstance = MCFunction('levels/lvl5/reset', () => {
    fill(abs(77, 111, 214), abs(77, 97, 214), 'minecraft:smooth_basalt');
    fill(abs(77, 111, 213), abs(77, 97, 213), 'minecraft:ladder');
    fill(abs(55, 111, 214), abs(55, 97, 214), 'minecraft:smooth_basalt');
    fill(abs(55, 111, 213), abs(55, 97, 213), 'minecraft:ladder');
    fill(abs(33, 111, 214), abs(33, 97, 214), 'minecraft:smooth_basalt');
    fill(abs(33, 111, 213), abs(33, 97, 213), 'minecraft:ladder');

    fill(abs(33, 111, 192), abs(33, 97, 192), 'minecraft:smooth_basalt');
    fill(abs(33, 111, 193), abs(33, 97, 193), 'minecraft:ladder[facing=south]');
    fill(abs(55, 111, 192), abs(55, 97, 192), 'minecraft:smooth_basalt');
    fill(abs(55, 111, 193), abs(55, 97, 193), 'minecraft:ladder[facing=south]');
    fill(abs(77, 111, 192), abs(77, 97, 192), 'minecraft:smooth_basalt');
    fill(abs(77, 111, 193), abs(77, 97, 193), 'minecraft:ladder[facing=south]');
})