import { abs, effect, execute, gamemode, MCFunction, Objective, playsound, rel, say, scoreboard, Selector, sleep, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel1Tag, failedTag, maxButtonPressed, noOfPlayer, tpLvl1, tpLvl2 } from "../constants";
import { failedFunction, self } from "../main";
import { setupLevel2 } from "./level2";

// neccessary vars
export const buttonPressedObj = Objective.create(
    'button_pressed',
    'dummy',
    [
        {
            text: 'Button Pressed:',
            color: "yellow"
        }
    ]
);
export const myButtonPressed = buttonPressedObj('@s');
export const allButtonPressed = buttonPressedObj('@a');

const totalPlayersThatClearedLevel1Obj = Objective.create(
    'limit_level1',
    'dummy'
);
export const totalPlayersThatClearedLevel1 = totalPlayersThatClearedLevel1Obj('player_cleared_lvl_1');


// setup
export const setupLevel1 = MCFunction('levels/lvl1/setup', () => {
    gamemode('survival', Selector('@a', {
        tag: [ clearedLevel1Tag, '!' + failedTag ]
    }));

    tp('@a', tpLvl1, ["90", "0"]);
    playsound('minecraft:block.note_block.chime', 'master', '@a', tpLvl1, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }), 
    [
        {
            text: "================ Level 1 ================\n",
            color: "gray"
        }, {
            text: "This is first level of the game. \n",
            color: "gold"
        }, {
            text: "Here you have to press 1,000 buttons \n",
            color: "gold"
        }, {
            text: "The first to do the same will win and proceed to the next level. \n",
            color: "gold"
        }, {
            text: "The one who fail to do the same will be eliminated. \n",
            color: "gold"
        }, {
            text: "========================================\n",
            color: "gray"
        }
    ]);
    scoreboard.objectives.setDisplay('sidebar', 'button_pressed');
    allButtonPressed.set(0);
    
})

// ButtonPressed check
MCFunction('levels/lvl1/button_pressed', () => {
    execute.positioned(rel(0, 1, 0)).as(Selector('@a', {distance: [null, 1.5]})).run(() => {
        myButtonPressed.add(1);
    })
})

// player cleared the level
export const clearedLvl1 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator"})).at(self).run(() => {
        _.if(_.and(myButtonPressed.matches([maxButtonPressed, null]), Selector('@s', { tag: '!' + clearedLevel1Tag })), () => {
            playsound('minecraft:block.note_block.chime', 'master', self)
            gamemode('spectator', self);
            tag(self).add(clearedLevel1Tag);
            title(self).title([{ text: "Level 1 Cleared!", color: "gold"}]);
            title(self).subtitle([{ text: "Good Job!", color: "gold"}]);

            totalPlayersThatClearedLevel1.add(1);
        })
    })
} 

// level 1 complition
export const lvl1Complition = MCFunction('levels/lvl1/complition', async () => {
    scoreboard.objectives.remove('button_pressed');

    // elimination
    failedFunction(clearedLevel1Tag);

    await sleep('10t');
    execute.as(Selector('@a', { tag: [ clearedLevel1Tag, '!' + failedTag ]})).at(self).run(() => {
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