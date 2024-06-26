class MUCoreGameSnakeSegment extends MUCanvasDummy
{
    get STATE ()
    {
        return {
            FIRST:  -1,
            MIDDLE: 0,
            LAST:   1
        }
    }

    #size;

    #middle = this.STATE.MIDDLE;

    get is_first ()
    {
        return this.#middle === this.STATE.FIRST;
    }

    get is_middle ()
    {
        return this.#middle === this.STATE.MIDDLE;
    }

    get is_last ()
    {
        return this.#middle === this.STATE.LAST;
    }

    setFirst ()
    {
        this.#middle = this.STATE.FIRST;
    }

    setMiddle ()
    {
        this.#middle = this.STATE.MIDDLE;
    }

    setLast ()
    {
        this.#middle = this.STATE.LAST;
    }

    size (size = undefined)
    {
        if (typeof size === 'undefined') {
            return this.#size;
        }

        this.#size = Math.max(0, size);

        return this;
    }

    render (context)
    {
        let size = MUCore.canvas.size.cell_size;

        let x = size * (this.x - 1) + 1,
            y = size * (this.y - 1) + 1;

        context.fillStyle = '#9b4335';
        context.fillRect(x, y, size - 2, size - 2);
    }
}