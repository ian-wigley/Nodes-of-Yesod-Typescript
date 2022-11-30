class ScreenSize {

    private m_left: number;
    private m_top: number;
    private m_width: number;
    private m_height: number;

    constructor(
        width: number,
        height: number
    ) {
        this.m_left = 0;
        this.m_top = 0
        this.m_height = height;
        this.m_width = width;
    }

    public get Left(): number {
        return this.m_left;
    }

    public get Right(): number {
        return this.m_width - 64;
    }

    public get Top(): number {
        return this.m_top;
    }

    public get Bottom(): number {
        return this.m_height - 180;//140
    }

}

export = ScreenSize;