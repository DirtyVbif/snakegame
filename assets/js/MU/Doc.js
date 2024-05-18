class MUDoc
{
    /**
     * @type {function[]}
     */
    #onready = [];

    #is_ready = false;

    /**
     * @param {function} callback
     */
    static ready (callback)
    {
        if (!this.#is_ready) {
            this.#onready.push(callback);
        } else {
            callback();
        }
    }

    static complete ()
    {
        if (!this.#is_ready) {
            this.#is_ready = true;
            this.#onready.forEach(callback => callback());
            this.#onready = undefined;
            console.log('MUDoc.complete() called');
        }
    }
}