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
        if(length == 0) {
            console.error("length 0 unit vector");
            return new Vector(0,0);
        }
        let unitVector = new Vector(this.x / length, this.y / length);
        return unitVector;
    }

    // might be nice to have a static version of each of these.
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(fac) {
        return new Vector(this.x * fac, this.y * fac);
    }
    dotProduct(vector) {
        return (vector.x * this.x) + (vector.y + this.y);
    }
    angleWith(vector) { // in radians
        let t = Math.acos(this.dotProduct(vector) / (this.magnitude() * vector.magnitude()));
        return t;
    }
}