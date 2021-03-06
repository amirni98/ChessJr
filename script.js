const board         = document.getElementById('board');
const table         = document.getElementById('table');
const style         = document.getElementById('style');
const button        = document.getElementById('button');
const log_txt       = document.getElementById('log');
const ptxt          = document.createElement("P");
let log_counter     = 0;
let txt             = [];
const width         = window.innerWidth;
let size;
const colors        = {
    pieces  : ['white', 'black'],
    classic : ['white', 'black']    };
let white           = true;
let history_count   = 0;
let history         = [];
let history_flag    = [];
let check_flag      = false;



//let even = 'click';
//log_txt.append(window.innerWidth,'txt');



/*if((OS.match('iPhone') || OS.match('iPad'))){
    even = 'touchstart';
    log_txt.append(window.innerWidth);
}*/

/*table.setAttribute('onTouchStart', " ");
table.setAttribute('onClick', " ");

document.querySelectorAll('tr').forEach((item) => {
    item.setAttribute('onTouchStart', " ");
    item.setAttribute('onClick', " ");
});
document.querySelectorAll('th').forEach((item) => {
    item.setAttribute('onTouchStart', " ");
    item.setAttribute('onClick', " ");
});
*/

if(width < 527)
    size      = (window.innerWidth-15)-((window.innerWidth-15)%8); 
else
    size      = 512;

//log_txt.append(size,'txt');

function styling() {
    board.style.width           =   size+'px';
    board.style.height          =   size+'px';
    board.style.backgroundColor =   colors.classic[0];
    log_txt.style.width         =   size+'px';
    button.style.fontSize       =   size/16+'px';

}




// icons from fontawesome
const rook_shape    = 'fas fa-chess-rook'   ;
const queen_shape   = 'fas fa-chess-queen'  ;
const king_shape    = 'fas fa-chess-king'   ;
const knight_shape  = 'fas fa-chess-knight' ;
const bishop_shape  = 'fas fa-chess-bishop' ;
const pawn_shape    = 'fas fa-chess-pawn'   ;


//creating black pieces
const rook_r        = document.createElement('I');
rook_r.className    = rook_shape;
rook_r.id           = 'rook_w';
rook_r.style.color  = colors.pieces[0];
const rook_l        = document.createElement('I');
rook_l.className    = rook_shape;
rook_l.id           = 'rook_w';
rook_l.style.color  = colors.pieces[0];


const bishop_r          = document.createElement('I');
bishop_r.className      = bishop_shape;
bishop_r.id             = 'bishop_w';
bishop_r.style.color    = colors.pieces[0];
const bishop_l          = document.createElement('I');
bishop_l.className      = bishop_shape;
bishop_l.id             = 'bishop_w';
bishop_l.style.color    = colors.pieces[0];

const queen         = document.createElement('I');
queen.className     = queen_shape;
queen.id            = 'queen_w';
queen.style.color   = colors.pieces[0];

const king          = document.createElement('I');
king.className      = king_shape;
king.id             = 'king_w';
king.style.color    = colors.pieces[0];

const knight_r          = document.createElement('I');
knight_r.className      = knight_shape;
knight_r.id             = 'knight_w';
knight_r.style.color    = colors.pieces[0];
const knight_l          = document.createElement('I');
knight_l.className      = knight_shape;
knight_l.id             = 'knight_w';
knight_l.style.color    = colors.pieces[0];

let p;
let pawn = [];
for (p = 0 ; p < 8 ; p++){
    pawn[p]                 = document.createElement('I');
    pawn[p].className       = pawn_shape;
    pawn[p].id              = 'pawn_w'
    pawn[p].style.color     = colors.pieces[0];
    pawn[p].setAttribute('data-flag' , 'true');
}

//creating black pieces
const rook_r_b          = document.createElement('I');
rook_r_b.className      = rook_shape;
rook_r_b.id             = 'rook_b';
rook_r_b.style.color    = colors.pieces[1];
const rook_l_b          = document.createElement('I');
rook_l_b.className      = rook_shape;
rook_l_b.id             = 'rook_b';
rook_l_b.style.color    = colors.pieces[1];


const bishop_r_b        = document.createElement('I');
bishop_r_b.className    = bishop_shape;
bishop_r_b.id           = 'bishop_b';
bishop_r_b.style.color  = colors.pieces[1];
const bishop_l_b        = document.createElement('I');
bishop_l_b.className    = bishop_shape;
bishop_l_b.id           = 'bishop_b';
bishop_l_b.style.color  = colors.pieces[1];

const queen_b           = document.createElement('I');
queen_b.className       = queen_shape;
queen_b.id              = 'queen_b';
queen_b.style.color     = colors.pieces[1];

const king_b        = document.createElement('I');
king_b.className    = king_shape;
king_b.id           = 'king_b';
king_b.style.color  = colors.pieces[1];

const knight_r_b        = document.createElement('I');
knight_r_b.className    = knight_shape;
knight_r_b.id           = 'knight_b';
knight_r_b.style.color  = colors.pieces[1];
const knight_l_b        = document.createElement('I');
knight_l_b.className    = knight_shape;
knight_l_b.id           = 'knight_b';
knight_l_b.style.color  = colors.pieces[1];

let pawn_b = [];
for (p = 0 ; p < 8 ; p++){
    pawn_b[p] = document.createElement('I');
    pawn_b[p].className     = pawn_shape;
    pawn_b[p].id            = 'pawn_b'
    pawn_b[p].style.color   = colors.pieces[1];
    pawn_b[p].setAttribute('data-flag' , 'true');
    
}

