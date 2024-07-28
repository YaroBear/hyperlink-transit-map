class Node {
    constructor(value) {
        this.value = value;
        this.adjacentNodes = [];
    }

    addAdjacentNode(node) {
        this.adjacentNodes.push(node);
    }

    getAdjacentNodes() {
        return this.adjacentNodes;
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
        this.paths = [];
    }

    addEdge(sourceValue, destinationValue) {
        const sourceNode = this.addNode(sourceValue);
        const destinationNode = this.addNode(destinationValue);

        sourceNode.addAdjacentNode(destinationNode);
    }

    addNode(value) {
        if (this.nodes.has(value)) {
            return this.nodes.get(value);
        } else {
            const node = new Node(value);
            this.nodes.set(value, node);
            return node;
        }
    }

    isLeaf(node) {
        return node.adjacentNodes.length == 0;
    }

    findAllPathsDfs(currentNode, path) {
        if (path) {
            path.push(currentNode);
        } else {
            path = [];
        }

        if (this.isLeaf(currentNode)) {
            this.paths.push([...path]);
        }
        for (let node of currentNode.getAdjacentNodes()) {
            this.findAllPathsDfs(node, [...path]);
        }
    }
}

const neonColors = ["#af3dff", "#55ffe1", "#ff3b94", "#a6fd29", "#ff5733"];

class GraphDraw {
    constructor(graph, ctx) {
        this.graph = graph;
        this.drawnNodes = new Map();
        this.ctx = ctx;
        this.neonColors = [
            "#af3dff",
            "#55ffe1",
            "#ff3b94",
            "#a6fd29",
            "#ff5733",
        ];

        this.createParentDrawnNode();
        this.createDrawnNodesFromPaths();
    }

    createParentDrawnNode() {
        const parentNode = this.graph.paths[0][0];
        const newDrawnNode = new NodeDraw(parentNode, 400, 400);
        this.drawnNodes.set(parentNode.value, newDrawnNode);
    }

    createDrawnNodesFromPaths() {
        for (const path of this.graph.paths) {
            for (let i = 0; i < path.length; i++) {
                if (!this.drawnNodes.has(path[i].value) && i > 0) {
                    const previousNode = this.drawnNodes.get(path[i - 1].value);
                    const newPosition = RandomWalk2d.getNextRandomPosition({
                        x: previousNode.x,
                        y: previousNode.y,
                    });
                    const newDrawnNode = new NodeDraw(
                        path[i],
                        newPosition.x,
                        newPosition.y
                    );
                    this.drawnNodes.set(path[i].value, newDrawnNode);
                }
            }
        }
    }

    drawEdge = (ctx, fromNode, toNode, color) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
    };

    draw() {
        // draw edges first
        for (const path of this.graph.paths) {
            const pathColor = this.neonColors[this.graph.paths.indexOf(path)];
            let previousDrawnNode = null;
            for (let i = 0; i < path.length; i++) {
                const currentDrawnNode = this.drawnNodes.get(path[i].value);
                if (previousDrawnNode) {
                    this.drawEdge(
                        this.ctx,
                        previousDrawnNode,
                        currentDrawnNode,
                        pathColor
                    );
                }
                previousDrawnNode = currentDrawnNode;
            }
        }

        // draw nodes and text
        for (const [key, node] of this.drawnNodes) {
            node.draw(this.ctx);
        }
    }
}

class NodeDraw {
    constructor(node, x, y) {
        this.node = node;
        this.x = x;
        this.y = y;
    }

    drawStrokedText = (ctx, text, x, y) => {
        ctx.font = "14px Sans-serif";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = "white";
        ctx.fillText(text, x, y);
    };

    stripOrigin = (href) => {
        const origin = window.location.origin;
        return href.replace(origin, "");
    };

    draw = (ctx) => {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();

        const text = this.stripOrigin(this.node.value);

        const yOffset = 25;
        const xOffset = -2 * text.length;

        this.drawStrokedText(ctx, text, this.x + xOffset, this.y + yOffset);
    };
}

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

        return new Point(point.x + walkOffsetX, point.y + walkOffsetY);
    }
}

const graph = new Graph();

const crawlLinks = async (currentNodeValue, doc) => {
    const anchors = doc.getElementsByTagName("a");
    for (const anchor of anchors) {
        graph.addEdge(currentNodeValue, anchor.href);

        const response = await fetch(anchor.href);
        const html = await response.text();

        const parser = new DOMParser();
        const loadedDoc = parser.parseFromString(html, "text/html");

        await crawlLinks(anchor.href, loadedDoc);
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    const transitMapCanvas = document.getElementById("transit-map");
    const ctx = transitMapCanvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 800);

    const currentLocation = window.location.href;
    await crawlLinks(currentLocation, document);

    const startNode = graph.nodes.get(currentLocation);
    graph.findAllPathsDfs(startNode, []);
    console.log(graph.paths);

    const graphDraw = new GraphDraw(graph, ctx);
    graphDraw.draw();
});
