// variables

import { abs, rel, VectorClass } from "sandstone";

// hub
export const hubCoord = abs(333, 65, 111);
export const noOfPlayer: number = 10;

// level 1
export const maxButtonPressed: number = 15;

export const tpLvl1: VectorClass<[string, string, string]> = abs(252, 79, 185);
export const tpLvl2: VectorClass<[string, string, string]> = abs(297, 73, 277);
export const tpLvl3: VectorClass<[string, string, string]> = abs(335, 71, 40);

// level 2
export const undergroundChest1 = rel(322, 65, 224);
export const undergroundChest2 = rel(328, 67, 247);
export const undergroundChest3 = rel(296, 70, 278);

// tags
export const clearedLevel1Tag: string = 'cleared_lvl_1'
export const clearedLevel2Tag: string = 'cleared_lvl_2'
export const clearedLevel3Tag: string = 'cleared_lvl_3'
export const failedTag: string = 'failed';