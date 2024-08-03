# hyperlink-transit-map

0 dependencies, vanilla Javascript site crawler and visualizer.

Work in progress:

![example.png](./example.png)

## Todo

-   [x] No two nodes can share the same position
    -   [x] Naive approach; keeps drawing a random adjacent point and checks if it's taken. Won't work if all 8 adjacent positions are already taken and will result in infinite recursion.
-   [ ] Avoid loops; e.g. following links back to nodes that have already been explored
-   [ ] Don't follow external links (start origin)
