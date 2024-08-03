window.addEventListener("DOMContentLoaded", async () => {
    const transitMapCanvas = document.getElementById("transit-map");
    const ctx = transitMapCanvas.getContext("2d");

    const graph = new Graph();
    const graphDraw = new GraphDraw(graph, ctx);

    const currentLocation = window.location.href;
    const addEdge = (fromHref, toHref) => {
        graph.addEdge(fromHref, toHref);
    };
    await crawlLinks(addEdge, currentLocation, document);

    const indexNode = graph.getNode(currentLocation);
    const paths = graph.findAllPathsFromNodeDfs(indexNode);

    graphDraw.draw(paths);
});
