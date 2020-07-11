const WINNING_MOVES = {
    'paper': 'rock',
    'scissors': 'paper',
    'rock': 'scissors'
}

module.exports = class Game {

    
    constructor(callbacks) {
        this.player_score = 0
        this.computer_score = 0

        this.callbacks = callbacks;
    }

    reset() {
        this.player_score = 0
        this.computer_score = 0
    }

    moveValid(move) {
        return Object.keys(WINNING_MOVES).indexOf(move) !== -1
    }

    play(player_move) {
        if (!this.moveValid(player_move)) {
            throw "Invalid Move Exception"
        }

        const computer_move = this.computerMove()
        const win = this.won(player_move, computer_move);

        if (win == 1) {
            this.player_score++
            this.callbacks.result.player()
        } else if (win == -1) {
            this.computer_score++
            this.callbacks.result.computer()
        } else {
            this.callbacks.result.draw()
        }
        this.callbacks.move.show_move(computer_move, player_move);
        return win
    }

    won(player_move, computer_move) {
        if (player_move == computer_move) return 0
        return WINNING_MOVES[player_move] == computer_move ? 1 : -1
    }

    computerMove() {
        const computerChoice = Math.random();
        switch (getRandomInt(1, 3)) {
            case 1:
                return "rock";
                break;
            case 2:
                return "paper";
                break;
            case 3:
                return "scissors";
                break;
        }
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}