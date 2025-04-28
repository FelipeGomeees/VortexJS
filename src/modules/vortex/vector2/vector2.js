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

    Multiply(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    Scale(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    Normalize() {
        const length = this.Magnitude();
        if (length === 0) return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }

    Magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    Equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    BiggerThan(v) {
        return this.x > v.x && this.y > v.y;
    }

    Clamp(min, max) {
        return new Vector2(
            Math.min(Math.max(this.x, min.x), max.x),
            Math.min(Math.max(this.y, min.y), max.y)
        );
    }

    Clone() {
        return new Vector2(this.x, this.y);
    }

    static Zero() {
        return new Vector2(0, 0);
    }

    static From(obj) {
        return new Vector2(obj.x, obj.y);
    }

    static RandomWithin(max) {
        return new Vector2(Math.random() * max.x, Math.random() * max.y);
    }
    

    static RandomBetween(min, max) {
        return new Vector2(
            Math.random() * (max.x - min.x) + min.x,
            Math.random() * (max.y - min.y) + min.y
        );
    }

    static Rotate(vector, angle) {
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        return new Vector2(
            vector.x * cosAngle - vector.y * sinAngle, 
            vector.x * sinAngle + vector.y * cosAngle
        );
    }
}
