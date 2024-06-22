class MUCanvasShape
{
    #x = 0;

    #y = 0;

    #color = '#ffffff';

    #border;

    get x ()
    {
        return this.#x;
    }

    get y ()
    {
        return this.#y;
    }

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
     * @param {MUCanvas} canvas HTML canvas API instance
     */
    render (canvas)
    {
        // This is abstract method that must be implemented
        throw new Error("Method MUCanvasShape.render() must be implemented.");
    }
}