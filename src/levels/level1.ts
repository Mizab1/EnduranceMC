import { execute, gamemode, MCFunction, Objective, playsound, rel, scoreboard, Selector, tag, tellraw, title, _ } from "sandstone";
import { clearedLevel1, maxButtonPressed } from "../constants";
import { self } from "../main";

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

// setup
MCFunction('levels/lvl1/setup', () => {
    tellraw('@a', 
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
        _.if(_.and(myButtonPressed.matches([maxButtonPressed, null]), Selector('@s', { tag: '!' + clearedLevel1 })), () => {
            gamemode('spectator', self);
            tag(self).add(clearedLevel1);
            title(self).title([{ text: "Level 1 Cleared!", color: "gold"}]);
            title(self).subtitle([{ text: "Good Job!", color: "gold"}]);
            playsound('minecraft:ui.toast.challenge_complete', 'master', self)
        })
    })
} 