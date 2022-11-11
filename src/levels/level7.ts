import { effect, execute, gamemode, MCFunction, MCFunctionInstance, Objective, playsound, raw, Selector, sleep, spawnpoint, tellraw, title, tp, worldborder } from "sandstone";
import { clearedLevel6Tag, failedTag, infoLvl6, infoLvl7, winner } from "../constants";
import { self } from "../main";

const isPlayingLevel7Obj = Objective.create('is_playing_lvl_7', 'dummy');
export const isPlayingLevel7 = isPlayingLevel7Obj('status');

const previousLevel: string = clearedLevel6Tag;

// neccessary vars
// const totalPlayersThatClearedLevel7Obj: ObjectiveInstance<string> = Objective.create(
//     'limit_level7',
//     'dummy'
// );
// export const totalPlayersThatClearedLevel7: Score<string> = totalPlayersThatClearedLevel7Obj('player_cleared_lvl_7');

// setup
export const setupLevel7: MCFunctionInstance<void> = MCFunction('levels/lvl7/setup', () => {
    gamemode('survival', Selector('@a', {
        tag: ['!' + failedTag]
    }));


    tp('@a', infoLvl7.tp, infoLvl7.facing);
    spawnpoint('@a', infoLvl7.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl6.tp, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 7 ================\n",
                color: "gray"
            }, {
                text: "This is seventh level of the game. \n",
                color: "gold"
            }, {
                text: "You have to survive and stay inside the circle.\n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);

    isPlayingLevel7.set(1);

    // edit worldborder
    raw(`worldborder center ${infoLvl7.worldBorder}`);
    worldborder.set(30, 20);
    worldborder.damageAmount(50);
    worldborder.damageBuffer(0);
})

// level 7 complition
export const lvl7Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl7/complition', async () => {

    await sleep('10t');
    execute.as(Selector('@a', { tag: [winner] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared all levels!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
        raw(`summon firework_rocket ~ ~ ~ {LifeTime:10,FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16746624,8287743]},{Type:0,Trail:1b,Colors:[I;14679872,16753451]},{Type:2,Flicker:1b,Colors:[I;4456703]}]}}}}`)
        raw(`summon firework_rocket ~1 ~ ~ {LifeTime:10,FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16746624,8287743]},{Type:0,Trail:1b,Colors:[I;14679872,16753451]},{Type:2,Flicker:1b,Colors:[I;4456703]}]}}}}`)
        raw(`summon firework_rocket ~-1 ~ ~ {LifeTime:10,FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Explosions:[{Type:1,Colors:[I;16746624,8287743]},{Type:0,Trail:1b,Colors:[I;14679872,16753451]},{Type:2,Flicker:1b,Colors:[I;4456703]}]}}}}`)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
})

export const resetWorldBorder: MCFunctionInstance<void> = MCFunction('levels/lvl7/reset_worldborder', () => {
    worldborder.set(999999);
})
