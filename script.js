const board = document.getElementById('board');
const table = document.getElementById('table');
const log_txt = document.getElementById('log');
let log_counter = 1;



const colors = ['white' , 'black'];
const size = 512;

function styling() {
    board.style.width =size+'px';
    board.style.height =size+'px';
    board.style.backgroundColor = 'orange';

}


// icons from fontawesome
const rook_shape    = 'fas fa-chess-rook'   ;
const queen_shape   = 'fas fa-chess-queen'  ;
const king_shape    = 'fas fa-chess-king'   ;
const knight_shape  = 'fas fa-chess-knight' ;
const bishop_shape  = 'fas fa-chess-bishop' ;
const pawn_shape    = 'fas fa-chess-pawn'   ;


//creating black pieces
const rook_r = document.createElement('I');
rook_r.className = rook_shape;
rook_r.id = 'rook_w';
rook_r.style.color = colors[0];
const rook_l = document.createElement('I');
rook_l.className = rook_shape;
rook_l.id = 'rook_w';
rook_l.style.color = colors[0];


const bishop_r = document.createElement('I');
bishop_r.className = bishop_shape;
bishop_r.id = 'bishop_w';
bishop_r.style.color = colors[0];
const bishop_l = document.createElement('I');
bishop_l.className = bishop_shape;
bishop_l.id = 'bishop_w';
bishop_l.style.color = colors[0];

const queen = document.createElement('I');
queen.className = queen_shape;
queen.id = 'queen_w';
queen.style.color = colors[0];

const king = document.createElement('I');
king.className = king_shape;
king.id = 'king_w';
king.style.color = colors[0];

const knight_r = document.createElement('I');
knight_r.className = knight_shape;
knight_r.id = 'knight_w';
knight_r.style.color = colors[0];
const knight_l = document.createElement('I');
knight_l.className = knight_shape;
knight_l.id = 'knight_w';
knight_l.style.color = colors[0];

let p;
let pawn = [];
for (p = 0 ; p < 8 ; p++){
pawn[p] = document.createElement('I');
pawn[p].className = pawn_shape;
pawn[p].setAttribute('data-flag' , 'true');
pawn[p].id = 'pawn_w'
pawn[p].style.color = colors[0];
}

//creating black pieces
const rook_r_b = document.createElement('I');
rook_r_b.className = rook_shape;
rook_r_b.id = 'rook_b';
rook_r_b.style.color = colors[1];
const rook_l_b = document.createElement('I');
rook_l_b.className = rook_shape;
rook_l_b.id = 'rook_b';
rook_l_b.style.color = colors[1];


const bishop_r_b = document.createElement('I');
bishop_r_b.className = bishop_shape;
bishop_r_b.id = 'bishop_b';
bishop_r_b.style.color = colors[1];
const bishop_l_b = document.createElement('I');
bishop_l_b.className = bishop_shape;
bishop_l_b.id = 'bishop_b';
bishop_l_b.style.color = colors[1];

const queen_b = document.createElement('I');
queen_b.className = queen_shape;
queen_b.id = 'queen_b';
queen_b.style.color = colors[1];

const king_b = document.createElement('I');
king_b.className = king_shape;
king_b.id = 'king_b';
king_b.style.color = colors[1];

const knight_r_b = document.createElement('I');
knight_r_b.className = knight_shape;
knight_r_b.id = 'knight_b';
knight_r_b.style.color = colors[1];
const knight_l_b = document.createElement('I');
knight_l_b.className = knight_shape;
knight_l_b.id = 'knight_b';
knight_l_b.style.color = colors[1];

let pawn_b = [];
for (p = 0 ; p < 8 ; p++){
pawn_b[p] = document.createElement('I');
pawn_b[p].className = pawn_shape;
pawn_b[p].setAttribute('data-flag' , 'true');
pawn_b[p].id = 'pawn_b'
pawn_b[p].style.color = colors[1];
pawn_b[p].style.zIndex = '10';
}

