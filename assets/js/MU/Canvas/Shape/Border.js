class MUCanvasShapeBorder
{
    #width = 0;

    #color = '#ffffff';

    width (value = undefined) {
        if (typeof value === 'undefined') {
            return this.#width;
        }

        this.#width = Math.max(0, value);

        return this;
    }

    color (value = undefined) {
        if (typeof value === 'undefined') {
            return this.#color;
        }

        this.#color = value;

        return this;
    }
}