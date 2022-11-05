import { MCFunction, scoreboard, tag } from "sandstone";
import { clearedLevel1Tag, clearedLevel2Tag, failedTag } from "./constants";
import { totalPlayersThatClearedLevel1 } from "./levels/level1";
import { totalPlayersThatClearedLevel2 } from "./levels/level2";

// remove scores
MCFunction('uninstall/remove_scores', () => {
    scoreboard.objectives.remove('button_pressed');
    totalPlayersThatClearedLevel1.set(0);
    totalPlayersThatClearedLevel2.set(0);
})

// remove tag
MCFunction('uninstall/remove_tags', () => {
    tag('@a').remove(clearedLevel1Tag);
    tag('@a').remove(clearedLevel2Tag);
    tag('@a').remove(failedTag);
})