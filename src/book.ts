import { give, MCFunction, raw, tp } from "sandstone";
import { hubCoord } from "./constants";
import { setupLevel1 } from "./levels/level1";
import { self } from "./main";


// hehe boi, ik this is ugly 
const NEWLINE = '\\\\n';

MCFunction('give_book', () => {
    give(self, 'minecraft:written_book' + `{title:"Control Book",author:"",pages:['[{"text":"This Book is for${NEWLINE}controlling the${NEWLINE}game","color":"gold","underlined":true},{"text":"${NEWLINE}${NEWLINE}"},{"text":"TP all player to${NEWLINE}level 1","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:tp_to_lvl_1"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"1. Force clear ${NEWLINE}level 1 ","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl1/force_next_lvl"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"2. Force clear ${NEWLINE}level 2","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl2/force_next_lvl"}}]']}`, 1);
})

// tp to level 1 
MCFunction('tp_to_lvl_1', () => {
    setupLevel1();
})

// tp to hub
MCFunction('tp_to_hub', () => {
    tp('@a', hubCoord, ['0', '0'])
})