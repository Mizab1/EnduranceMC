// variables

import { abs, rel, Tag, TagInstance, VectorClass } from "sandstone";

// hub
export const hubCoord: VectorClass<[string, string, string]> = abs(194, 132, 359);
export const noOfPlayer: number = 10;


// TP
export const infoLvl1 = {
    tp: abs(63, 98, 273),
    facing: abs(0, 0)
}
export const infoLvl2 = {
    tp: abs(-35, 81, 327),
    facing: abs(-120, 0)
}
export const infoLvl3 = {
    tp: abs(82, 98, 251),
    facing: abs(90, 0)
}
export const infoLvl4 = {
    tp: abs(-56, 125, -399),
    facing: abs(60, 0)
}
export const infoLvl5 = {
    tp: abs(88, 97, 203),
    facing: abs(90, 0)
}
export const infoLvl6 = {
    tp: abs(321, 71, -67),
    facing: abs(180, 0)
}
export const infoLvl7 = {
    tp: abs(-133, 142, -210),
    worldBorder: abs(-133, -210),
    facing: abs(90, 0)
}

// level 2
export const chest1: VectorClass<[string, string, string]> = rel(3, 6, 383);
export const chest2: VectorClass<[string, string, string]> = rel(-6, 15, 336);
export const chest3: VectorClass<[string, string, string]> = rel(-67, -14, 346);
export const chest4: VectorClass<[string, string, string]> = rel(-19, 56, 337);
export const chest5: VectorClass<[string, string, string]> = rel(-34, -1, 355);
export const chest6: VectorClass<[string, string, string]> = rel(11, -21, 299);
export const chest7: VectorClass<[string, string, string]> = rel(-47, -21, 289);
export const chest8: VectorClass<[string, string, string]> = rel(-39, -3, 368);

// level 4
export const ForcedFailedAtLvl4: string = 'failed_at_4';

// level 5
export const ForcedFailedAtLvl5: string = 'failed_at_5';

// level 6
export const ForcedFailedAtLvl6: string = 'failed_at_6';

// level 6
export const ForcedFailedAtLvl7: string = 'failed_at_7';

// final tag
export const winner: string = 'won';
export const winnerTmp: string = 'won_tmp';

// tags
export const clearedLevel1Tag: string = 'cleared_lvl_1';
export const clearedLevel2Tag: string = 'cleared_lvl_2';
export const clearedLevel3Tag: string = 'cleared_lvl_3';
export const clearedLevel4Tag: string = 'cleared_lvl_4';
export const clearedLevel5Tag: string = 'cleared_lvl_5';
export const clearedLevel6Tag: string = 'cleared_lvl_6';
export const clearedLevel7Tag: string = 'cleared_lvl_7';
export const failedTag: string = 'failed';

const planks: TagInstance<"blocks"> = Tag('blocks', 'planks', [
    'minecraft:acacia_button',
    'minecraft:acacia_door',
    'minecraft:acacia_fence'
])