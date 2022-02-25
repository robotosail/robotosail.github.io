import { PIECES, BOOL, BRD_SQ_NUM, fileRank2Square, FilesBrd, RanksBrd, COLORS, SQUARES, RANKS, FILES } from "./defs.js";

function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum);
}

let GameBoard = {}

GameBoard.pieces = new Array(BRD_SQ_NUM)
GameBoard.color = COLORS.WHITE;
GameBoard.fiftyMove = 0;
GameBoard.hisPly = 0;
GameBoard.ply = 0;
GameBoard.enPas = 0;
GameBoard.castlePerm = 0;
GameBoard.material = new Array(2); //white, black mapterial of peice
GameBoard.pceNum = new Array(13); //indexed by pce
GameBoard.pList = new Array(14 * 10);
GameBoard.posKey = 0;