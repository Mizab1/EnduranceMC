import { Predicate } from "sandstone";

export const checkKey = Predicate('check_key', {
    "condition": "minecraft:entity_properties",
    "entity": "this",
    "predicate": {
        "equipment": {
            "mainhand": {
                "item": "minecraft:tripwire_hook",
                "nbt": "{CustomModelData:0001}"
            }
        }
    }   
})