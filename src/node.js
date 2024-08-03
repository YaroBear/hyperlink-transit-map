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
