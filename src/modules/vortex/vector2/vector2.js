export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    Add(v = new Vector2(0, 0)) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    Subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    Normalize() {
        const length = this.Magnitude();
        if (length === 0) return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }

    Dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    Scale(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    Magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Equals(v) {
        return this.x === v.x && this.y === v.y;
    }
}
