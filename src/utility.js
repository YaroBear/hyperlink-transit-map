class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RandomWalk2d {
    // 0-7
    static getRandomInt(max = 7) {
        return Math.floor(Math.random() * max);
    }

    // degrees: 0, 45, 90, 135, 180, 225, 270, 315
    static mapToRadians(number) {
        const degreeIncrements = 45;
        return degreeIncrements * number * (Math.PI / 180);
    }

    static getNextRandomPosition(point) {
        const magnitude = 100;
        const directionInt = RandomWalk2d.getRandomInt();
        const directionRadians = RandomWalk2d.mapToRadians(directionInt);
        const walkOffsetX = magnitude * Math.cos(directionRadians);
        const walkOffsetY = magnitude * Math.sin(directionRadians);
        const newPointX = Math.floor(point.x + walkOffsetX);
        const newPointY = Math.floor(point.y + walkOffsetY);

        return new Point(newPointX, newPointY);
    }
}
