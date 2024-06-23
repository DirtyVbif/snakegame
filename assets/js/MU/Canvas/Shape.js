class MUCanvasShape extends MUCanvasDummy
{
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