class MUCoreGameSnake
{
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

    #goto = this.DIR.NONE;

    #direction = this.DIR.UP;

    #size = 3;
}