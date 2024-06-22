class MUCanvasShape
{
    #x = 0;

    #y = 0;

    #color = '#ffffff';

    /**
     * @type {MUCanvasShapeBorder}
     */
    #border;

    static get circle ()
    {
        return new MUCanvasShapeCircle();
    }

    static get rectangle ()
    {
        return new MUCanvasShapeRectangle();
    }

    get x ()
    {
        return this.#x;
    }

    get y ()
    {
        return this.#y;
    }

    /**
     * @returns {MUCanvasShapeBorder}
     */
    get border ()
    {
        if (!this.#border) {
            this.#border = new MUCanvasShapeBorder();
        }

        return this.#border;
    }

    pos (x_position, y_position)
    {
        this.posX(x_position)
            .posY(y_position);

        return this;
    }

    posX (x_position)
    {
        this.#x = x_position;

        return this;
    }

    posY (y_position)
    {
        this.#y = y_position;

        return this;
    }

    fill (color = undefined)
    {
        if (typeof color === 'undefined') {
            return this.#color;
        }

        this.#color = color;

        return this;
    }

    /**
     * @param {CanvasRenderingContext2D} context HTML canvas 2D context API
     *
     * @returns {void|never}
     */
    render (context)
    {
        // This is abstract method that must be implemented
        throw new Error("Method MUCanvasShape.render() must be implemented.");
    }
}