import { functionCmd, MCFunction, raw, scoreboard, tag } from "sandstone";
import { clearedLevel1Tag, clearedLevel2Tag, clearedLevel3Tag, clearedLevel4Tag, clearedLevel6Tag, failedTag, ForcedFailedAtLvl4, ForcedFailedAtLvl5, ForcedFailedAtLvl6, ForcedFailedAtLvl7, winner } from "./constants";
import { totalPlayersThatClearedLevel1 } from "./levels/level1";
import { totalPlayersThatClearedLevel2 } from "./levels/level2";
import { totalPlayersThatClearedLevel3 } from "./levels/level3";
import { isPlayingLevel7, resetWorldBorder } from "./levels/level7";

// remove scores
MCFunction('uninstall/remove_scores', () => {
    scoreboard.objectives.remove('button_pressed');
    totalPlayersThatClearedLevel1.set(0);
    totalPlayersThatClearedLevel2.set(0);
    totalPlayersThatClearedLevel3.set(0);
    isPlayingLevel7.set(0);
    resetWorldBorder();
    raw(`function cn:cn/reset`);
    functionCmd('levels/lvl5/reset');
    functionCmd('levels/lvl7/reset_worldborder');
})

// remove tag
MCFunction('uninstall/remove_tags', () => {
    tag('@a').remove(clearedLevel1Tag);
    tag('@a').remove(clearedLevel2Tag);
    tag('@a').remove(clearedLevel3Tag);
    tag('@a').remove(clearedLevel4Tag);
    tag('@a').remove(clearedLevel6Tag);
    tag('@a').remove(failedTag);
    tag('@a').remove(ForcedFailedAtLvl4);
    tag('@a').remove(ForcedFailedAtLvl5);
    tag('@a').remove(ForcedFailedAtLvl6);
    tag('@a').remove(ForcedFailedAtLvl7);
    tag('@a').remove('winner');
    tag('@a').remove(winner);
})