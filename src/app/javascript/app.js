
const { init, loadModels, setupWebcam, playerMove } = require('./detect')
const Game = require('./game')

async function App() {

    const show_count_down_timer = async (time) => {

        const div = document.createElement('div')
            div.classList.add('flash-splash-message', 'background-primary')

            const h2 = document.createElement('h2')
            h2.classList.add('text-primary')
            div.appendChild(h2)
            h2.innerText = "Ready"

            document.body.appendChild(div)


            let count_down = time - 1

        return new Promise((resolve, reject) => {

                const interval = setInterval(() => {
                h2.innerText = --count_down
                if (count_down == 0) {
                    h2.innerText = 'Now'
                }
                if (count_down == -1) {
                    div.remove();
                    clearInterval(interval);
                    resolve()
                }
            }, 1000)
        })

    }

    const show_message = (message) => {
        const div = document.createElement('div')
        div.classList.add('flash-splash-message', 'background-primary')

        const h2 = document.createElement('h2')
        h2.classList.add('text-primary')

        h2.innerText = message
        div.appendChild(h2)

        document.body.appendChild(div)

        setTimeout(() => {
            div.remove();
        }, 200);
    }

    const sleep = async (time) => {
        return new Promise((resolve)=>{
            setTimeout(resolve, 1000 * time)
        })
    }


    const $computer_move_image = document.getElementById('computer_move_image')
    const $player_move_image = document.getElementById('player_move_image')
    const $computer_move_text = document.getElementById('computer_move_text')
    const $player_move_text = document.getElementById('player_move_text')


    const show_move = (compuer_move, player_move)=>{
        $computer_move_image.classList.remove('rock','paper','scissors');   
        if(compuer_move.length !=0 ){   
            $computer_move_image.classList.add(compuer_move);        
        }
        $computer_move_text.innerText = compuer_move;

        $player_move_image.classList.remove('rock','paper','scissors');  
        if(player_move.length != 0){
            $player_move_image.classList.add(player_move);        
        }
        $player_move_text.innerText = player_move;
    }


    const game = new Game({
        result: {
            player: () => show_message("You Won"),
            computer: () => show_message("You Lost"),
            draw: () => show_message("Draw")
        },
        move: {
            show_move: show_move
        }
    });



    let game_timeout;

    window.game = game
    window.show_count_down_timer = show_count_down_timer

    const $start_game_button = document.getElementById('start_game_button')
    const $splash_screen = document.getElementById('initail-loading-screen')
    const $webcamContainer = document.getElementById('content1')
    const $reset_game_button = document.getElementById('reset_game_button')
    const $user_score = document.getElementById('user-score')
    const $computer_score = document.getElementById('computer-score')

    const changeStartingButtonState = function (text, disabled = false) {
        $start_game_button.innerHTML = text;
        $start_game_button.disabled = disabled;
    }


    changeStartingButtonState('PLEASE WAIT WHILE MODALS ARE BEING DOWNLOADED.....', true)

    await loadModels()

    changeStartingButtonState('Start Game')


    const play_round = async ()=>{
            await show_count_down_timer(5)
        
            const player_move = await playerMove()

            if(player_move == 'blank'){
                show_message("Please Make a move");
            } else {
                game.play(player_move)
            }

            game_timeout = setTimeout(play_round, 1000)
    }


    $start_game_button.addEventListener('click', async () => {

        changeStartingButtonState('Please Allow Webcam Access.....', true)
        await setupWebcam($webcamContainer)

        $splash_screen.classList.add('d-none');

        init();

        const render_scores = () => {
            $user_score.innerHTML = game.player_score
            $computer_score.innerHTML = game.computer_score
            setTimeout(() => window.requestAnimationFrame(render_scores), 200);
        }

        window.requestAnimationFrame(render_scores)
        
        await sleep(1);

        show_move('','');

        play_round()

    })

    



    $reset_game_button.addEventListener('click', () => {
        game.reset()
        clearTimeout(game_timeout);
    })




}

module.exports = App;