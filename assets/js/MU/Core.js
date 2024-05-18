class MUCore
{
    /**
     * Default configuration parameters
     */
    static get c ()
    {
        return {
            id: {
                canvas: 'board-canvas'
            }
        };
    }

    /**
     * Game handler instance
     *
     * @type {MUCoreGame}
     */
    static #game;

    /**
     * @returns {MUCoreGame}
     */
    static get game ()
    {
        if (!this.#game) {
            this.#game = new MUCoreGame();
        }

        return this.#game;
    }

    /**
     * Canvas interface handler instance
     *
     * @type {MUCanvas}
     */
    static #canvas;

    /**
     * @returns {MUCanvas}
     */
    static get canvas ()
    {
        if (!this.#canvas) {
            this.#canvas = new MUCanvas(document.getElementById(this.c.id.canvas));
        }

        return this.#canvas;
    }

    static initialize ()
    {
        // TODO: initialize main canvas and controls handlers
    }
}