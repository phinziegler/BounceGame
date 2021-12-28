export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // GET-SET X
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }

    // GET-SET Y
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }

    magnitude() {
        let mag = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
        return mag;
    }

    unitVector() {
        let length = this.magnitude();

        let unitVector = new Vector(this.x / length, this.y / length);
        return unitVector;
    }
}