// assigning cells
let rows    = [];
let cells   = [[],[],[],[],[],[],[],[]];
let i,j;
for (i = 0 ; i < 8 ; i++) {
    rows[i]                 =   document.getElementById('r'+(i+1));
    rows[i].style.width     =   size    +'px';
    rows[i].style.height    =   size/8  +'px';

    for (j = 0 ; j < 8 ; j++) {
        cells[i][j]             = document.getElementById(`r${i+1}_${j+1}`);
        cells[i][j].className   = 'cell';

        if((i+j)%2 == 0){
            cells[i][j].style.backgroundColor = colors.classic[1];
        }
        cells[i][j].style.position = 'relative';
        //cells[i][j].style.alignItems = 'center';
        //cells[i][j].style.display = 'flex';
        //cells[i][j].style.alignItem = 'center';
        ////console.log(cells[i][j].style.alignItem);
    }

}

// a funtion to arrange pieces
function arrange(){
    cells[0][0].append(rook_l);
    cells[0][7].append(rook_r);
    cells[0][1].append(knight_l);
    cells[0][6].append(knight_r);
    cells[0][2].append(bishop_l);
    cells[0][5].append(bishop_r);
    cells[0][3].append(queen);
    cells[0][4].append(king);

    for (p = 0 ; p < 8 ; p++){
        cells[1][p].append(pawn[p]);

    }

    cells[7][0].append(rook_l_b);
    cells[7][7].append(rook_r_b);
    cells[7][1].append(knight_l_b);
    cells[7][6].append(knight_r_b);
    cells[7][2].append(bishop_l_b);
    cells[7][5].append(bishop_r_b);
    cells[7][3].append(queen_b);
    cells[7][4].append(king_b);

    for (p = 0 ; p < 8 ; p++){
        cells[6][p].append(pawn_b[p]);
    }
}

