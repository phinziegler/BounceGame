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
}