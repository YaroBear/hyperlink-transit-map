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