function check(){
    check_flag = false;
    if(!white){
        //console.log(king.parentElement);
        const row       = king.parentElement.id[1]-1;
        const column    = king.parentElement.id[3]-1;
        let i;
        let j;
        let start_row;
        let end_row;
        let start_column;
        let end_column;
        let start_row_up;
        let start_row_down;
        let end_row_up;
        let end_row_down;
        let start_column_up;
        let start_column_down;
        let end_column_up;
        let end_column_down;
        
        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row = i;
                break;
            }

            end_row = i;
        }
        
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;
            }
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        
        
        
        
        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;
            }
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;
            }
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        
        
        



            
    
    
    
        for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
            if((i == row) || (j == column)){
                end_row_up = i;
                end_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row_up = i-1;
                end_column_up = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row_up = i;
                end_column_up = j;
                break;
            }
            end_row_up = i;
            end_column_up = j;
                
        }
        for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
            if((i == row) || (j == column)){
                end_row_down = i;
                end_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row_down = i+1;
                end_column_down = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row_down = i;
                end_column_down = j;
                break;
            }
            end_row_down = i;
            end_column_down = j;
            
        }
        for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
            if((i == row) || (j == column)){
                start_row_down = i;
                start_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row_down = i+1;
                start_column_down = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row_down = i;
                start_column_down = j;
                break;
            }
            start_row_down = i;
            start_column_down = j;         
        } 
        for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
            if((i == row) || (j == column)){
                start_row_up = i;
                start_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row_up = i-1;
                start_column_up = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row_up = i;
                start_column_up = j;
                break;
            }
            start_row_up = i;
            start_column_up = j;
                
        } 



        i = row;
        j = column;
        //console.log(end_row,cells[end_row][j].children[0].id.match('_w'));
        
        //console.log(cells[end_row][j].children[0].id);
        if(cells[start_row][j].children.length == 1 && !check_flag){
            if(cells[start_row][j].children[0].id.match('queen_b') ||
                cells[start_row][j].children[0].id.match('rook_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
            }
        }
        if(cells[end_row][j].children.length == 1 && !check_flag){
        if(cells[end_row][j].children[0].id.match('queen_b') ||
            cells[end_row][j].children[0].id.match('rook_b')){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
            }
        }

        
        if(cells[i][start_column].children.length == 1 && !check_flag){
            if(cells[i][start_column].children[0].id.match('queen_b') ||
                cells[i][start_column].children[0].id.match('rook_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[i][end_column].children.length == 1 && !check_flag){
            if(cells[i][end_column].children[0].id.match('queen_b') ||
                cells[i][end_column].children[0].id.match('rook_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }




        if(cells[start_row_up][start_column_up].children.length == 1 && !check_flag){
            if(cells[start_row_up][start_column_up].children[0].id.match('queen_b') ||
                cells[start_row_up][start_column_up].children[0].id.match('bishop_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[start_row_down][start_column_down].children.length == 1 && !check_flag){
            if(cells[start_row_down][start_column_down].children[0].id.match('queen_b') ||
                cells[start_row_down][start_column_down].children[0].id.match('bishop_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[end_row_up][end_column_up].children.length == 1 && !check_flag){
            if(cells[end_row_up][end_column_up].children[0].id.match('queen_b') ||
                cells[end_row_up][end_column_up].children[0].id.match('bishop_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[end_row_down][end_column_down].children.length == 1 && !check_flag){
            if(cells[end_row_down][end_column_down].children[0].id.match('queen_b') ||
                cells[end_row_down][end_column_down].children[0].id.match('bishop_b')){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(i<7){
            if(j<7){
            if(cells[i+1][j+1].children.length == 1 && !check_flag){
                if( cells[i+1][j+1].children[0].id.match('pawn_b') ||
                    cells[i+1][j+1].children[0].id.match('king_b')){
                        undo();
                        white = true;
                        king.style.color = 'red';
                        check_flag = true;
                        console.log('check');
                    }
                }
                if(cells[i+1][j].children.length == 1 && !check_flag){
                    if(cells[i+1][j].children[0].id.match('king_b')){
                            undo();
                            white = true;
                            king.style.color = 'red';
                            check_flag = true;
                            console.log('check');
                        }
                    }
                    if(cells[i][j+1].children.length == 1 && !check_flag){
                        if(cells[i][j+1].children[0].id.match('king_b')){
                                undo();
                                white = true;
                                king.style.color = 'red';
                                check_flag = true;
                                console.log('check');
                            }
                        }
            }
            if(j>0){
            if(cells[i+1][j-1].children.length == 1 && !check_flag){
                if( cells[i+1][j-1].children[0].id.match('pawn_b') ||
                    cells[i+1][j-1].children[0].id.match('king_b')){
                        undo();
                        white = true;
                        king.style.color = 'red';
                        check_flag = true;
                        console.log('check');
                    }
                }
                if(cells[i][j-1].children.length == 1 && !check_flag){
                    if(cells[i][j-1].children[0].id.match('king_b')){
                            undo();
                            white = true;
                            king.style.color = 'red';
                            check_flag = true;
                            console.log('check');
                        }
                    }
                }
            }
        if(i>0){
            if(j<7){
            if(cells[i-1][j+1].children.length == 1 && !check_flag){
                if( cells[i-1][j+1].children[0].id.match('pawn_b') ||
                    cells[i-1][j+1].children[0].id.match('king_b')){
                        undo();
                        white = true;
                        king.style.color = 'red';
                        check_flag = true;
                        console.log('check');
                    }
                }
            }
            if(j>0){
            if(cells[i-1][j-1].children.length == 1 && !check_flag){
                if( cells[i-1][j-1].children[0].id.match('pawn_b') ||
                    cells[i-1][j-1].children[0].id.match('king_b')){
                        undo();
                        white = true;
                        king.style.color = 'red';
                        check_flag = true;
                        console.log('check');
                    }
                }
                if(cells[i-1][j-1].children.length == 1 && !check_flag){
                    if(cells[i-1][j-1].children[0].id.match('king_b')){
                            undo();
                            white = true;
                            king.style.color = 'red';
                            check_flag = true;
                            console.log('check');
                        }
                    }
                }
            
        } 

        if(!check_flag){
            let rkl = 99;
            let ckl = 99;

            if(knight_l_b.parentElement != null){
                rkl = knight_l_b.parentElement.id[1]-1;
                ckl = knight_l_b.parentElement.id[3]-1;
            }
            if(((row == (rkl-2))&&(column == (ckl+1)))&&(!check_flag)){
                    undo();
                    white = true;
                    king.style.color = 'red';
                    check_flag = true;
                    console.log('check');
            }
            
            if(((row == (rkl-2))&&(column == (ckl-1)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkl-1))&&(column == (ckl+2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkl-1))&&(column == (ckl-2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkl+2))&&(column == (ckl+1)))&&(!check_flag)){
            undo();
            white = true;
            king.style.color = 'red';
            check_flag = true;
            console.log('check');
        }
    
        if(((row == (rkl+2))&&(column == (ckl-1)))&&(!check_flag)){
            undo();
            white = true;
            king.style.color = 'red';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkl+1))&&(column == (ckl+2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkl+1))&&(column == (ckl-2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
            let rkr = 99;
            let ckr = 99;

            if(knight_r_b.parentElement != null){
                rkr = knight_r_b.parentElement.id[1]-1;
                ckr = knight_r_b.parentElement.id[3]-1;
            }
        if(((row == (rkr-2))&&(column == (ckr+1)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        
        if(((row == (rkr-2))&&(column == (ckr-1)))&&(!check_flag)){
            undo();
            white = true;
            king.style.color = 'red';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr-1))&&(column == (ckr+2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkr-1))&&(column == (ckr-2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkr+2))&&(column == (ckr+1)))&&(!check_flag)){
            undo();
            white = true;
            king.style.color = 'red';
            check_flag = true;
            console.log('check');
        }

        if(((row == (rkr+2))&&(column == (ckr-1)))&&(!check_flag)){
            undo();
            white = true;
            king.style.color = 'red';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr+1))&&(column == (ckr+2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkr+1))&&(column == (ckr-2)))&&(!check_flag)){
                undo();
                white = true;
                king.style.color = 'red';
                check_flag = true;
                console.log('check');
        }
    }           
        
      
    }

    else if(white){
        //console.log(king.parentElement);
        const row       = king_b.parentElement.id[1]-1;
        const column    = king_b.parentElement.id[3]-1;
        let i;
        let j;
        let start_row;
        let end_row;
        let start_column;
        let end_column;
        let start_row_up;
        let start_row_down;
        let end_row_up;
        let end_row_down;
        let start_column_up;
        let start_column_down;
        let end_column_up;
        let end_column_down;
        
        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row = i;
                break;
            }

            end_row = i;
        }
        
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;
            }
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        
        
        
        
        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;
            }
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;
            }
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        
        
        



            
    
    
    
        for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
            if((i == row) || (j == column)){
                end_row_up = i;
                end_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row_up = i-1;
                end_column_up = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row_up = i;
                end_column_up = j;
                break;
            }
            end_row_up = i;
            end_column_up = j;
                
        }
        for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
            if((i == row) || (j == column)){
                end_row_down = i;
                end_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row_down = i+1;
                end_column_down = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row_down = i;
                end_column_down = j;
                break;
            }
            end_row_down = i;
            end_column_down = j;
            
        }
        for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
            if((i == row) || (j == column)){
                start_row_down = i;
                start_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row_down = i+1;
                start_column_down = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row_down = i;
                start_column_down = j;
                break;
            }
            start_row_down = i;
            start_column_down = j;         
        } 
        for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
            if((i == row) || (j == column)){
                start_row_up = i;
                start_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row_up = i-1;
                start_column_up = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row_up = i;
                start_column_up = j;
                break;
            }
            start_row_up = i;
            start_column_up = j;
                
        } 



        i = row;
        j = column;
        //console.log(end_row,cells[end_row][j].children[0].id.match('_w'));
        
        //console.log(cells[end_row][j].children[0].id);
        if(cells[start_row][j].children.length == 1 && !check_flag){
            if(cells[start_row][j].children[0].id.match('queen_w') ||
                cells[start_row][j].children[0].id.match('rook_w')){
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
            }
        }
        if(cells[end_row][j].children.length == 1 && !check_flag){
        if(cells[end_row][j].children[0].id.match('queen_w') ||
            cells[end_row][j].children[0].id.match('rook_w')){
                
                undo();
                white = false;
                king_b.style.color = 'blue';
                check_flag = true;
                console.log('check');
            }
        }

        
        if(cells[i][start_column].children.length == 1 && !check_flag){
            if(cells[i][start_column].children[0].id.match('queen_w') ||
                cells[i][start_column].children[0].id.match('rook_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[i][end_column].children.length == 1 && !check_flag){
            if(cells[i][end_column].children[0].id.match('queen_w') ||
                cells[i][end_column].children[0].id.match('rook_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }




        if(cells[start_row_up][start_column_up].children.length == 1 && !check_flag){
            if(cells[start_row_up][start_column_up].children[0].id.match('queen_w') ||
                cells[start_row_up][start_column_up].children[0].id.match('bishop_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[start_row_down][start_column_down].children.length == 1 && !check_flag){
            if(cells[start_row_down][start_column_down].children[0].id.match('queen_w') ||
                cells[start_row_down][start_column_down].children[0].id.match('bishop_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[end_row_up][end_column_up].children.length == 1 && !check_flag){
            if(cells[end_row_up][end_column_up].children[0].id.match('queen_w') ||
                cells[end_row_up][end_column_up].children[0].id.match('bishop_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(cells[end_row_down][end_column_down].children.length == 1 && !check_flag){
            if(cells[end_row_down][end_column_down].children[0].id.match('queen_w') ||
                cells[end_row_down][end_column_down].children[0].id.match('bishop_w')){
                    
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                }
            }
        if(i<7){
            if(j<7){
            if(cells[i+1][j+1].children.length == 1 && !check_flag){
                if( cells[i+1][j+1].children[0].id.match('pawn_w') ||
                    cells[i+1][j+1].children[0].id.match('king_w')){
                        
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                    }
                }
                if(cells[i+1][j].children.length == 1 && !check_flag){
                    if(cells[i+1][j].children[0].id.match('king_w')){
                            
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                        }
                    }
                    if(cells[i][j+1].children.length == 1 && !check_flag){
                        if(cells[i][j+1].children[0].id.match('king_w')){
                                
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                            }
                        }
            }
            if(j>0){
            if(cells[i+1][j-1].children.length == 1 && !check_flag){
                if( cells[i+1][j-1].children[0].id.match('pawn_w') ||
                    cells[i+1][j-1].children[0].id.match('king_w')){
                        
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                    }
                }
                if(cells[i][j-1].children.length == 1 && !check_flag){
                    if(cells[i][j-1].children[0].id.match('king_w')){
                            
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                        }
                    }
                }
            }
        if(i>0){
            if(j<7){
            if(cells[i-1][j+1].children.length == 1 && !check_flag){
                if( cells[i-1][j+1].children[0].id.match('pawn_w') ||
                    cells[i-1][j+1].children[0].id.match('king_w')){
                        
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                    }
                }
            }
            if(j>0){
            if(cells[i-1][j-1].children.length == 1 && !check_flag){
                if( cells[i-1][j-1].children[0].id.match('pawn_w') ||
                    cells[i-1][j-1].children[0].id.match('king_w')){
                        
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                    }
                }
                if(cells[i-1][j-1].children.length == 1 && !check_flag){
                    if(cells[i-1][j-1].children[0].id.match('king_w')){
                            
                    undo();
                    white = false;
                    king_b.style.color = 'blue';
                    check_flag = true;
                    console.log('check');
                        }
                    }
                }
            
        } 

        if(!check_flag){
            let rkl = 99;
            let ckl = 99;

            if(knight_l.parentElement != null){
                rkl = knight_l.parentElement.id[1]-1;
                ckl = knight_l.parentElement.id[3]-1;
            }
            if(((row == (rkl-2))&&(column == (ckl+1)))&&(!check_flag)){
                    
                undo();
                white = false;
                king_b.style.color = 'blue';
                check_flag = true;
                console.log('check');
            }
            
            if(((row == (rkl-2))&&(column == (ckl-1)))&&(!check_flag)){
                
                undo();
                white = false;
                king_b.style.color = 'blue';
                check_flag = true;
                console.log('check');
        }
        if(((row == (rkl-1))&&(column == (ckl+2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkl-1))&&(column == (ckl-2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkl+2))&&(column == (ckl+1)))&&(!check_flag)){
            
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
    
        if(((row == (rkl+2))&&(column == (ckl-1)))&&(!check_flag)){
            
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkl+1))&&(column == (ckl+2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkl+1))&&(column == (ckl-2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
            let rkr = 99;
            let ckr = 99;

            if(knight_r.parentElement != null){
                rkr = knight_r.parentElement.id[1]-1;
                ckr = knight_r.parentElement.id[3]-1;
            }
        if(((row == (rkr-2))&&(column == (ckr+1)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        
        if(((row == (rkr-2))&&(column == (ckr-1)))&&(!check_flag)){
            
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr-1))&&(column == (ckr+2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr-1))&&(column == (ckr-2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr+2))&&(column == (ckr+1)))&&(!check_flag)){
            
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }

        if(((row == (rkr+2))&&(column == (ckr-1)))&&(!check_flag)){
            
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr+1))&&(column == (ckr+2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
        if(((row == (rkr+1))&&(column == (ckr-2)))&&(!check_flag)){
                
            undo();
            white = false;
            king_b.style.color = 'blue';
            check_flag = true;
            console.log('check');
        }
    }           
        
      
    }

    
}


function move(item,target){
    
    check_flag = false;
    target.append(item);
    white = !(white);
    king.style.color = 'white';
    check();
    

    //console.log(item,target);
}

function highlight_remover(id) {
    if(id == '#highlight'){
        const all_e = document.querySelectorAll(id);
        all_e.forEach(element => {
            //console.log(element);
            element.parentElement.removeChild(element);
        });
    }
    else{
        const all_e = document.querySelectorAll('I');
        all_e.forEach(item => {
            if(item.className.match(' highlited')){

                item.className = item.className.slice(0,(item.className.length-' highlited'.length));
                if(item.id.match('_w')){
                    item.className += ' white';
                }
                else if(item.id.match('_b')){
                    item.className += ' black';
                }
            }
            if(item.id.match('_b'))
                item.style.color = colors.pieces[1];
            else
            item.style.color = colors.pieces[0];
        });
    }

}



function road_map(item) {
    const row       = parseInt(item.parentElement.id[1])-1;
    const column    = parseInt(item.parentElement.id[3])-1;
    if(item.id == 'pawn_w'){

            if(row<7){
                if((column>0 && !(cells[row+1][column-1].children.length == 0))&&(!cells[row+1][column-1].children[0].id.match('_w')))
                    {cells[row+1][column-1].append(highlight(item,cells[row+1][column-1]))
                    }
                        
                if((column<7 && !(cells[row+1][column+1].children.length == 0))&&(!cells[row+1][column+1].children[0].id.match('_w')))
                    {cells[row+1][column+1].append(highlight(item,cells[row+1][column+1]));
               
                        }
                if(cells[row+1][column].children.length == 0){
                    cells[row+1][column].append(highlight(item,cells[row+1][column]));
                    }
                if(item.getAttribute('data-flag')=='true'){
                    if((cells[row+2][column].children.length == 0)){
                    cells[row+2][column].append(highlight(item,cells[row+2][column]));
                   }}
            }
            

    }
    else if(item.id == 'pawn_b'){

        if(row>0){
            if((column>0 && !(cells[row-1][column-1].children.length == 0))&&(!cells[row-1][column-1].children[0].id.match('_b')))
                {cells[row-1][column-1].append(highlight(item,cells[row-1][column-1]));
                }
                    
            if((column<7 && !(cells[row-1][column+1].children.length == 0))&&(!cells[row-1][column+1].children[0].id.match('_b')))
                {cells[row-1][column+1].append(highlight(item,cells[row-1][column+1]));
                    }
            if(cells[row-1][column].children.length == 0){
                cells[row-1][column].append(highlight(item,cells[row-1][column]));
                }
            if(item.getAttribute('data-flag')=='true')
                if((cells[row-2][column].children.length == 0)){
                    cells[row-2][column].append(highlight(item,cells[row-2][column]));
                }
            
        }
        

    }
    else if(item.id == 'king_w'){
    let i;
    let j;
    if(row == 0){
        if((0 < column) && (column < 7)){
            

            for(i = 0 ; i <= 1 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = 0 ; i <= 1 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = 0 ; i <= 1 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }
    else if((0 < row) && (row < 7)){

        if((0 < column) && (column < 7)){
            for(i = row - 1 ; i <= row + 1 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = row - 1 ; i <= row + 1 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = row - 1 ; i <= row + 1 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }
    else if(row == 7){

        if((0 < column) && (column < 7)){
            for(i = 6 ; i <= 7 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = 6 ; i <= 7 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = 6 ; i <= 7 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }

    

    

    }
    else if(item.id == 'king_b'){
    let i;
    let j;
    if(row == 0){
        if((0 < column) && (column < 7)){
            

            for(i = 0 ; i <= 1 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = 0 ; i <= 1 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = 0 ; i <= 1 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }
    else if((0 < row) && (row < 7)){

        if((0 < column) && (column < 7)){
            for(i = row - 1 ; i <= row + 1 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = row - 1 ; i <= row + 1 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = row - 1 ; i <= row + 1 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }
    else if(row == 7){

        if((0 < column) && (column < 7)){
            for(i = 6 ; i <= 7 ; i++){
                j = column - 1;
                for(;j<=column+1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 0){
            

            for(i = 6 ; i <= 7 ; i++){
                for(j=0;j<=1;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        else if(column == 7){
            

            for(i = 6 ; i <= 7 ; i++){
                for(j=6;j<=7;j++){
                    if(cells[i][j].children.length == 0){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                }
            }
        }
        
    }

    

    

    }
    else if(item.id == 'knight_w'){
        let i;
        let j;
        let k = 1;
        let flag = true;
                for(i = row-2 ; i <= row+2 ; i++){
                    if(i == row){
                        k = 2;
                        flag = false;
                        continue; 
                    }                           
                    j = column - k;
                    for(; j<=column+k ; j+=(2*k) ){
                        if((!((i >= 0)&&(i <=7))) || !((j >= 0)&&(j <=7))){
                            continue;
                        }
                        if(cells[i][j].children.length == 0){
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                        else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                    }
                    if(flag)
                        k++;
                    else
                        k--;
                }
        
    }
    else if(item.id == 'knight_b'){
        let i;
        let j;
        let k = 1;
        let flag = true;
                for(i = row-2 ; i <= row+2 ; i++){
                    if(i == row){
                        k = 2;
                        flag = false;
                        continue; 
                    }                           
                    j = column - k;
                    for(; j<=column+k ; j+=(2*k) ){
                        if((!((i >= 0)&&(i <=7))) || !((j >= 0)&&(j <=7))){
                            continue;
                        }
                        if(cells[i][j].children.length == 0){
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                        else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                    }
                    if(flag)
                        k++;
                    else
                        k--;
                }
        
    }

    else if(item.id == 'rook_w'){
        let i;
        let j;
        let k = 1;
        let flag = false;
        count = 0;
        let start_row;
        let end_row;
        let start_column;
        let end_column;

        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row = i;
                break;
            }
            end_row = i;
        }
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;}
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        for(i = start_row ; i <= end_row ; i++){
            j = column;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }

        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;}
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;}
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        for(j = start_column ; j <= end_column ; j++){
            i = row;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }

        
    }
    else if(item.id == 'rook_b'){
        let i;
        let j;
        let k = 1;
        let flag = false;
        count = 0;
        let start_row;
        let end_row;
        let start_column;
        let end_column;

        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row = i;
                break;
            }
            end_row = i;
        }
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;}
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        for(i = start_row ; i <= end_row ; i++){
            j = column;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }

        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;}
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;}
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        for(j = start_column ; j <= end_column ; j++){
            i = row;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }

        
    }
    else if(item.id == 'bishop_w'){
        let i;
        let j;
        let k = 1;
        let flag = false;
        count = 0;
        let start_row_up;
        let start_row_down;
        let end_row_up;
        let end_row_down;
        let start_column_up;
        let start_column_down;
        let end_column_up;
        let end_column_down;



        for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
                if((i == row) || (j == column)){
                    end_row_up = i;
                    end_column_up = j;
                    continue;
                }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row_up = i-1;
                end_column_up = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row_up = i;
                end_column_up = j;
                break;
            }
            end_row_up = i;
            end_column_up = j;
            
        }
        for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
            if((i == row) || (j == column)){
                end_row_down = i;
                end_column_down = j;
                continue;
            }
        if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
            end_row_down = i+1;
            end_column_down = j-1;
            break;
        }
        else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
            end_row_down = i;
            end_column_down = j;
            break;
        }
        end_row_down = i;
        end_column_down = j;
        
    }
            for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
                    if((i == row) || (j == column)){
                        start_row_down = i;
                        start_column_down = j;
                        continue;
                    }
                if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                    start_row_down = i+1;
                    start_column_down = j+1;
                    break;
                }
                else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                    start_row_down = i;
                    start_column_down = j;
                    break;
                }
                start_row_down = i;
                start_column_down = j;
                
            } 
            for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
                if((i == row) || (j == column)){
                    start_row_up = i;
                    start_column_up = j;
                    continue;
                }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row_up = i-1;
                start_column_up = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row_up = i;
                start_column_up = j;
                break;
            }
            start_row_up = i;
            start_column_up = j;
            
        } 

                for(i = start_row_down, j = start_column_down ; (i <= end_row_up && j <= end_column_up) ; i++,  j++){
                    if(cells[i][j].children.length == 0){
                        //console.log('khali',i,j);
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                        //console.log('por',i,j);
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                
            }       
            for(i = start_row_up, j = start_column_up ; (i >= end_row_down && j <= end_column_down) ; i--,  j++){
                if(cells[i][j].children.length == 0){
                    //console.log('khali',i,j);
                    cells[i][j].append(highlight(item,cells[i][j]));
                }
                else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                    //console.log('por',i,j);
                    cells[i][j].append(highlight(item,cells[i][j]));
                }
            
        }  
        }
    else if(item.id == 'bishop_b'){
            let i;
            let j;
            let k = 1;
            let flag = false;
            count = 0;
            let start_row_up;
            let start_row_down;
            let end_row_up;
            let end_row_down;
            let start_column_up;
            let start_column_down;
            let end_column_up;
            let end_column_down;
    
    
    
            for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
                    if((i == row) || (j == column)){
                        end_row_up = i;
                        end_column_up = j;
                        continue;
                    }
                if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                    end_row_up = i-1;
                    end_column_up = j-1;
                    break;
                }
                else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                    end_row_up = i;
                    end_column_up = j;
                    break;
                }
                end_row_up = i;
                end_column_up = j;
                
            }
            for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
                if((i == row) || (j == column)){
                    end_row_down = i;
                    end_column_down = j;
                    continue;
                }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row_down = i+1;
                end_column_down = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row_down = i;
                end_column_down = j;
                break;
            }
            end_row_down = i;
            end_column_down = j;
            
        }
                for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
                        if((i == row) || (j == column)){
                            start_row_down = i;
                            start_column_down = j;
                            continue;
                        }
                    if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                        start_row_down = i+1;
                        start_column_down = j+1;
                        break;
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        start_row_down = i;
                        start_column_down = j;
                        break;
                    }
                    start_row_down = i;
                    start_column_down = j;
                    
                } 
                for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
                    if((i == row) || (j == column)){
                        start_row_up = i;
                        start_column_up = j;
                        continue;
                    }
                if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                    start_row_up = i-1;
                    start_column_up = j+1;
                    break;
                }
                else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                    start_row_up = i;
                    start_column_up = j;
                    break;
                }
                start_row_up = i;
                start_column_up = j;
                
            } 
    
                    for(i = start_row_down, j = start_column_down ; (i <= end_row_up && j <= end_column_up) ; i++,  j++){
                        if(cells[i][j].children.length == 0){
                            //console.log('khali',i,j);
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                        else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                            //console.log('por',i,j);
                            cells[i][j].append(highlight(item,cells[i][j]));
                        }
                    
                }       
                for(i = start_row_up, j = start_column_up ; (i >= end_row_down && j <= end_column_down) ; i--,  j++){
                    if(cells[i][j].children.length == 0){
                        //console.log('khali',i,j);
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                    else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                        //console.log('por',i,j);
                        cells[i][j].append(highlight(item,cells[i][j]));
                    }
                
            }  
            }
    else if(item.id == 'queen_w'){
        let i;
        let j;
        let start_row;
        let end_row;
        let start_column;
        let end_column;
        let start_row_up;
        let start_row_down;
        let end_row_up;
        let end_row_down;
        let start_column_up;
        let start_column_down;
        let end_column_up;
        let end_column_down;
        
        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row = i;
                break;
            }

            end_row = i;
        }
        
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;
            }
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        for(i = start_row ; i <= end_row ; i++){
            j = column;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                 cells[i][j].append(highlight(item,cells[i][j]));
            }
        }
        
        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;
            }
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;
            }
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        for(j = start_column ; j <= end_column ; j++){
            i = row;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }
        



            
    
    
    
        for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
            if((i == row) || (j == column)){
                end_row_up = i;
                end_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row_up = i-1;
                end_column_up = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row_up = i;
                end_column_up = j;
                break;
            }
            end_row_up = i;
            end_column_up = j;
                
        }
        for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
            if((i == row) || (j == column)){
                end_row_down = i;
                end_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                end_row_down = i+1;
                end_column_down = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                end_row_down = i;
                end_column_down = j;
                break;
            }
            end_row_down = i;
            end_column_down = j;
            
        }
        for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
            if((i == row) || (j == column)){
                start_row_down = i;
                start_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row_down = i+1;
                start_column_down = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row_down = i;
                start_column_down = j;
                break;
            }
            start_row_down = i;
            start_column_down = j;         
        } 
        for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
            if((i == row) || (j == column)){
                start_row_up = i;
                start_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_w'))){
                start_row_up = i-1;
                start_column_up = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                start_row_up = i;
                start_column_up = j;
                break;
            }
            start_row_up = i;
            start_column_up = j;
                
        } 
    
        for(i = start_row_down, j = start_column_down ; (i <= end_row_up && j <= end_column_up) ; i++,  j++){
            if(cells[i][j].children.length == 0){
                //console.log('khali',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                //console.log('por',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
                    
        }       
        for(i = start_row_up, j = start_column_up ; (i >= end_row_down && j <= end_column_down) ; i--,  j++){
            if(cells[i][j].children.length == 0){
                //console.log('khali',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_w'))){
                //console.log('por',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
                
        }  
    }
    else if(item.id == 'queen_b'){
        let i;
        let j;
        let start_row;
        let end_row;
        let start_column;
        let end_column;
        let start_row_up;
        let start_row_down;
        let end_row_up;
        let end_row_down;
        let start_column_up;
        let start_column_down;
        let end_column_up;
        let end_column_down;
        
        for(i = row ; i <= 7 ; i++){
            if(i == row){
                end_row = i;
                continue;}
            j = column;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row = i-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row = i;
                break;
            }

            end_row = i;
        }
        
        for(i = row ; i >= 0 ; i--){
            if(i == row){
                start_row = i;
                continue;
            }
            j = column;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row = i+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row = i;
                break;
            }
            start_row = i;
        }
        //console.log(start_row, end_row);
        for(i = start_row ; i <= end_row ; i++){
            j = column;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                 cells[i][j].append(highlight(item,cells[i][j]));
            }
        }
        
        for(j = column ; j <= 7 ; j++){
            if(j == column){
                end_column = j;
                continue;
            }
            i = row;
            //console.log(i,j);
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_column = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_column = j;
                break;
            }
            end_column = j;
        }
        for(j = column ; j >= 0 ; j--){
            if(j == column){
                start_column = j;
                continue;
            }
            i = row;
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_column = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_column = j;
                break;
            }
            start_column = j;
        }
        for(j = start_column ; j <= end_column ; j++){
            i = row;
            if(cells[i][j].children.length == 0){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                cells[i][j].append(highlight(item,cells[i][j]));
            }
        }
        



            
    
    
    
        for(i = row ,j = column; (i <= 7 && j <= 7) ; i++,j++){
            if((i == row) || (j == column)){
                end_row_up = i;
                end_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row_up = i-1;
                end_column_up = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row_up = i;
                end_column_up = j;
                break;
            }
            end_row_up = i;
            end_column_up = j;
                
        }
        for(i = row ,j = column; (i >= 0 && j <= 7) ; i--,j++){
            if((i == row) || (j == column)){
                end_row_down = i;
                end_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                end_row_down = i+1;
                end_column_down = j-1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                end_row_down = i;
                end_column_down = j;
                break;
            }
            end_row_down = i;
            end_column_down = j;
            
        }
        for(i = row ,j = column; (i >= 0 && j >= 0) ; i--,j--){
            if((i == row) || (j == column)){
                start_row_down = i;
                start_column_down = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row_down = i+1;
                start_column_down = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row_down = i;
                start_column_down = j;
                break;
            }
            start_row_down = i;
            start_column_down = j;         
        } 
        for(i = row ,j = column; (i <= 7 && j >= 0) ; i++,j--){
            if((i == row) || (j == column)){
                start_row_up = i;
                start_column_up = j;
                continue;
            }
            if((cells[i][j].children.length == 1)&&(cells[i][j].children[0].id.match('_b'))){
                start_row_up = i-1;
                start_column_up = j+1;
                break;
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                start_row_up = i;
                start_column_up = j;
                break;
            }
            start_row_up = i;
            start_column_up = j;
                
        } 
    
        for(i = start_row_down, j = start_column_down ; (i <= end_row_up && j <= end_column_up) ; i++,  j++){
            if(cells[i][j].children.length == 0){
                //console.log('khali',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                //console.log('por',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
                    
        }       
        for(i = start_row_up, j = start_column_up ; (i >= end_row_down && j <= end_column_down) ; i--,  j++){
            if(cells[i][j].children.length == 0){
                //console.log('khali',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
            else if((cells[i][j].children.length == 1)&&(!cells[i][j].children[0].id.match('_b'))){
                //console.log('por',i,j);
                cells[i][j].append(highlight(item,cells[i][j]));
            }
                
        }  
    }

    
                
    
}

