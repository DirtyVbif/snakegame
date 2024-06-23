class MUCoreGameScore
{
    get s ()
    {
        return {
            selector: {
                input: '#board-score-value'
            }
        };
    }

    /**
     * @type {MUCoreGame}
     */
    #game;

    /**
     * @type {HTMLInputElement}
     */
    #input;

    #value = 0;

    get value ()
    {
        return this.#value;
    }

    constructor (game)
    {
        this.#game = game;
    }

    initialize ()
    {
        this.#input = this.#game.board.querySelector(this.s.selector.input);
    }

    reset ()
    {
        this.#value = 0;
        this.#update();
    }

    #update ()
    {
        this.#input.value = '' + this.#value;
    }
}