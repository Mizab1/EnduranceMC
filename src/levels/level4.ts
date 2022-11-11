import { bossbar, clear, effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, playsound, Selector, sleep, spawnpoint, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel3Tag, failedTag, infoLvl4 } from "../constants";
import { self } from "../main";
import { setupLevel5 } from "./level5";

const previousLevel: string = clearedLevel3Tag;
const bossbarName: string = 'timer_lvl_4'
const maxTime: number = 10;

// neccessary vars
// const totalPlayersThatClearedLevel4Obj: ObjectiveInstance<string> = Objective.create(
//     'limit_level4',
//     'dummy'
// );
// export const totalPlayersThatClearedLevel4: Score<string> = totalPlayersThatClearedLevel4Obj('player_cleared_lvl_4');
const isPlayingLevel4Obj = Objective.create('is_playing_lvl_4', 'dummy');
const isPlayingLevel4 = isPlayingLevel4Obj('status');

// setup
export const setupLevel4: MCFunctionInstance<void> = MCFunction('levels/lvl4/setup', () => {
    isPlayingLevel4.set(1);
    gamemode('survival', Selector('@a', {
        tag: ['!' + failedTag]
    }));

    tp('@a', infoLvl4.tp, infoLvl4.facing);
    spawnpoint('@a', infoLvl4.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl4.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 4 ================\n",
                color: "gray"
            }, {
                text: "This is third level of the game. \n",
                color: "gold"
            }, {
                text: "You have to craft as many item as you can.\n",
                color: "gold"
            }, {
                text: "After the timer ends your items will be evaluated. \n",
                color: "gold"
            }, {
                text: "The person with the least items will fail. \n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]
    );
    
    // bossbar 
    bossbar.add(bossbarName , [{
        text: 'Timer for level 4',
        color: 'red'
    }]);
    bossbar.set(bossbarName).players('@a');
    bossbar.set(bossbarName).max(maxTime);
    bossbar.set(bossbarName).value(maxTime);
    bossbar.set(bossbarName).color('red');
    bossbar.set(bossbarName).style('notched_20');
    startTimer();

})

// level 4 complition
export const lvl4Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl4/complition', async () => {

    await sleep('10t');
    execute.as(Selector('@a', { tag: ['!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 4!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
    setupLevel5();
})

export const getBossbarName = () => bossbarName;

// timer
export const startTimer: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl4/start_timer', async () => {
    for(let i = maxTime; i >= 0; i--){
        await sleep('1s');
        bossbar.set(bossbarName).value(i);
        if(i == 0){
            bossbar.remove(bossbarName);
            _.if(isPlayingLevel4.matches(1), () => {
                tellraw(Selector('@a', { tag: `!${failedTag}`}), [
                    {
                        text: "========================================\n",
                        color: "gray"
                    }, {
                        text: "Now you must stop crafting and moving\n",
                        color: 'green'
                    }, {
                        text: "Your crafted item will be evaluated by the moderator\n",
                        color: 'green'
                    }, {
                        text: "========================================\n",
                        color: "gray"
                    }
                ]);
                clear('@a');
                isPlayingLevel4.set(0);
            })
        }
    }
})