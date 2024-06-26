class MUCanvasSize
{
    /**
     * @type {HTMLCanvasElement}
     */
    #canvas;

    #grid = {
        min:    10,
        width:  24,
        height: 24,
        locked: false
    };

    #available_height = 0;

    #available_width = 0;

    #cell_size;

    get width ()
    {
        return this.#canvas.width;
    }

    get height ()
    {
        return this.#canvas.height;
    }

    get grid_width ()
    {
        return this.#grid.width;
    }

    get grid_height ()
    {
        return this.#grid.height;
    }

    get parent_styles ()
    {
        return getComputedStyle(this.#canvas.parentElement);
    }

    get is_square ()
    {
        return this.#grid.width === this.#grid.height;
    }

    get cell_size ()
    {
        if (typeof this.#cell_size === 'undefined') {
            this.#cell_size = this.#canvas.width / this.#grid.width;
        }

        return this.#cell_size;
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
        this.#calculateFreeSpace();
        this.#updateSize();
        this.#cell_size = undefined;

        return this;
    }

    /**
     * @returns {void}
     */
    #calculateFreeSpace ()
    {
        let styles = this.parent_styles;

        this.#available_width = parseFloat(styles.width)
            - parseFloat(styles.borderLeftWidth)
            - parseFloat(styles.borderRightWidth)
            - parseFloat(styles.paddingLeft)
            - parseFloat(styles.paddingRight);

        this.#available_height = window.innerHeight - 80;
    }

    #updateSize ()
    {
        if (this.is_square) {
            this.#canvas.width = this.#canvas.height = Math.min(this.#available_width, this.#available_height);

            return;
        }
        let target_height = this.#available_width / this.#grid.width * this.#grid.height;
        if (target_height > this.#available_height) {
            this.#canvas.height = this.#available_height;
            this.#canvas.width = this.#available_height / this.#grid.height * this.#grid.width;
        } else {
            this.#canvas.width = this.#available_width;
            this.#canvas.height = target_height;
        }
    }

    grid (width, height = undefined)
    {
        if (!this.#grid.locked) {
            this.#grid.width  = Math.max(width, this.#grid.min);
            this.#grid.height = Math.max(height || width, this.#grid.min);
            this.update();
        }

        return this;
    }
}
