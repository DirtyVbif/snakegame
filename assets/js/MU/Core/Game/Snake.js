class MUCoreGameSnake
{
    get s ()
    {
        return {
            size: 3
        };
    }

    get DIR ()
    {
        return {
            NONE:  0,
            UP:    1,
            RIGHT: 2,
            DOWN:  -1,
            LEFT:  -2
        }
    }

    #direction;

    #size;

    /**
     * @type {MUCoreGameSnakeSegment[]}
     */
    #segments;

    setInitialState ()
    {
        this.#size      = this.s.size;
        this.#direction = this.DIR.UP;
        this.#segments  = [];
        this.#createSegments();
    }

    #createSegments ()
    {
        let start = new MUCanvasPoint(),
            x_reminder = MUCore.canvas.size.grid_width % 2,
            y_reminder = MUCore.canvas.size.grid_height % 2;

        start.pos(
            (MUCore.canvas.size.grid_width - x_reminder) / 2 + x_reminder,
            (MUCore.canvas.size.grid_height - y_reminder) / 2 + y_reminder - 1,
        );

        for (let i = 0; i < this.#size; ++i) {
            this.#createSegment(start);
            this.#move(start, this.#direction * -1);
        }
    }

    #createSegment (inherit)
    {
        let segment = new MUCoreGameSnakeSegment();

        segment.pos(inherit);
        this.#segments.push(segment);

        MUCore.canvas.shape('seg' + this.#segments.length, segment);
    }

    /**
     * @param {MUCanvasPoint} point
     * @param {number} direction
     */
    #move (point, direction)
    {
        switch (direction)
        {
            case this.DIR.UP:
                point.posY(point.y - 1);
                break;
            case this.DIR.DOWN:
                point.posY(point.y + 1);
                break;
            case this.DIR.LEFT:
                point.posX(point.x - 1);
                break;
            case this.DIR.RIGHT:
                point.posX(point.x + 1);
                break;
        }

        this.#moveLimits(point, direction);
    }

    /**
     * @param {MUCanvasPoint} point
     * @param {number} direction
     */
    #moveLimits (point, direction)
    {
        let min = 1,
            max,
            current,
            handler;

        if (this.#isVertical(direction)) {
            max = MUCore.canvas.size.grid_height;
            current = point.y;
            handler = point.posY.bind(point);
        } else if (this.#isHorizontal(direction)) {
            max = MUCore.canvas.size.grid_width;
            current = point.x;
            handler = point.posX.bind(point);
        } else {
            return;
        }

        if (current > max) {
            handler(min);
        } else if (current < min) {
            handler(max);
        }
    }

    #isVertical (direction = undefined)
    {
        if (typeof direction === 'undefined') {
            direction = this.#direction;
        }

        return direction & 1;
    }

    #isHorizontal (direction = undefined)
    {
        if (typeof direction === 'undefined') {
            direction = this.#direction;
        }

        return direction && !this.#isVertical(direction);
    }

    move (grow = false)
    {
        let last = this.#segments.length - 1;

        if (grow) {
            this.#createSegment(this.#segments[last]);
        }

        for (let i = last; i >= 0; --i) {
            if (i) {
                this.#segments[i].pos(this.#segments[i - 1])
            } else {
                this.#move(this.#segments[i], this.#direction);
            }
        }
    }
}