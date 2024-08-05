class Point {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}

class RandomWalk2d {
    static magnitude = 100;

    static getNextRandomPosition(point) {
        const directionRadians = (Math.floor(Math.random() * 8) / 4) * Math.PI;
        const walkOffsetX = RandomWalk2d.magnitude * Math.cos(directionRadians);
        const walkOffsetY = RandomWalk2d.magnitude * Math.sin(directionRadians);
        const newPointX = point.x + walkOffsetX;
        const newPointY = point.y + walkOffsetY;

        return new Point(newPointX, newPointY);
    }

    static getNextRandomPositionBiased(point) {
        const angle =
            point.angle + ((Math.floor(Math.random() * 3) - 1) / 4) * Math.PI;
        const walkOffsetX = RandomWalk2d.magnitude * Math.cos(angle);
        const walkOffsetY = RandomWalk2d.magnitude * Math.sin(angle);
        const newPointX = point.x + walkOffsetX;
        const newPointY = point.y + walkOffsetY;
        return new Point(newPointX, newPointY, angle);
    }
}

function seekNextPos(x, y, angle, boundMargin) {
    if (
        x < boundMargin ||
        x > canvas.width - boundMargin ||
        y < boundMargin ||
        y > canvas.height - boundMargin
    )
        angle += Math.PI / 4; // turns around if approaching canvas limits
    else angle += ((Math.floor(Math.random() * 3) - 1) / 4) * Math.PI;
    (x += Math.cos(angle) * stopSize * 4.6875),
        (y += Math.sin(angle) * stopSize * 4.6875);
    return [x, y, angle];
}
