import { MCFunction, raw, Selector, tellraw, title, tp } from "sandstone";
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
                    "text":"  Send start message",
                    "color":"blue",
                    "underlined":false,
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:send_start_msg"
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"1. Force complete ${NEWLINE}level 1 ",
                    "color":"blue",
                    "underlined":false,
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl1/force_next_lvl"
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"2. Force complete ${NEWLINE}level 2",
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
                    "text":"3. Force complete level 3",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl3/force_next_lvl"
                    }
                }
            ]','[
                {
                    "text":"To complete level 4, type: ${NEWLINE}/tag [player name] add failed_at_4 ",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"To complete level 5, type: ${NEWLINE}/tag [player name] add failed_at_5",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                },{
                    "text":"${NEWLINE}${NEWLINE}"
                },{
                    "text":"To complete level 6, type: ${NEWLINE}/tag [player name] add failed_at_6",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":""
                    }
                }
            ]','[
                {
                    "text":"To Clear level 7, type:${NEWLINE} /tag [player name] add won_tmp",
                    "color":"blue"
                }
            ]','[
                {
                    "text":"Glow chests in level 2${NEWLINE}${NEWLINE}",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl2/glow_chest"
                    }
                }, {
                    "text":"Lock chest in level 4${NEWLINE}${NEWLINE}",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl4/lock_chest"
                    }
                }, {
                    "text":"Key for chest in level 4",
                    "color":"blue",
                    "clickEvent":{
                        "action":"run_command",
                        "value":"/function endurance:levels/lvl4/give_key"
                    }
                }
            ]'
        ]
        } 1`.replace(/\n/g, '').replace(/ +/, ' '));
    // give(self, 'minecraft:written_book' + `{title:"Control Book",author:"",pages:['[{"text":"This Book is for${NEWLINE}controlling the${NEWLINE}game","color":"gold","underlined":true},{"text":"${NEWLINE}${NEWLINE}"},{"text":"TP all player to${NEWLINE}level 1","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:tp_to_lvl_1"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"1. Force clear ${NEWLINE}level 1 ","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl1/force_next_lvl"}},{"text":"${NEWLINE}${NEWLINE}"},{"text":"2. Force clear ${NEWLINE}level 2","color":"blue","underlined":false,"clickEvent":{"action":"run_command","value":"/function endurance:levels/lvl2/force_next_lvl"}}]']}`, 1);
})

// tp to level 1 
MCFunction('send_start_msg', () => {
    tellraw(Selector('@a'), [
        {
            text: 'Stand on the golden platform to start the game',
            color: 'gold'
        }
    ])
})

// tp to hub
MCFunction('tp_to_hub', () => {
    tp('@a', hubCoord, ['0', '0'])
})