function highlight(item,target) {

    const h = document.createElement('DIV');
    h.id    = 'highlight'

    if(target.children.length == 1){
        h.style.backgroundColor = '#ff0000a9';
        //console.log('hey',target.children);
    }
    else{
        h.style.backgroundColor = '#7d03cea3';
    }
    h.style.width       = size/8 +'px';
    h.style.height      = size/8 +'px';
    h.style.cursor      = 'pointer';
    h.style.position    = 'absolute';
    h.style.top         = '0';
    h.style.left        = '0';
    h.style.zIndex      = '5';

    h.addEventListener('click',(element) => {
        //console.log(target.children.length);
        highlight_remover('#highlight');
        
        if(target.children.length == 1){
            
            if(!target.children[0].id.match('king')){
                history[history_count] =  [target.children[0],target.children[0].parentElement,target.children[0].getAttribute('data-flag'),target.children[0].id,target.children[0].className];
                history_flag[history_count] = true;
                history_count++;

                
                txt[log_counter] = ' ('+(log_counter+1) + '. ' + target.children[0].id + ' removed)';
                log_counter++;
                ptxt.textContent = txt;
                
                //console.log(target.children[0].id, 'removed');
                //const a = target.children[0];
                target.removeChild(target.children[0]);  
                //console.log(a, (a.parentElement == null));
            }
        }
        if(target.children.length != 0){

            if(!target.children[0].id.match('king'))
            move(item,target);
        }
        else{
            history[history_count] =  [item,item.parentElement,item.getAttribute('data-flag'),item.id,item.className];
            history_flag[history_count] = false;
            history_count++;
            move(item,target);
            if(item.id.match('pawn')){
                //console.log(item.getAttribute('data-flag'));
                item.setAttribute('data-flag' , 'false');
                //history[history_count-2][3] = item.id;

                if(parseInt(item.parentElement.id[1]) == 8){
                    item.className = queen_shape;
                    item.id = 'queen_w';
                }
                if(parseInt(item.parentElement.id[1]) == 1){
                    item.className = queen_shape;
                    item.id = 'queen_b';
                }
            }
        }
            
        //element.path[0].parentElement.removeChild(element.path[0]);
    });

    //element.path[0].style.display = 'none';
    return h;   
}

