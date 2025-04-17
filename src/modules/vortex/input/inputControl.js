class inputControl {
    constructor() {
        this.pressedKeys = {};
        this.justPressed = {};
        this.justReleased = {};
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
        };
        this.enabled = true;
    }

    SetupInputs(canvas = document) {
        canvas.addEventListener('keydown', this.#HandleKeyDown);
        canvas.addEventListener('keyup', this.#HandleKeyUp);
        canvas.addEventListener('mousedown', this.#HandleMouseDown);
        canvas.addEventListener('mouseup', this.#HandleMouseUp);
        canvas.addEventListener('mousemove', this.#HandleMouseMove);
    }

    #HandleKeyDown = (e) => {
        const key = e.key.toLowerCase();
        if (!this.pressedKeys[key]) {
            this.justPressed[key] = true;
        }
        this.pressedKeys[key] = true;
    };

    #HandleKeyUp = (e) => {
        const key = e.key.toLowerCase();
        this.justReleased[key] = true;
        this.pressedKeys[key] = false;
    };

    #HandleMouseDown = () => {
        this.mouse.pressed = true;
    };

    #HandleMouseUp = () => {
        this.mouse.pressed = false;
    };

    #HandleMouseMove = (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    };

    Update() {
        this.justPressed = {};
        this.justReleased = {};
    }

    IsPressed(key) {
        return !!this.pressedKeys[key.toLowerCase()];
    }

    IsJustPressed(key) {
        return !!this.justPressed[key.toLowerCase()];
    }

    IsReleased(key) {
        return !!this.justReleased[key.toLowerCase()];
    }

    GetMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    IsMouseDown() {
        return this.mouse.pressed;
    }

    Reset() {
        this.pressedKeys = {};
        this.justPressed = {};
        this.justReleased = {};
    }
}

export const InputControl = new inputControl();
