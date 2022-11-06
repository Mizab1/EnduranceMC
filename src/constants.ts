// variables

import { abs, rel, VectorClass } from "sandstone";

// hub
export const hubCoord: VectorClass<[string, string, string]> = abs(333, 65, 111);
export const noOfPlayer: number = 10;

// level 1
export const maxButtonPressed: number = 15;

// TP
export const tpLvl1: VectorClass<[string, string, string]> = abs(252, 79, 185);
export const tpLvl2: VectorClass<[string, string, string]> = abs(297, 73, 277);
export const tpLvl3: VectorClass<[string, string, string]> = abs(335, 71, 40);
export const tpLvl4: VectorClass<[string, string, string]> = abs(212, 69, 111);

// level 2
export const undergroundChest1: VectorClass<[string, string, string]> = rel(322, 65, 224);
export const undergroundChest2: VectorClass<[string, string, string]> = rel(328, 67, 247);
export const undergroundChest3: VectorClass<[string, string, string]> = rel(296, 70, 278);

// tags
export const clearedLevel1Tag: string = 'cleared_lvl_1'
export const clearedLevel2Tag: string = 'cleared_lvl_2'
export const clearedLevel3Tag: string = 'cleared_lvl_3'
export const clearedLevel4Tag: string = 'cleared_lvl_4'
export const failedTag: string = 'failed';