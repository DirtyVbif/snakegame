class MUCoreGameSnakeSegment extends MUCanvasDummy
{
    #middle = 0;

    get STATE ()
    {
        return {
            FIRST:  -1,
            MIDDLE: 0,
            LAST:   1
        }
    }

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
}