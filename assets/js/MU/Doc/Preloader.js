class MUDocPreloader
{
    get s ()
    {
        return {
            class: {
                element: 'loading',
                block: 'loading__block',
                animation: 'loading__animation'
            }
        }
    }

    /**
     * @type {HTMLElement[]}
     */
    static #elements = [];

    /**
     * @type {MUDocPreloader[]}
     */
    static #handlers = [];

    /**
     * @type {HTMLElement}
     */
    #element;

    /**
     * @type {HTMLDivElement}
     */
    #block;

    /**
     * @type {HTMLDivElement}
     */
    #animation;

    #loading = false;

    static set (element)
    {
        let index = this.#elements.indexOf(element);
        if (index > -1) {
            return this.#handlers[index];
        }

        let handler = this.get(element);

        if (!handler) {
            handler = new this(element);

            this.#elements.push(element);
            this.#handlers.push(handler);
        }

        return handler.start();
    }

    /**
     * @param {HTMLElement} element
     * @returns {MUDocPreloader|null}
     */
    static get (element)
    {
        let index = this.#elements.indexOf(element);
        if (index > -1) {
            return this.#handlers[index];
        }

        return null;
    }

    static destroy (element)
    {
        let index = this.#elements.indexOf(element);
        if (index > -1) {
            this.#elements.splice(index, 1);
            this.#handlers.splice(index, 1);
        }
    }

    constructor (element)
    {
        this.#element = element;
    }

    start ()
    {
        if (!this.#loading) {
            this.#loading = true;
            this.#loadingClassState(true);
            this.#loadingHTMLState(true);
        }

        return this;
    }

    stop (destroy = false)
    {
        if (this.#loading) {
            this.#loading = false;
            this.#loadingClassState(false);
            this.#loadingHTMLState(false);
        }
        if (destroy) {
            this.destroy();
        }
    }

    destroy ()
    {
        this.stop();
        this.constructor.destroy(this.#element);
        this.#element   = undefined;
        this.#block     = undefined;
        this.#animation = undefined;
    }

    #loadingClassState (statement)
    {
        if (statement) {
            this.#element.classList.add(this.s.class.element);
        } else {
            this.#element.classList.remove(this.s.class.element);
        }
    }

    #loadingHTMLState (statement)
    {
        if (statement) {
            this.#createHTML();
            this.#element.append(this.#block);
        } else {
            this.#block.remove();
        }
    }

    #createHTML ()
    {
        this.#block     = document.createElement('div');
        this.#animation = document.createElement('div');

        this.#block.append(this.#animation);

        this.#block.classList.add(this.s.class.block);
        this.#animation.classList.add(this.s.class.animation);
    }
}