class GraphDraw {
    constructor(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 800, 800);

        this.drawnNodes = new Map();
        this.ctx = ctx;
        this.neonColors = [
            "#af3dff",
            "#55ffe1",
            "#ff3b94",
            "#a6fd29",
            "#ff5733",
        ];
    }

    createParentDrawnNode(paths) {
        const parentNode = paths[0][0];
        const newDrawnNode = new NodeDraw(parentNode, 400, 400);
        this.drawnNodes.set(parentNode.value, newDrawnNode);
    }

    walkToNewPoint(previousNode) {
        const newPosition = RandomWalk2d.getNextRandomPosition({
            x: previousNode.x,
            y: previousNode.y,
        });

        let positionTaken = false;

        this.drawnNodes.forEach((node, key, map) => {
            if (node.x == newPosition.x && node.y == newPosition.y) {
                positionTaken = true;
            }
        });

        if (positionTaken) {
            return this.walkToNewPoint(previousNode);
        }

        return newPosition;
    }

    createDrawnNodesFromPaths(paths) {
        for (const path of paths) {
            for (let i = 0; i < path.length; i++) {
                if (!this.drawnNodes.has(path[i].value) && i > 0) {
                    const previousNode = this.drawnNodes.get(path[i - 1].value);
                    const newPosition = this.walkToNewPoint(previousNode);
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

    draw(paths) {
        this.createParentDrawnNode(paths);
        this.createDrawnNodesFromPaths(paths);
        // draw edges first
        for (const path of paths) {
            const pathColor = this.neonColors[paths.indexOf(path)];
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
