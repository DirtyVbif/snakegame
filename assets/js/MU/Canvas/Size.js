class MUCanvasSize
{
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;

    #step = 100;

    #grid = {
        min: 10,
        width: 24,
        height: 24,
        locked: false
    };

    #parent_resized_width = 0;

    get #parent_width_changed ()
    {
        let width   = parseFloat(this.parent_styles.width),
            changed = width !== this.#parent_resized_width;

        this.#parent_resized_width = width;

        return changed;
    }

    get parent_styles ()
    {
        return getComputedStyle(this.#canvas.parentElement);
    }

    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor (canvas)
    {
        this.#canvas = canvas;
    }

    update ()
    {
        if (this.#parent_width_changed) {
            let free_space = this.#calculateFreeSpace(),
                steps      = Math.floor(free_space / this.#step),
                size       = this.#step * steps;

            this.#setWidth(size);
        }
    }

    /**
     * @returns {number}
     */
    #calculateFreeSpace ()
    {
        let styles = this.parent_styles;

        return parseFloat(styles.width)
            - parseFloat(styles.borderLeftWidth)
            - parseFloat(styles.borderRightWidth)
            - parseFloat(styles.paddingLeft)
            - parseFloat(styles.paddingRight);
    }

    #setWidth (width)
    {
        this.#canvas.width = width;
        this.#updateHeight();
    }

    grid (width, height = undefined)
    {
        if (!this.#grid.locked) {
            this.#grid.width  = Math.max(width, this.#grid.min);
            this.#grid.height = Math.max(height || width, this.#grid.min);
            this.#updateHeight();
        }

        return this;
    }

    #updateHeight ()
    {
        this.#canvas.height = (this.#grid.width === this.#grid.height)
            ? this.#canvas.width
            : this.#canvas.width / this.#grid.width * this.#grid.height
    }
}
