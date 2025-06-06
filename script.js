function rookMove(start, end) {//debugger
    if (start.rows == end.rows) {
        if (start.cols < end.cols) {
            for (let i = start.cols + 1;i < end.cols;i++) {
                let cell = document.getElementById(`${i}-${start.rows}`);
                if (cell.children.length > 0) {
                    return false;
                }
                console.log(i);
            }
            
            return true;
        } else {
            for (let i = start.cols - 1;i > end.cols;i--) {
                let cell = document.getElementById(`${i}-${start.rows}`);
                if (cell.children.length > 0) {
                    return false;
                }
            }
                        
            return true;
        }
    } else if (start.cols == end.cols) {
        if (start.rows < end.rows) {
            for (let i = start.rows + 1;i < end.rows;i++) {
                let cell = document.getElementById(`${start.cols}-${i}`);
                if (cell.children.length > 0) {
                    return false;
                }
            }
                        
            return true;
        } else {
            for (let i = start.rows - 1;i > end.rows;i--) {
                let cell = document.getElementById(`${start.cols}-${i}`);
                if (cell.children.length > 0) {
                    return false;
                }
            }
            
            return true;
        }
    }

    return false;
}

function bishopMove(start, end) {
    if ((end.cols - start.cols) + start.rows == end.rows) {
        if (end.cols > start.cols) {
            for (let i = start.cols + 1;i < end.cols;i++) {
                if (document.getElementById(`${i}-${i - start.cols + start.rows}`).children.length > 0) {
                    return false;
                }
            }
        } else {
            for (let i = start.cols - 1;i > end.cols;i--) {
                if (document.getElementById(`${i}-${i - start.cols + start.rows}`).children.length > 0) {
                    return false;
                }
            }
        }

        return true;
    } else if (-(end.cols - start.cols) + start.rows == end.rows) {
                if (end.cols > start.cols) {
            for (let i = start.cols + 1;i < end.cols;i++) {
                if (document.getElementById(`${i}-${-i + start.cols + start.rows}`).children.length > 0) {
                    return false;
                }
            }
        } else {
            for (let i = start.cols - 1;i > end.cols;i--) {
                if (document.getElementById(`${i}-${-i + start.cols + start.rows}`).children.length > 0) {
                    return false;
                }
            }
        }

        return true;
    }

    return false;
}

function knightMove(start, end) {
    if (start.cols + 2 == end.cols && start.rows + 1 == end.rows) {
        return true;
    } else if (start.cols + 2 == end.cols && start.rows - 1 == end.rows) {
        return true;
    } else if (start.cols - 2 == end.cols && start.rows + 1 == end.rows) {
        return true;
    } else if (start.cols - 2 == end.cols && start.rows - 1 == end.rows) {
        return true;
    } else if (start.rows + 2 == end.rows && start.cols + 1 == end.cols) {
        return true;
    } else if (start.rows + 2 == end.rows && start.cols - 1 == end.cols) {
        return true;
    } else if (start.rows - 2 == end.rows && start.cols + 1 == end.cols) {
        return true;
    } else if (start.rows - 2 == end.rows && start.cols - 1 == end.cols) {
        return true;
    }

    return false;
}

function king(start, end) {
    const dis = Math.sqrt((start.rows - end.rows) ** 2 + (start.cols - end.cols) ** 2);

    if (dis < 2) {
        return true;
    }

    return false;
}

function promoteTo(piece) {
    const dialog = document.querySelector(".dialog");
    dialog.style.display = "none";

    let pawn = document.querySelector('.chess-board .col:first-child .cell .chess-pieces.pawn');
    if (!pawn) {
        pawn = document.querySelector('.chess-board .col:last-child .cell .chess-pieces.pawn');
    }

    if (pawn) {
        let cls = pawn.className.split(" ");
        cls[2] = piece;
        pawn.className = cls.join(" ");
    }

    // showSafeCell();
}

