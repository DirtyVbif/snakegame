class MUCanvasDummy extends MUCanvasPoint
{
    /**
     * Clockwise rotation (degrees).
     *
     * @type {number}
     */
    #angle = 0;

    /**
     * Get or set clockwise rotation angle.
     *
     * @param {number} degrees (optional) Set new rotation angle.
     */
    angle (degrees = undefined)
    {
        if (typeof degrees === 'undefined') {
            return this.#angle;
        }

        this.#angle = Math.max(0, Math.min(360, degrees));

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