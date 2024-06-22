class MUCanvas
{
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;

    #initialized = false;

    /**
     * @type {MUCanvasSize}
     */
    #size;

    /**
     * @type {MUCanvasShape[]}
     */
    #shapes = [];

    /**
     * @returns {MUCanvasSize}
     */
    get size ()
    {
        if (!this.#size) {
            this.#size = new MUCanvasSize(this.#canvas);
        }

        return this.#size;
    }

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor (canvas)
    {
        this.#canvas = canvas;
    }

    initialize ()
    {
        if (!this.#initialized) {
            this.size.update();
            MUDoc.resize(this.size.update.bind(this.size));
            this.#initialized = true;
        }
    }
}