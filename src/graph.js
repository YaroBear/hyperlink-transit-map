class Graph {
    constructor() {
        this.nodes = new Map();
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

    getNode(value) {
        return this.nodes.get(value);
    }

    isLeaf(node) {
        return node.adjacentNodes.length == 0;
    }

    findAllPathsFromNodeDfs(currentNode, path = [], paths = []) {
        path.push(currentNode);

        if (this.isLeaf(currentNode)) {
            paths.push([...path]);
        }
        for (let node of currentNode.getAdjacentNodes()) {
            this.findAllPathsFromNodeDfs(node, [...path], paths);
        }

        return paths;
    }
}
