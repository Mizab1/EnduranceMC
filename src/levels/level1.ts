import { abs, effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, ObjectiveInstance, playsound, rel, Score, Selector, setblock, sleep, spawnpoint, tag, tellraw, title, tp, _ } from "sandstone";
import { box1, box10, box2, box3, box4, box5, box6, box7, box8, box9, clearedLevel1Tag, excluded, failedTag, infoLvl1 } from "../constants";
import { failedFunction, self } from "../main";
import { setupLevel2 } from "./level2";

// neccessary vars
const totalPlayersThatClearedLevel1Obj: ObjectiveInstance<string> = Objective.create(
    'limit_level1',
    'dummy'
);
export const totalPlayersThatClearedLevel1: Score<string> = totalPlayersThatClearedLevel1Obj('player_cleared_lvl_1');


export const alreadyInBox = 'already_in_box'

const barrier1 = abs(68, 101, 279);
const barrier2 = abs(68, 101, 291);
const barrier3 = abs(68, 101, 303);
const barrier4 = abs(68, 101, 315);
const barrier5 = abs(68, 101, 327);

const barrier6 = abs(58, 101, 327);
const barrier7 = abs(58, 101, 315);
const barrier8 = abs(58, 101, 303);
const barrier9 = abs(58, 101, 291);
const barrier10 = abs(58, 101, 279);

export const barrierLvl1 = [barrier1, barrier2, barrier3, barrier4, barrier5, barrier6, barrier7, barrier8, barrier9, barrier10];


const tagLevel = clearedLevel1Tag;

// setup
export const setupLevel1: MCFunctionInstance<void> = MCFunction('levels/lvl1/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: ['!' + failedTag, `!${excluded}`]
    }));

    
    spawnpoint('@a', infoLvl1.tp);
    tpEachToLevel1();
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
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag, `!${excluded}` ] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 1!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give(Selector('@a', { tag: `!${excluded}`}), 'minecraft:blindness', 3, 0, true);
    await sleep('30t');

    // next level
    setupLevel2();
})

MCFunction('levels/lvl1/force_next_lvl', () => {
    lvl1Complition();
})

const tpEachToLevel1 = MCFunction('levels/lvl1/tp_to_platform', async () => {
    tp(Selector('@a', { tag: `!${excluded}` }), infoLvl1.tp, infoLvl1.facing);

    const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9, box10];
    boxes.forEach((value) => {
        execute.positioned(value).as(Selector('@a', { tag: [ `!${alreadyInBox}`, `!${excluded}`], limit: 1 })).run(() => {
            tp('@s', rel(0, 0, 0));
            tag('@s').add(alreadyInBox);
        })
    })


    for (let i = 3; i >= 1; i--) {
        await sleep('1s');
        title(Selector('@a', { tag: `!${excluded}` })).title([{text: `${i}`, color: 'dark_green'}]) ;       
    }
    await sleep('1s');
    title(Selector('@a', { tag: `!${excluded}` })).title([{text: `Go`, color: 'gold'}])
    
    barrierLvl1.forEach((value) => {
        setblock(value, 'air');
    })
})