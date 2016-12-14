class ScreenSize {

    private m_left: number;
    private m_top: number;
    private m_width: number;
    private m_height: number;

    constructor(width, height) {
        this.m_left = 0;
        this.m_top = 0
        this.m_height = height;
        this.m_width = width;
    }

    public get left(): number {
        return this.m_left;
    }
}

export = ScreenSize;