class MUCanvasShapeCircle extends MUCanvasShape
{
    #radius = 0;

    get diameter ()
    {
        return this.#radius * 2;
    }

    radius (value = undefined) {
        if (typeof value === 'undefined') {
            return this.#radius;
        }

        this.#radius = Math.max(value, 0);

        return this;
    }

    render (context)
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius(), 0, 2 * Math.PI);

        if (this.border.width()) {
            context.lineWidth = this.border.width();
            context.strokeStyle = this.border.color();
            context.stroke();
        }
    }
}