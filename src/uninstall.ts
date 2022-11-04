import { MCFunction, scoreboard, tag } from "sandstone";
import { clearedLevel1 } from "./constants";

// remove scores
MCFunction('uninstall/remove_scores', () => {
    scoreboard.objectives.remove('button_pressed');
})

// remove tag
MCFunction('uninstall/remove_tags', () => {
    tag('@a').remove(clearedLevel1)
})