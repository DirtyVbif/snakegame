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
     * @type {{MUCanvasShape}}
     */
    #shapes = {};

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
     * @returns {CanvasRenderingContext2D}
     */
    get context ()
    {
        return this.#canvas.getContext('2d');
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

    clear ()
    {
        this.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    draw ()
    {
        Object.keys(this.#shapes).forEach(
            key => this.#shapes[key].render(this.context)
        );
    }

    redraw ()
    {
        this.clear();
        this.draw();
    }

    /**
     *
     * @param key
     * @param shape
     * @returns {MUCanvas|MUCanvasShape|undefined}
     */
    shape (key, shape = undefined)
    {
        if (shape) {
            this.#shapes[key] = shape;

            return this;
        }

        return this.#shapes[key];
    }
}