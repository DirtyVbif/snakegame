class MUCoreGame
{
    get STATUS ()
    {
        return {
            STOP:  0,
            PLAY:  1,
            PAUSE: 2
        }
    }

    /**
     * @type {HTMLElement}
     */
    #board;

    /**
     * @type {HTMLButtonElement}
     */
    #action_start;

    #status = this.STATUS.STOP;

    /**
     * @type {MUCoreGameSnake}
     */
    #snake;

    #speed = 1;

    #score = 0;

    get is_play ()
    {
        return this.#status === this.STATUS.PLAY;
    }

    get is_stop ()
    {
        return this.#status === this.STATUS.STOP;
    }

    get is_pause ()
    {
        return this.#status === this.STATUS.PAUSE;
    }

    /**
     * @param {HTMLElement} board
     */
    constructor (board)
    {
        this.#board = board;
    }

    initialize ()
    {
        this.#initializeControls();
        this.#initializeEvents();
    }

    #initializeControls ()
    {
        this.#action_start = this.#board.querySelector('#board-play');
    }

    #initializeEvents ()
    {
        MUDoc.onclick(
            this.#action_start,
            event => this.#start(event)
        );
    }

    #start (event)
    {
        event.preventDefault();

        if (this.is_play) {
            this.pause();
        } else {
            this.start();
        }
    }

    start ()
    {
        if (this.is_stop) {
            this.#startNew();
        } else if (this.is_pause) {
            this.resume()
        }
    }

    pause ()
    {
        if (!this.is_play) {
            return;
        }
        this.#status = this.STATUS.PAUSE;
    }

    resume ()
    {
        this.#status = this.STATUS.PLAY;
    }

    stop ()
    {
        if (this.is_stop) {
            return;
        }
        this.#status = this.STATUS.STOP;

        // TODO: remove control events handler
    }

    #startNew ()
    {
        this.#status = this.STATUS.PLAY;
        this.#score = 0;
        this.#snake = new MUCoreGameSnake();

        // TODO: initialize selected speed

        // TODO: create control events handlers

        // TODO: create ticks
    }
}