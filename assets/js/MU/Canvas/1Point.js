class MUCanvasPoint
{
    #x = 0;

    #y = 0;

    get x ()
    {
        return this.#x;
    }

    get y ()
    {
        return this.#y;
    }

    /**
     * @param {MUCanvasPoint|number} x_position
     * @param {MUCanvasPoint|number} y_position
     * @returns {MUCanvasPoint}
     */
    pos (x_position, y_position = undefined)
    {
        this.posX(x_position)
            .posY(typeof y_position === 'undefined' ? x_position : y_position);

        return this;
    }

    posX (x_position)
    {
        if (x_position instanceof MUCanvasPoint) {
            this.#x = x_position.x;
        } else {
            this.#x = x_position;
        }

        return this;
    }

    posY (y_position)
    {
        if (y_position instanceof MUCanvasPoint) {
            this.#y = y_position.y;
        } else {
            this.#y = y_position;
        }

        return this;
    }
}