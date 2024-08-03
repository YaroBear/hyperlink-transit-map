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
