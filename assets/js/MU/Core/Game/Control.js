class MUCoreGameControl
{
    get s ()
    {
        return {
            selector: {
                action: '#board-action'
            },
            speed: {
                max: 12,
                min: 1
            },
            action: {
                state: {
                    stop:  'Play',
                    play:  'Pause',
                    pause: 'Resume'
                }
            }
        }
    }

    get STATUS ()
    {
        return {
            STOP:  0,
            PLAY:  1,
            PAUSE: 2
        }
    }

    /**
     * @type {MUCoreGame}
     */
    #game;

    /**
     * @type {HTMLButtonElement}
     */
    #action;

    /**
     * @type {number}
     */
    #speed = 1;

    /**
     * @type {number}
     */
    #status;

    /**
     * @returns {HTMLButtonElement}
     */
    get action ()
    {
        return this.#action;
    }

    /**
     * @returns {number}
     */
    get speed ()
    {
        return this.#speed;
    }

    get speed_up ()
    {
        if (this.#speed < this.s.speed.max) {
            --this.#speed;

            return true;
        }

        return false;
    }

    get speed_down ()
    {
        if (this.#speed > this.s.speed.min) {
            --this.#speed;

            return true;
        }

        return false;
    }

    get status ()
    {
        return this.#status;
    }

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

    constructor (game)
    {
        this.#game = game;
    }

    initialize ()
    {
        this.#action = this.#game.board.querySelector(this.s.selector.action);
    }

    setStatePlay ()
    {
        this.#status = this.STATUS.PLAY;
        this.#action.innerText = this.s.action.state.play;
    }

    setStatePause ()
    {
        this.#status = this.STATUS.PAUSE;
        this.#action.innerText = this.s.action.state.pause;
    }

    setStateStop ()
    {
        this.#status = this.STATUS.STOP;
        this.#action.innerText = this.s.action.state.stop;
    }

    setInitialState ()
    {
        this.#status = this.STATUS.STOP;
        this.#action.innerText = this.s.action.state.stop;
        this.#action.disabled = false;
    }
}