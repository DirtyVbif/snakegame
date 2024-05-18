class MUDoc
{
    /**
     * @type {function[]}
     */
    static #on_ready = [];

    static #is_ready = false;

    static #initialized = false;

    /**
     * @param {function} callback
     */
    static ready(callback)
    {
        this.#initialize();
        if (!this.#is_ready) {
            this.#on_ready.push(callback);
        } else {
            callback();
        }
    }

    static #initialize()
    {
        if (!this.#initialized) {
            this.#initialized = true;
            window.onload     = this.complete.bind(this);
        }
    }

    static complete()
    {
        if (!this.#is_ready) {
            this.#is_ready = true;
            this.#initialize();
            this.#on_ready.forEach(callback => callback());
            this.#on_ready = undefined;
        }
    }
}