// assigning cells
let rows = [];
let cells = [[],[],[],[],[],[],[],[]];
let i,j;
for (i = 0 ; i < 8 ; i++) {
    rows[i] = document.getElementById('r'+(i+1));
    rows[i].style.width =size+'px';
    rows[i].style.height =size/8+'px';

    for (j = 0 ; j < 8 ; j++) {
        cells[i][j] = document.getElementById(`r${i+1}_${j+1}`);
        cells[i][j].className = 'cell';
        if((i+j)%2 == 0)
            cells[i][j].style.backgroundColor = 'red';
            cells[i][j].style.position = 'relative';
            //cells[i][j].style.alignItems = 'center';
            //cells[i][j].style.display = 'flex';
            //cells[i][j].style.alignItem = 'center';
            //console.log(cells[i][j].style.alignItem);
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
    for (p = 0 ; p < 8 ; p++)
        cells[1][p].append(pawn[p]);

    cells[7][0].append(rook_l_b);
    cells[7][7].append(rook_r_b);
    cells[7][1].append(knight_l_b);
    cells[7][6].append(knight_r_b);
    cells[7][2].append(bishop_l_b);
    cells[7][5].append(bishop_r_b);
    cells[7][3].append(queen_b);
    cells[7][4].append(king_b);
    for (p = 0 ; p < 8 ; p++)
        cells[6][p].append(pawn_b[p]);
}
styling();
arrange();

//the size of the pieces
const pieces = document.querySelectorAll('I');
pieces.forEach(item => {
    item.style.fontSize = `${size/16}px`;
    item.style.cursor = `pointer`;
    item.addEventListener('click', data => {
        highlight_remover('#highlight');
        highlight_remover('piece');
        data.path[0].style.color = 'yellow';
        
        road_map(item);
        //move(item,cells[2][3])
        //console.log(data,data.path[0],cells[3][3]);
    })
})

function move(item,b){
    b.append(item);
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
            console.log(i,j);
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
        console.log(start_row, end_row);
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
            console.log(i,j);
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
            console.log(i,j);
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
        console.log(start_row, end_row);
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
            console.log(i,j);
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
}

function highlight(item,target) {

    const h = document.createElement('DIV');
    h.id = 'highlight'
    if(target.children.length == 1){
        h.style.backgroundColor = '#0054fcba';
        //console.log('hey',target.children);
    }else
        h.style.backgroundColor = '#5700fcba';
    h.style.width = size/8 +'px';
    h.style.height = size/8 +'px';
    h.style.cursor = 'pointer';
    h.style.position = 'absolute';
    h.style.top = '0';
    h.style.left = '0';
    h.style.zIndex = '5';

    h.addEventListener('click',(element) => {
        //console.log(target.children.length);
        highlight_remover('#highlight');
        
        if(target.children.length == 1){
            
            if(!target.children[0].id.match('king')){
                const txt = document.createElement("P");
                txt.textContent =  log_counter + '. ' + target.children[0].id + ' removed';
                log_counter++;
                log_txt.append(txt);
                console.log(target.children[0].id, 'removed');
                target.removeChild(target.children[0]);
                
            }
            
        }
        if(target.children.length != 0){
            if(!target.children[0].id.match('king'))
                move(item,target);
        }
        else{
            move(item,target);

            if(item.id.match('pawn')){


            console.log(item.getAttribute('data-flag'));
            item.setAttribute('data-flag' , 'false');

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

function highlight_remover(id) {
    if(id == '#highlight'){
        const all_e = document.querySelectorAll(id);
        all_e.forEach(element => {
            //console.log(element);
            element.parentElement.removeChild(element);
        });}
    else{
        const all_e = document.querySelectorAll('I');
        all_e.forEach(item => {
            if(item.id.match('_b'))
                item.style.color = colors[1];
            else
            item.style.color = colors[0];
        })
    }

}