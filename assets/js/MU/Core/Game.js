class MUCoreGame
{
    /**
     * @type {HTMLElement}
     */
    #board;

    /**
     * @type {MUCoreGameControl}
     */
    #control;

    /**
     * @type {MUCoreGameSnake}
     */
    #snake;

    /**
     * @type {MUCoreGameScore}
     */
    #score;

    get board ()
    {
        return this.#board;
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
        this.#loading(true);
        this.#initializeControls();
        this.#initializeEvents();
        this.#viewStartScreen();
    }

    #initializeControls ()
    {
        this.#control = new MUCoreGameControl(this);
        this.#control.initialize();

        this.#score = new MUCoreGameScore(this);
        this.#score.initialize();
    }

    #initializeEvents ()
    {
        MUDoc.onclick(
            this.#control.action,
            event => this.#start(event)
        );
    }

    #loading (statement)
    {
        MUDoc.loading(this.#board, !statement);
    }

    #start (event)
    {
        event.preventDefault();

        if (this.#control.is_play) {
            this.pause();
        } else {
            this.start();
        }
    }

    start ()
    {
        if (this.#control.is_stop) {
            this.#startNew();
        } else if (this.#control.is_pause) {
            this.resume()
        }
    }

    pause ()
    {
        if (this.#control.is_play) {
            this.#control.setStatePause();
        }
    }

    resume ()
    {
        if (this.#control.is_pause) {
            this.#control.setStatePlay();
        }
    }

    stop ()
    {
        if (!this.#control.is_stop) {
            this.#control.setStateStop();

            // TODO: remove control events handler
        }
    }

    #startNew ()
    {
        this.#control.setStatePlay();
        this.#score.reset();
        this.#snake = new MUCoreGameSnake();

        // TODO: initialize selected speed

        // TODO: create control events handlers

        // TODO: create ticks
    }

    #viewStartScreen ()
    {
        // TODO: render first screen
        this.#control.setInitialState();
        this.#loading(false);
    }
}