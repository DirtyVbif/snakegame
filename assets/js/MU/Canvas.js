class MUCanvas
{
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor (canvas)
    {
        this.#canvas = canvas;
    }

    initialize ()
    {
        this.#canvas.width = 540;
        this.#canvas.height = 540;
    }
}