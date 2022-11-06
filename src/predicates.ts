import { Predicate, PredicateInstance } from "sandstone";

export const checkKey: PredicateInstance = Predicate('check_key', {
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