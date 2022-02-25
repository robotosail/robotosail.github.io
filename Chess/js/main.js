import { PIECES, BOOL, BRD_SQ_NUM, fileRank2Square, FilesBrd, RanksBrd, COLORS, SQUARES, RANKS, FILES, RAND_32 } from "./defs.js";

window.addEventListener("load", function () {
    init();

    let piece1 = RAND_32();
    let piece2 = RAND_32();
    let piece3 = RAND_32();
    let piece4 = RAND_32();

    let key = 0;
    key ^= piece1;
    key ^= piece2;
    key ^= piece3;
    key ^= piece4;
    console.log("key:" + key.toString(16))
    key ^= piece1;
    console.log("piece1 out key:" + key.toString(16));
    key = 0;
    key ^= piece2;
    key ^= piece3;
    key ^= piece4;
    console.log("build no piece1:" + key.toString(16));
})


function initFilesRanksBrd() {
    let index = 0;
    let file = FILES.FILE_A;
    let rank = RANKS.RANK_1;
    let sq = SQUARES.A1;

    for (let i = 0; i < BRD_SQ_NUM; i++) {
        FilesBrd[i] = SQUARES.OFFBOARD;
        RanksBrd[i] = SQUARES.OFFBOARD;    
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
        for (file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
    console.log("FilesBrd[0]:" + FilesBrd[0])
}

function init() {
    initFilesRanksBrd();
}
