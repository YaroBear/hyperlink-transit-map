class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RandomWalk2d {
    static getNextRandomPosition(point) {
        const magnitude = 100;
        const directionRadians = (Math.floor(Math.random() * 8) / 4) * Math.PI;
        const walkOffsetX = magnitude * Math.cos(directionRadians);
        const walkOffsetY = magnitude * Math.sin(directionRadians);
        const newPointX = point.x + walkOffsetX;
        const newPointY = point.y + walkOffsetY;

        return new Point(newPointX, newPointY);
    }
}
