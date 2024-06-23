class MUCoreGameScore
{
    get s ()
    {
        return {
            selector: {
                field: '#board-score',
                label: '.board__score-label',
                input: '.board__score-value'
            }
        };
    }

    /**
     * @type {MUCoreGame}
     */
    #game;

    #label;

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
        this.#label = this.#game.board.querySelector(this.s.selector.label);
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