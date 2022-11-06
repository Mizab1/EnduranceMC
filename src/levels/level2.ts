import { clear, effect, execute, gamemode, give, MCFunction, MCFunctionInstance, Objective, ObjectiveInstance, playsound, Score, Selector, sleep, tag, tellraw, title, tp, _ } from "sandstone";
import { clearedLevel1Tag, clearedLevel2Tag, failedTag, tpLvl2 } from "../constants";
import { failedFunction, self } from "../main";
import { checkKey } from "../predicates";
import { setupLevel3 } from "./level3";

// key command
// /give @p tripwire_hook{display:{Name:'{"text":"Key","color":"gold","italic":false}'},CustomModelData:0001} 1

const tagLevel: string = clearedLevel2Tag;
const previousLevel: string = clearedLevel1Tag;

// neccessary vars
const totalPlayersThatClearedLevel2Obj: ObjectiveInstance<string> = Objective.create(
    'limit_level2',
    'dummy'
);
export const totalPlayersThatClearedLevel2: Score<string> = totalPlayersThatClearedLevel2Obj('player_cleared_lvl_2');

// setup
export const setupLevel2: MCFunctionInstance<void> = MCFunction('levels/lvl2/setup', () => {
    gamemode('adventure', Selector('@a', {
        tag: [previousLevel, '!' + failedTag]
    }));

    give(Selector('@a', {
        gamemode: '!spectator'
    }), 'minecraft:diamond_pickaxe' + `{CanDestroy:["minecraft:cobbled_deepslate"],display:{Name:'{"text":"Super Pickaxe","color":"gold","italic":false}'},CustomModelData:0011,Enchantments:[{id:"minecraft:efficiency",lvl:10s}]}`, 1)

    tp('@a', tpLvl2, ["-120", "0"]);
    playsound('minecraft:block.note_block.chime', 'master', '@a', tpLvl2, 1, 0.5);
    tellraw(Selector('@a', { gamemode: '!spectator' }),
        [
            {
                text: "================ Level 2 ================\n",
                color: "gray"
            }, {
                text: "This is second level of the game. \n",
                color: "gold"
            }, {
                text: "Here you have find the key that is \nscattered all around the map in a chest.\n",
                color: "gold"
            }, {
                text: "There are 8 chests, 5 on top and 3 underground. \n",
                color: "gold"
            }, {
                text: "The one who fail to find the key will be eliminated. \n",
                color: "gold"
            }, {
                text: "========================================\n",
                color: "gray"
            }
        ]);

})

// TODO make a machanism for checking the key
// player cleared the level
export const clearedLvl2 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(_.and(Selector('@s', {
            predicate: checkKey
        }), Selector('@s', { tag: '!' + tagLevel })), () => {
            clear(self, 'minecraft:tripwire_hook');
            playsound('minecraft:block.note_block.chime', 'master', self)
            gamemode('spectator', self);
            tag(self).add(tagLevel);
            title(self).title([{ text: "Level 2 Cleared!", color: "gold" }]);
            title(self).subtitle([{ text: "Good Job!", color: "gold" }]);

            totalPlayersThatClearedLevel2.add(1)
        })
    })
}

// level 2 complition
export const lvl2Complition: MCFunctionInstance<Promise<void>> = MCFunction('levels/lvl2/complition', async () => {

    // elimination
    failedFunction(tagLevel);

    await sleep('10t');
    clear('@a', 'minecraft:diamond_pickaxe');
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 2!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give('@a', 'minecraft:blindness', 3, 0, true);
    setupLevel3();
})