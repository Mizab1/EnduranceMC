import { clear, effect, execute, gamemode, give, kill, MCFunction, MCFunctionInstance, NBT, Objective, ObjectiveInstance, playsound, rel, Score, Selector, sleep, spawnpoint, summon, tag, tellraw, title, tp, _ } from "sandstone";
import { chest1, chest2, chest3, chest4, chest5, chest6, chest7, chest8, clearedLevel1Tag, clearedLevel2Tag, excluded, failedTag, infoLvl2 } from "../constants";
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
    gamemode('survival', Selector('@a', {
        tag: ['!' + failedTag, `!${excluded}`]
    }));

    give(Selector('@a', {
        gamemode: '!spectator',
        tag: `!${excluded}`
    }), 'minecraft:diamond_pickaxe' + `{display:{Name:'{"text":"Super Pickaxe","color":"gold","italic":false}'},CustomModelData:0011,Enchantments:[{id:"minecraft:efficiency",lvl:10s}]}`, 1)

    tp(Selector('@a', {tag: `!${excluded}`}), infoLvl2.tp, infoLvl2.facing);
    spawnpoint('@a', infoLvl2.tp);
    playsound('minecraft:block.note_block.chime', 'master', '@a', infoLvl2.tp, 1, 0.5);
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
                text: "There are 8 chests \n",
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


// player cleared the level
export const clearedLvl2 = () => {
    execute.as(Selector('@a', { gamemode: "!spectator" })).at(self).run(() => {
        _.if(_.and(Selector('@s', { predicate: checkKey }), Selector('@s', { tag: '!' + tagLevel })), () => {
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
    execute.as(Selector('@a', { tag: [tagLevel, '!' + failedTag, `!${excluded}`] })).at(self).run(() => {
        title(self).title([
            {
                text: "You cleared Level 2!",
                color: "gold"
            }
        ]);
        playsound('minecraft:ui.toast.challenge_complete', 'master', self)
    })
    effect.give(Selector('@a', {tag: `!${excluded}`}), 'minecraft:blindness', 3, 0, true);
    setupLevel3();
})

MCFunction('levels/lvl2/force_next_lvl', () => {
    lvl2Complition();
})

MCFunction('levels/lvl2/glow_chest', async () => {
    const loc = [chest1, chest2, chest3, chest4, chest5, chest6, chest7, chest8];
    const tag = 'glow_chest';

    loc.forEach((value) => {
        summon('minecraft:shulker', value, {
            Glowing: NBT.byte(1),
            NoAI: NBT.byte(1),
            Tags: [tag],
            ActiveEffects:[{
                Id:14,
                Amplifier:NBT.byte(1),
                Duration:999999
            }]
        })
    })

    await sleep('2s')
    tp(Selector('@e', { type:'minecraft:shulker', tag: tag }), rel(0, -600, 0))
})