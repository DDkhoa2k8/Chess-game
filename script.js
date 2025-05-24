function rookMove(start, end) {//debugger
    if (start.rows == end.rows && start.cols == end.cols) {
        return true;
    } else if (start.rows == end.rows) {
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

function bishop(start, end) {
    if (start.rows == end.rows && start.cols == end.cols) {
        return true;
    } else if ((end.cols - start.cols) + start.rows == end.rows) {
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
            console.log(hoverCell);
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
                    if (slcCP.className.includes("black")) {//check ben
                        const cell = slcCP.parentElement;
                        const isBlock = hoverCell.children.length > 0;
                        if (hoverCell.rows == cell.rows + 2 && hoverCell.cols == cell.cols && !isBlock && slcCP.isFirst === undefined) {
                            console.log(hoverCell);
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                            slcCP.isJump = true;
                        }

                        if ((hoverCell.rows == cell.rows || hoverCell.rows == cell.rows + 1) && hoverCell.cols == cell.cols && !isBlock) {
                            console.log(hoverCell);
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                            slcCP.isJump = false;
                        }

                        if ((hoverCell.rows == cell.rows + 1 && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && hoverCell.children?.[0]?.className?.includes('white')) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                        }

                        if ((hoverCell.rows == cell.rows + 1 && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && (document.getElementById(`${cell.cols - 1}-${cell.rows}`)?.children?.[0]?.isJump || document.getElementById(`${cell.cols + 1}-${cell.rows}`)?.children?.[0]?.isJump)) {
                            console.log(hoverCell);
                            const c = document.getElementById(`${hoverCell.cols}-${hoverCell.rows - 1}`);
                            if (c) c.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                        }
                    } else {
                        const cell = slcCP.parentElement;
                        const isBlock = hoverCell.children.length > 0;
                        if (hoverCell.rows == cell.rows - 2 && hoverCell.cols == cell.cols && !isBlock && slcCP.isFirst === undefined) {
                            console.log(hoverCell);
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                            slcCP.isJump = true;
                        }

                        if ((hoverCell.rows == cell.rows || hoverCell.rows == cell.rows - 1) && hoverCell.cols == cell.cols && !isBlock) {
                            console.log(hoverCell);
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                            slcCP.isJump = false;
                        }

                        if ((hoverCell.rows == cell.rows - 1 && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && hoverCell.children?.[0]?.className?.includes('black')) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                        }

                        if ((hoverCell.rows == cell.rows - 1 && (hoverCell.cols == cell.cols - 1 || hoverCell.cols == cell.cols + 1)) && (document.getElementById(`${cell.cols - 1}-${cell.rows}`)?.children?.[0]?.isJump || document.getElementById(`${cell.cols + 1}-${cell.rows}`)?.children?.[0]?.isJump)) {
                            console.log(hoverCell);
                            const c = document.getElementById(`${hoverCell.cols}-${hoverCell.rows + 1}`);
                            if (c) c.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                            slcCP.isFirst = false;
                        }
                    }
                } else if (slcCP.className.includes("rook")) {
                    const cell = slcCP.parentElement;
                    if (slcCP.className.includes('black')) {
                        if (rookMove(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes('black'))) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                        }
                    } else {
                        if (rookMove(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes('white'))) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                        }
                    }
                } else if (slcCP.className.includes("bishop")) {
                    const cell = slcCP.parentElement;
                    if (slcCP.className.includes('black')) {
                        if (bishop(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes('black'))) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                        }
                    } else {
                        if (bishop(cell, hoverCell) && !(hoverCell?.children?.[0]?.className?.includes('white'))) {
                            console.log(hoverCell);
                            hoverCell.innerHTML = "";
                            hoverCell.appendChild(slcCP);
                        }
                    }
                }
            }

            slcCP.style.transform = "";
            drag = false;
            slcCP = false;
        }
    });
}

function createCP(color, type) {
    const chess_pieces = document.createElement('div');
    chess_pieces.className = `chess-pieces ${color} ${type}`;

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
                cell.appendChild(createCP('black', 'rook'));
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
                cell.appendChild(createCP('black', 'king'));
            }
        }

        if (cell.rows == 7) {//White
            //Rook
            if (cell.cols == 0 || cell.cols == 7) {
                cell.innerHTML = "";
                cell.appendChild(createCP('white', 'rook'));
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
                cell.appendChild(createCP('white', 'king'));
            }
        }
    });
}

function main() {
    initChess();
    initCP();
}

main();