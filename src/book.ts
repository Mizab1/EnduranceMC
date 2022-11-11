import { MCFunction, raw, tp } from "sandstone";
import { hubCoord } from "./constants";
import { setupLevel1 } from "./levels/level1";


// hehe boi, ik this is ugly 
const NEWLINE = '\\\\n';

MCFunction('give_book', () => {
    raw(`give @s written_book{
        title:"Control Book",
        author:"",
        pages:[
            '[
                {
                    "text":"This Book is for${NEWLINE}controlling the${NEWLINE}game",
                    "color":"gold",
                    "underlined":true
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"TP all player to${NEWLINE}level 1",
                    "color":"blue",
                    "underlined":false,
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:tp_to_lvl_1"
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"1. Force clear ${NEWLINE}level 1 ",
                    "color":"blue",
                    "underlined":false,
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl1/force_next_lvl"
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"2. Force clear ${NEWLINE}level 2",
                    "color":"blue",
                    "underlined":false,
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl2/force_next_lvl"
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                }
            ]','[
                {
                    "text":"3. Force clear level 3",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl3/force_next_lvl"
                    }
                }
            ]','[
                {
                    "text":"To Clear level 4, type /tag [player name] add failed_at_4 ",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"To Clear level 5, type /tag [player name] add failed_at_5",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"To Clear level 6, type /tag [player name] add failed_at_6",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                }
            ]','[
                {
                    "text":"To Clear level 7, type /tag [player name] add won_tmp",
                    "color":"blue"
                }
            ]'
        ]
        } 1`.replace(/\n/g, '').replace(/ +/, ' '));
    // give(self, 'minecraft:written_book' + `{title:"Control Book",author:"",pages:['[{"text":"This Book is for${NEWLINE}controlling the${NEWLINE}game","color":"gold","underlined":true},{"text":"${NEWLINE}${NEWLINE}"},{"text":"TP all player to${NEWLINE}level 1","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:tp_to_lvl_1"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"1. Force clear ${NEWLINE}level 1 ","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl1/force_next_lvl"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"2. Force clear ${NEWLINE}level 2","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl2/force_next_lvl"}}]']}`, 1);
})

// tp to level 1 
MCFunction('tp_to_lvl_1', () => {
    setupLevel1();
})

// tp to hub
MCFunction('tp_to_hub', () => {
    tp('@a', hubCoord, ['0', '0'])
})