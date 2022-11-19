import { abs, effect, execute, fill, gamemode, kill, MCFunction, MCFunctionInstance, Objective, playsound, rel, Selector, setblock, sleep, spawnpoint, tag, tellraw, TimeArgument, title, tp, _ } from "sandstone";
import { clearedLevel4Tag, clearedLevel5Tag, excluded, failedTag, infoLvl5 } from "../constants";
import { levelCleared, self } from "../main";
import { isSneaking } from "../predicates";
import { setupLevel6 } from "./level6";

const tagLevel: string = clearedLevel5Tag;
const previousLevel: string = clearedLevel4Tag;

const clearBlockTime: TimeArgument = '45s';
export const alreadyInBoxLvl5 = 'already_in_box_lvl5';

const isPlayingLevel5Obj = Objective.create('is_playing_lvl_5', 'dummy');
export const isPlayingLevel5 = isPlayingLevel5Obj('status');

const ladder1 = abs(77, 99, 211);
const ladder2 = abs(55, 99, 211);
const ladder3 = abs(33, 99, 211);

const ladder4 = abs(33, 99, 195);
const ladder5 = abs(55, 99, 195);
const ladder6 = abs(77, 99, 195);

export const barrierLvl5 = [abs(77, 98, 211), abs(55, 98, 211), abs(33, 98, 211), abs(33, 98, 195), abs(55, 98, 195), abs(77, 98, 195)]

// neccessary vars
// const totalPlayersThatClearedLevel5Obj: ObjectiveInstance<string> = Objective.create(
//     'limit_level5',
//     'dummy'
// );
// export const totalPlayersThatClearedLevel5: Score<string> = totalPlayersThatClearedLevel5Obj('player_cleared_lvl_5');

// setup
export const setupLevel5: MCFunctionInstance<void> = MCFunction('levels/lvl5/setup', () => {
    isPlayingLevel5.set(1);
    levelCleared.set(4);
    gamemode('adventure', Selector('@a', {
        tag: ['!' + failedTag, `!${excluded}`]
    }));

    tpEachToLevel5();
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
        ]
    );
    clearBlock();
})

// level 5 complition
export const lvl5Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl5/complition', async () => {
    isPlayingLevel5.set(0);

    await sleep('10t');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag, `!${excluded}`] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 5!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give(Selector('@a', { tag: `!${excluded}` }), 'minecraft:blindness', 3, 0, true);
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
        setblock(abs(77, 111 - i, 213), 'air');
        setblock(abs(77, 111 - i, 214), 'air');
        setblock(abs(55, 111 - i, 213), 'air');
        setblock(abs(55, 111 - i, 214), 'air');
        setblock(abs(33, 111 - i, 213), 'air');
        setblock(abs(33, 111 - i, 214), 'air');

        setblock(abs(33, 111 - i, 193), 'air');
        setblock(abs(33, 111 - i, 192), 'air');
        setblock(abs(55, 111 - i, 193), 'air');
        setblock(abs(55, 111 - i, 192), 'air');
        setblock(abs(77, 111 - i, 193), 'air');
        setblock(abs(77, 111 - i, 192), 'air');
    }
})

//reset 
export const reset: MCFunctionInstance = MCFunction('levels/lvl5/reset', () => {
    fill(abs(77, 111, 213), abs(77, 97, 213), 'minecraft:ladder');
    fill(abs(77, 111, 214), abs(77, 97, 214), 'minecraft:smooth_basalt');
    fill(abs(55, 111, 213), abs(55, 97, 213), 'minecraft:ladder');
    fill(abs(55, 111, 214), abs(55, 97, 214), 'minecraft:smooth_basalt');
    fill(abs(33, 111, 213), abs(33, 97, 213), 'minecraft:ladder');
    fill(abs(33, 111, 214), abs(33, 97, 214), 'minecraft:smooth_basalt');

    fill(abs(33, 111, 193), abs(33, 97, 193), 'minecraft:ladder[facing=south]');
    fill(abs(33, 111, 192), abs(33, 97, 192), 'minecraft:smooth_basalt');
    fill(abs(55, 111, 193), abs(55, 97, 193), 'minecraft:ladder[facing=south]');
    fill(abs(55, 111, 192), abs(55, 97, 192), 'minecraft:smooth_basalt');
    fill(abs(77, 111, 193), abs(77, 97, 193), 'minecraft:ladder[facing=south]');
    fill(abs(77, 111, 192), abs(77, 97, 192), 'minecraft:smooth_basalt');
})

const tpEachToLevel5 = MCFunction('levels/lvl5/tp_to_platform', async () => {
    tp(Selector('@a', { tag: `!${excluded}` }), infoLvl5.tp, infoLvl5.facing);

    const boxes = [ladder1, ladder2, ladder3, ladder4, ladder5, ladder6];
    boxes.forEach((value) => {
        execute.positioned(value).as(Selector('@a', { tag: [ `!${alreadyInBoxLvl5}`, `!${excluded}`], limit: 1 })).run(() => {
            tp('@s', rel(0, 0, 0));
            tag('@s').add(alreadyInBoxLvl5);
        })
    })


    for (let i = 3; i >= 1; i--) {
        await sleep('1s');
        title(Selector('@a', { tag: `!${excluded}` })).title([{text: `${i}`, color: 'dark_green'}]) ;       
    }
    await sleep('1s');
    title(Selector('@a', { tag: `!${excluded}` })).title([{text: `Go`, color: 'gold'}])
    
    barrierLvl5.forEach((value) => {
        setblock(value, 'air');
    })
})