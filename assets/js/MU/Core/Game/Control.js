class MUCoreGameControl
{
    get s ()
    {
        return {
            selector: {
                action: '#board-action',
                size: '.board__control_size'
            },
            speed: {
                max: 12,
                min: 1
            },
            action: {
                state: {
                    stop: 'Play',
                    play: 'Pause',
                    pause: 'Resume'
                }
            },
            sizes: [
                [33, 25],
                [33, 33],
                [49, 33],
            ],
            default_size: 1,
            class: {
                active: 'active'
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

    #initialized = false;

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
     * @type {NodeListOf<HTMLButtonElement>}
     */
    #size_controls;

    #selected_size;

    /**
     * @type {function[]}
     */
    #on_resize = [];

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

    /**
     * @returns {boolean}
     */
    get speed_up ()
    {
        if (this.#speed < this.s.speed.max) {
            --this.#speed;

            return true;
        }

        return false;
    }

    /**
     * @returns {boolean}
     */
    get speed_down ()
    {
        if (this.#speed > this.s.speed.min) {
            --this.#speed;

            return true;
        }

        return false;
    }

    /**
     * @returns {number}
     */
    get status ()
    {
        return this.#status;
    }

    /**
     * @returns {boolean}
     */
    get is_play ()
    {
        return this.#status === this.STATUS.PLAY;
    }

    /**
     * @returns {boolean}
     */
    get is_stop ()
    {
        return this.#status === this.STATUS.STOP;
    }

    /**
     * @returns {boolean}
     */
    get is_pause ()
    {
        return this.#status === this.STATUS.PAUSE;
    }

    /**
     * @returns {NodeListOf<HTMLButtonElement>}
     */
    get sizes ()
    {
        return this.#size_controls;
    }

    get selected_size ()
    {
        return this.s.sizes[this.#selected_size];
    }

    constructor (game)
    {
        this.#game = game;
    }

    initialize ()
    {
        if (!this.#initialized) {
            this.#action        = this.#game.board.querySelector(this.s.selector.action);
            this.#size_controls = this.#game.board.querySelectorAll(this.s.selector.size);
            this.#size_controls.forEach(
                (control, i) =>
                {
                    let size = this.s.sizes[i];

                    if (!size) {
                        throw new Error("Unknown game board size: " + control.innerText);
                    }

                    control.innerText = size[0] + 'x' + size[1];

                    MUDoc.onclick(
                        control,
                        () => this.#selectSize(i)
                    );
                }
            )
            this.#selectSize(this.s.default_size);
            this.#initialized = true;
        }
    }

    setStatePlay ()
    {
        this.#status           = this.STATUS.PLAY;
        this.#action.innerText = this.s.action.state.play;
        this.#sizeDisabled(true);
    }

    setStatePause ()
    {
        this.#status           = this.STATUS.PAUSE;
        this.#action.innerText = this.s.action.state.pause;
    }

    setStateStop ()
    {
        this.#status           = this.STATUS.STOP;
        this.#action.innerText = this.s.action.state.stop;
    }

    setInitialState ()
    {
        this.#status           = this.STATUS.STOP;
        this.#action.innerText = this.s.action.state.stop;
        this.#action.disabled  = false;
        this.#sizeDisabled(false);
    }

    #sizeDisabled (statement)
    {
        this.#size_controls.forEach(
            control => control.disabled = statement
        );
    }

    #selectSize (index)
    {
        if (this.#selected_size !== index) {
            this.#selected_size = index;
            this.#size_controls.forEach(
                (control, i) =>
                {
                    if (i === index) {
                        control.classList.add(this.s.class.active);
                    } else {
                        control.classList.remove(this.s.class.active);
                    }
                }
            );
            this.#resizeEvaluate();
        }
    }

    onresize (callback)
    {
        this.#on_resize.push(callback);
    }

    #resizeEvaluate ()
    {
        this.#on_resize.forEach(
            callback =>
            {
                if (typeof callback === 'function') {
                    callback(...this.selected_size);
                }
            }
        );
    }
}