function undo(){
    if(!(history_count>0))
        return;
    
    highlight_remover('#highlight');
    highlight_remover();
    move(history[history_count-1][0],history[history_count-1][1]);
    history[history_count-1][0].setAttribute('data-flag',history[history_count-1][2]);
    history[history_count-1][0].id = history[history_count-1][3];
    history[history_count-1][0].className = history[history_count-1][4];
    history_count--;
    if(history_flag[history_count-1]){
        move(history[history_count-1][0],history[history_count-1][1]);
        history[history_count-1][0].setAttribute('data-flag',history[history_count-1][2]);
        history[history_count-1][0].id = history[history_count-1][3];
        history[history_count-1][0].className = history[history_count-1][4];
        history_count--;
        white = !white;
        txt.pop();
        ptxt.textContent = txt;
        log_counter--;
    }
    
    
}
button.addEventListener('click',  undo)

styling();
arrange();

//the size of the pieces
const pieces = document.querySelectorAll('I');
//console.log(pieces);

log_txt.append(ptxt);

pieces.forEach(item => {
    //console.log('he');
    item.style.fontSize = `${size/16}px`;
    item.style.cursor   = `pointer`;
    item.style.width    = `${size/16}px`;
    item.style.height   = `${size/16}px`;
    
    if(item.id.match('_w')){
        item.className += ' white';
    }
    else if(item.id.match('_b')){
        item.className += ' black';
    }
    //console.log(item.style);
    //const id = item.id;
    item.addEventListener('click', (data) => {
        //log_txt.append(id);
        if(     (item.id.match('_w'))&&(white)
            ||  (item.id.match('_b'))&&(!white)){
        //log_txt.append(id);
        highlight_remover('#highlight');
        highlight_remover('piece');
        if(     (item.className.match(' black'))    ||  (item.className.match(' white'))){

            item.className = item.className.slice(0,(item.className.length-' white'.length));
            item.className += ' highlited';
        }
        
        road_map(item);
        //move(item,cells[2][3])
        //console.log(data,data.path[0],cells[3][3]);
        }
    });
});











