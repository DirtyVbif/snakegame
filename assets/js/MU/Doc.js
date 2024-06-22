class MUDoc
{
    static #initialized = false;

    /**
     * @type {function[]}
     */
    static #on_ready = [];

    static #is_ready = false;

    static #on_resize = [];

    static #resize_timestamp = 0;

    static get is_ready ()
    {
        return this.#is_ready || document.readyState === 'complete';
    }

    /**
     * @param {function} callback
     */
    static ready (callback)
    {
        this.#initialize();
        if (!this.#is_ready) {
            this.#on_ready.push(callback);
        } else {
            callback();
        }
    }

    static #initialize ()
    {
        if (!this.#initialized) {
            this.#initialized = true;
            if (!this.is_ready) {
                this.event(window, 'load', this.#complete.bind(this), true);
            } else {
                this.#complete();
            }
            this.event(window, 'resize', this.#evaluateResize.bind(this), true);
        }
    }

    static #complete ()
    {
        if (!this.#is_ready) {
            this.#is_ready = true;
            this.#callEach(this.#on_ready);
            this.#on_ready = undefined;
        }
    }

    static #callEach (callbacks, ...parameters)
    {
        callbacks.forEach(callback => callback(...parameters));
    }

    /**
     * @param {function} callback
     */
    static resize (callback)
    {
        this.#initialize();
        this.#on_resize.push(callback);
    }

    static #evaluateResize (event)
    {
        if (this.#on_resize.length > 0) {
            this.#callEach(this.#on_resize, event);
            this.#resize_timestamp = event.timeStamp;
        }
    }

    /**
     * @param {NodeListOf<EventTarget>|EventTarget[]|EventTarget|string} target
     * @param {string[]|string} type
     * @param {function} callback
     * @param {boolean} passive
     */
    static event (
        target,
        type,
        callback,
        passive = false
    )
    {
        if (typeof target === 'string') {
            target = document.querySelectorAll(target);
        }
        if (target instanceof NodeList || target instanceof Array) {
            target.forEach(
                event_target => this.event(event_target, type, callback, passive)
            );
        } else if (type instanceof Array) {
            type.forEach(
                t => this.event(target, t, callback, passive)
            );
        } else if (target) {
            target.addEventListener(type, callback, passive ? {passive: true} : null)
        }
    }

    /**
     * An alias for event() method with `click` event type.
     *
     * @param {NodeListOf<EventTarget>|EventTarget[]|EventTarget|string} target
     * @param {function} callback
     * @param {boolean} passive
     */
    static onclick (
        target,
        callback,
        passive = false
    )
    {
        this.event(target, 'click', callback, passive);
    }
}