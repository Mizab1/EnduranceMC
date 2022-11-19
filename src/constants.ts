// variables

import { abs, rel, Tag, TagInstance, VectorClass } from "sandstone";

// hub
export const hubCoord: VectorClass<[string, string, string]> = abs(194, 132, 359);
export const noOfPlayer: number = 10;

export const excluded: string = 'excluded'
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
    tp: abs(1000, 64, 1000),
    facing: abs(60, 0)
}
export const infoLvl5 = {
    tp: abs(88, 97, 203),
    facing: abs(90, 0)
}
export const infoLvl6 = {
    tp: abs(0, 120, 1000),
    facing: abs(180, 0)
}
export const infoLvl7 = {
    tp: abs(-133, 142, -210),
    worldBorder: abs(-133, -210),
    facing: abs(90, 0)
}

// level 1
export const box1 = abs(60, 99, 279);
export const box2 = abs(60, 99, 291);
export const box3 = abs(60, 99, 303);
export const box4 = abs(60, 99, 315);
export const box5 = abs(60, 99, 327);

export const box6 = abs(66, 99, 327);
export const box7 = abs(67, 99, 315);
export const box8 = abs(66, 99, 303);
export const box9 = abs(67, 99, 291);
export const box10 = abs(67, 99, 279);

// level 2
export const chest1: VectorClass<[string, string, string]> = abs(3, 6, 383);
export const chest2: VectorClass<[string, string, string]> = abs(-6, 15, 336);
export const chest3: VectorClass<[string, string, string]> = abs(-67, -14, 346);
export const chest4: VectorClass<[string, string, string]> = abs(-19, 56, 337);
export const chest5: VectorClass<[string, string, string]> = abs(-34, -1, 355);
export const chest6: VectorClass<[string, string, string]> = abs(11, -21, 299);
export const chest7: VectorClass<[string, string, string]> = abs(-47, -21, 289);
export const chest8: VectorClass<[string, string, string]> = abs(-39, -3, 368);

// level 4
export const ForcedFailedAtLvl4: string = 'failed_at_4';
export const chest1Lvl4 = abs(987, 65, 994); 
export const chest2Lvl4 = abs(997, 65, 986); 
export const chest3Lvl4 = abs(1009, 65, 988); 
export const chest4Lvl4 = abs(1014, 65, 1000); 
export const chest5Lvl4 = abs(1009, 65, 1012); 
export const chest6Lvl4 = abs(997, 65, 1014); 
export const chest7Lvl4 = abs(987, 65, 1006); 

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