# loa-brel-hard-g6
For those having trouble with g6 meteor placement

![image](https://user-images.githubusercontent.com/44894563/236221936-6120a1a1-caf3-425f-929e-69b9ac0fa73b.png)

# Initial Info dump (UI)
1) [ui] Clicks on START to drop initial recommended path
2) [ui] Clicking on tiles will drop blue meteor
3) [ui] Clicking on yellow button (top/bottom) drops yellow meteor
4) [ui] Clicking on RESET will reset the game to initial state and waiting for START

# Initial Info dump (Algorithm)
1) Algorithm follows korea recommended starting path
2) Recommended path is calculated on every (blue set input (2,3,4,3,4)), yellow meteor drop, tile recovery
3) Algorithm does not take into account recovering tiles

Calculations:
![image](https://user-images.githubusercontent.com/44894563/236231927-a3b7e7ca-d2d9-40b4-8ce3-2b654dbfcc01.png)
