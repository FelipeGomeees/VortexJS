export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Add(v = new Vector2(0, 0)) {
        this.x + v.x;
        this.y + v.y;
    }

    Subtract(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    static Normalize(v) {
        const length = Math.sqrt(v.x * v.x + v.y * v.y);
        return new Vector2(v.x / length, v.y / length);
    }

    static Dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static Scale(v, scalar) {
        return new Vector2(v.x * scalar, v.y * scalar);
    }

    static Magnitude(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}