document.querySelectorAll('.dialog .option').forEach(option => {
    option.addEventListener('click', () => {
        if (option.querySelector('.knight')) promoteTo('knight');
        if (option.querySelector('.bishop')) promoteTo('bishop');
        if (option.querySelector('.rook')) promoteTo('rook');
        if (option.querySelector('.qeen')) promoteTo('qeen');
    });
});

function promo() {
    const dialog = document.querySelector(".dialog");
    dialog.style.display = "flex";
}

function showSafeCell() {
    document.querySelectorAll('.chess-board .cell').forEach(e => { 
        let c = 0;

        if (!isSafe(e, 'black')) 
            c++,
            e.style.backgroundColor = 'red';
        
        if (!isSafe(e, 'white')) 
            c++,
            e.style.backgroundColor = 'blue';

        if (c == 0) 
            e.style.backgroundColor = 'gray';

        if (c == 2)
            e.style.backgroundColor = 'purple';
    });
}

function isSafe(cell, side) {
    const op = (side == "white" ? "black":"white");
    let r = true;

    if (cell.cols > 7 || cell.cols < 0 || cell.rows < 0 || cell.rows > 7) {
        return false;
    }

    const opl = document.querySelectorAll(`.chess-board .cell .${op}`);

    opl.forEach(e => {
        if (e.className.includes('pawn')) {
            if (side === 'black') {
                if (e.parentElement.rows == cell.rows + 1 && (e.parentElement.cols == cell.cols + 1 || e.parentElement.cols == cell.cols - 1)) {
                    r = false;
                }
            } else {
                if (e.parentElement.rows == cell.rows - 1 && (e.parentElement.cols == cell.cols + 1 || e.parentElement.cols == cell.cols - 1)) {
                    r = false;
                }
            }
        } else if (e.className.includes('knight')) {
            if (knightMove({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell)) {
                r = false
            }
        } else if (e.className.includes('bishop')) {
            if (bishopMove({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell)) {
                r = false
            }
        } else if (e.className.includes('rook')) {
            if (rookMove({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell)) {
                r = false
            }
        } else if (e.className.includes('qeen')) {
            if (rookMove({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell) || bishopMove({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell)) {
                r = false
            }
        } else if (e.className.includes('king')) {
            if (king({ cols: e.parentElement.cols, rows: e.parentElement.rows }, cell)) {
                r = false
            }
        }
    });

    return r;
}

function isNullOrSafe(cell, side) {
    return isSafe(cell, side) && cell.childElementCount == 0;
}

function initChess() {
    let slcCP = false, hoverCell = false, drag = false;

    document.querySelectorAll('.chess-board .cell').forEach((cell, i) => {
        cell.rows = Math.floor(i / 8);
        cell.cols = i % 8;
        cell.id = `${cell.cols}-${cell.rows}`;
        cell.drag = false;
        const rect = cell.getBoundingClientRect();
        cell.y = rect.top;
        cell.x = rect.left;
        cell.width = rect.width;
        cell.height = rect.height;

        cell.addEventListener('mouseover', ev => {
            hoverCell = cell;
            //console.log(hoverCell);
        });

        cell.addEventListener('mouseleave', ev => {
            hoverCell = false;
        });

        cell.addEventListener('mousedown', ev => {
            if (cell.childElementCount > 0) {
                const pieces = cell.children[0];
                
                pieces.style.transform = `translate(${ev.clientX - rect.left - cell.width / 2}px, ${ev.clientY - rect.top - cell.height / 2}px)`;
                drag = true;
                slcCP = pieces;
            }
        });
    });

    document.addEventListener('mousemove', ev => {
        if (slcCP) {
            const cell = slcCP.parentElement;
            const pieces = slcCP;
            
            pieces.style.transform = `translate(${ev.clientX - cell.x - cell.width / 2}px, ${ev.clientY - cell.y - cell.height / 2}px)`;
        }
    });

    document.addEventListener('mouseup', ev => {
        if (slcCP) {
            if (hoverCell) {
                if (slcCP.className.includes("pawn")) {//check neu la con tot
                    const cell = slcCP.parentElement;
                    const side = (slcCP.isWhite ? -1:1);
                    const isBlock = hoverCell.children.length > 0;
                    if (hoverCell.rows == cell.rows + 2 * side && hoverCell.cols == cell.cols && !isBlock && slcCP.isFirst === undefined) {
                        //console.log(hoverCell);
                        hoverCell.appendChild(slcCP);
                        slcCP.isFirst = false;
                        slcCP.isJump = true;
                    }

                    if ((hoverCell.rows == cell.rows || hoverCell.rows == cell.rows + 1 * side) && hoverCell.cols == cell.cols && !isBlock) {
                        //console.log(hoverCell);
                        hoverCell.appendChild(slcCP);
                        slcCP.isFirst = false;
                        slcCP.isJump = false;
                    }

                    if ((hoverCell.rows == cell.rows + 1 * side && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && hoverCell.children?.[0]?.className?.includes(!slcCP.isWhite ? "white":"black")) {
                        //console.log(hoverCell);
                        hoverCell.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                        slcCP.isFirst = false;
                    }

                    if ((hoverCell.rows == cell.rows + 1 * side && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && (document.getElementById(`${cell.cols - 1}-${cell.rows}`)?.children?.[0]?.isJump || document.getElementById(`${cell.cols + 1}-${cell.rows}`)?.children?.[0]?.isJump)) {
                        //console.log(hoverCell);
                        const c = document.getElementById(`${hoverCell.cols}-${hoverCell.rows - 1 * side}`);
                        if (c) c.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                        slcCP.isFirst = false;
                    }

                    if (slcCP.parentElement.rows == (slcCP.isWhite ? 0:7)) {
                        promo();
                    }
                } else if (slcCP.className.includes("rook")) {
                    const cell = slcCP.parentElement;
                    if (rookMove(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes(slcCP.isWhite ? "white":"black"))) {
                        hoverCell.innerHTML = "";
                        slcCP.isFirst = false;
                        hoverCell.appendChild(slcCP);
                    }
                } else if (slcCP.className.includes("bishop")) {
                    const cell = slcCP.parentElement;
                    if (bishopMove(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes(slcCP.isWhite ? "white":"black"))) {
                        hoverCell.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                    }
                } else if (slcCP.className.includes("knight")) {
                    const cell = slcCP.parentElement;
                    if (knightMove(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes(slcCP.isWhite ? "white":"black"))) {
                        //console.log(hoverCell);
                        hoverCell.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                    }
                } else if (slcCP.className.includes("qeen")) {
                    const cell = slcCP.parentElement;
                    if ((bishopMove(cell, hoverCell) || rookMove(cell, hoverCell)) && !(hoverCell?.children?.[0]?.className?.includes(slcCP.isWhite ? "white":"black"))) {
                        //console.log(hoverCell);
                        hoverCell.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                    }
                } else {
                    const cell = slcCP.parentElement;
                    const rows = (slcCP.isWhite ? 7:0);
                    const side = (slcCP.isWhite ? "white":"black");
                    if (slcCP.isFirst && hoverCell.rows == rows && (hoverCell.cols == 2 || hoverCell.cols == 6) && 
                        isSafe(slcCP.parentElement, side) && 
                        document.querySelector(`.chess-board .cell .rook.${(slcCP.isWhite ? "white":"black")}:last-child`).isFirst) {
                        if (hoverCell.cols == 2) {
                            if (isNullOrSafe(document.getElementById(`1-${rows}`), side) &&//Check empty 
                                isNullOrSafe(document.getElementById(`2-${rows}`), side) &&
                                isNullOrSafe(document.getElementById(`3-${rows}`), side) &&
                                isSafe({cols: 0, rows: rows}, side) && 
                                document.querySelector(`.chess-board .cell[id='0-${rows}'] .rook.${(slcCP.isWhite ? "white":"black")}`)?.isFirst) {
                                // alert('co the nhap thanh');
                                document.getElementById(`3-${rows}`).appendChild(document.querySelector(`.chess-board .cell[id='0-${rows}'] .rook.${(slcCP.isWhite ? "white":"black")}`));
                                document.getElementById(`2-${rows}`).appendChild(slcCP);
                                slcCP.isFirst = false;
                            }
                        } else if (hoverCell.cols == 6) {
                            if (isNullOrSafe(document.getElementById(`6-${rows}`), side) && 
                                isNullOrSafe(document.getElementById(`5-${rows}`), side) &&
                                isSafe({cols: 7, rows: rows}, side) && 
                                document.querySelector(`.chess-board .cell[id='7-${rows}'] .rook.${(slcCP.isWhite ? "white":"black")}`)?.isFirst) {
                                document.getElementById(`5-${rows}`).appendChild(document.querySelector(`.chess-board .cell[id='7-${rows}'] .rook.${(slcCP.isWhite ? "white":"black")}`));
                                document.getElementById(`6-${rows}`).appendChild(slcCP);
                                slcCP.isFirst = false;
                            }
                        }
                    }

                    if (king(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes(slcCP.isWhite ? "white":"black"))) {
                        hoverCell.innerHTML = "";
                        hoverCell.appendChild(slcCP);
                        slcCP.isFirst = false;
                    }
                }
            }

            slcCP.style.transform = "";
            drag = false;
            slcCP = false;

            if (!isSafe(document.querySelector('.chess-board .cell:has(.king.white)'), 'white')) {
                alert('Trắng bị chiếu');
            }

            if (!isSafe(document.querySelector('.chess-board .cell:has(.king.black)'), 'black')) {
                alert('Đen bị chiếu');
            }
        }
    });
}

function createCP(color, type, prop, val) {
    const chess_pieces = document.createElement('div');
    chess_pieces.className = `chess-pieces ${color} ${type}`;
    chess_pieces.isWhite = (color === 'white' ? true:false);
    chess_pieces[prop] = val;

    return chess_pieces;
}

function initCP() {
    document.querySelectorAll('.chess-board .cell').forEach((cell, i) => {
        //Pawn
        if (cell.rows == 1) {
            cell.innerHTML = "";
            cell.appendChild(createCP('black', 'pawn'));
        }
    
        if (cell.rows == 6) {
            cell.innerHTML = "";
            cell.appendChild(createCP('white', 'pawn'));
        }

        if (cell.rows == 0) {//Black
            //Rook
            if (cell.cols == 0 || cell.cols == 7) {
                cell.innerHTML = "";
                cell.appendChild(createCP('black', 'rook', 'isFirst', true));
            }
            //Knight
            if (cell.cols == 1 || cell.cols == 6) {
                cell.innerHTML = "";
                cell.appendChild(createCP('black', 'knight'));
            }
            //Bishop
            if (cell.cols == 2 || cell.cols == 5) {
                cell.innerHTML = "";
                cell.appendChild(createCP('black', 'bishop'));
            }
            //Qeen
            if (cell.cols == 3) {
                cell.innerHTML = "";
                cell.appendChild(createCP('black', 'qeen'));
            }
            //King
            if (cell.cols == 4) {
                cell.innerHTML = "";
                cell.appendChild(createCP('black', 'king', 'isFirst', true));
            }
        }

        if (cell.rows == 7) {//White
            //Rook
            if (cell.cols == 0 || cell.cols == 7) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'rook', 'isFirst', true));
            }
            //Knight
            if (cell.cols == 1 || cell.cols == 6) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'knight'));
            }
            //Bishop
            if (cell.cols == 2 || cell.cols == 5) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'bishop'));
            }
            //Qeen
            if (cell.cols == 3) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'qeen'));
            }
            //King
            if (cell.cols == 4) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'king', 'isFirst', true));
            }
        }
    });
}

function main() {
    initChess();
    initCP();
    // showSafeCell();
}

main();