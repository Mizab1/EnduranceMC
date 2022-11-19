import { bossbar, data, functionCmd, MCFunction, raw, scoreboard, setblock, tag } from "sandstone";
import { clearedLevel1Tag, clearedLevel2Tag, clearedLevel3Tag, clearedLevel4Tag, clearedLevel6Tag, failedTag, ForcedFailedAtLvl4, ForcedFailedAtLvl5, ForcedFailedAtLvl6, ForcedFailedAtLvl7, winner } from "./constants";
import { alreadyInBox, barrierLvl1, totalPlayersThatClearedLevel1 } from "./levels/level1";
import { totalPlayersThatClearedLevel2 } from "./levels/level2";
import { totalPlayersThatClearedLevel3 } from "./levels/level3";
import { bossbarName, chestCoord, isPlayingLevel4 } from "./levels/level4";
import { alreadyInBoxLvl5, barrierLvl5, isPlayingLevel5, reset } from "./levels/level5";
import { isPlayingLevel7, resetWorldBorder } from "./levels/level7";

// remove scores
MCFunction('uninstall/remove_scores', () => {
    scoreboard.objectives.remove('button_pressed');
    totalPlayersThatClearedLevel1.set(0);
    totalPlayersThatClearedLevel2.set(0);
    totalPlayersThatClearedLevel3.set(0);

    isPlayingLevel7.set(0);
    isPlayingLevel4.set(0);
    isPlayingLevel5.set(0);

    resetWorldBorder();
    raw(`function cn:cn/reset`);
    reset();

    bossbar.remove(bossbarName);

    barrierLvl1.forEach((value) => {
        setblock(value, 'minecraft:barrier');
    });
    barrierLvl5.forEach((value) => {
        setblock(value, 'minecraft:barrier');
    });

    tag('@a').remove(alreadyInBox);
    tag('@a').remove(alreadyInBoxLvl5);

    chestCoord.forEach((value) => {
        data.merge.block(value, {
            Lock: ""
        })
    });
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