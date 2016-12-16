class Star {

    private starLayer1X: number = Math.floor(Math.random() * 800);
    private starLayer1Y: number = Math.floor(Math.random() * 250);
    private starLayer2X: number = Math.floor(Math.random() * 800);
    private starLayer2Y: number = Math.floor(Math.random() * 250);

    constructor() {
    }

    public Update(): void {
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#565555";
        ctx.beginPath();
        ctx.arc(this.starLayer1X, this.starLayer1Y, 1, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.fillStyle = "#a9a8a8";
        ctx.beginPath();
        ctx.arc(this.starLayer2X, this.starLayer2Y, 1, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

export = Star; 