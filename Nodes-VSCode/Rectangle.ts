class Rectangle {

    private m_left: number;
    private m_top: number;
    private m_right: number;
    private m_bottom: number;
    private m_width: number;
    private m_height: number;
    private x: number;
    private y: number;
    private m_name?: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        name?: string
    ) {
        this.x = x;
        this.y = y;
        this.m_width = width;
        this.m_height = height;
        this.m_top = y;
        this.m_bottom = y + height;
        this.m_left = x;
        this.m_right = x + width;
        this.m_name = name;
    }

    public get left(): number {
        return this.m_left;
    }

    public get top(): number {
        return this.m_top;
    }

    public get right(): number {
        return this.m_right;
    }

    public get bottom(): number {
        return this.m_bottom;
    }

    // Fudge
    public set bottom(value: number) {
        this.m_bottom += value;
    }

    public get Width() {
        return this.m_width;
    }

    public get Height() {
        return this.m_height;
    }

    // Fudge
    public set Height(value: number) {
        this.m_height += value;
    }

    public get Name() {
        return this.m_name;
    }

    public Intersects(rectangle: Rectangle): boolean {
        // To-do remove the debug code below
        // let a = rectangle.left < this.x + this.m_width;
        // let b = this.x < (rectangle.left + rectangle.right);
        // let c = rectangle.top < this.y + this.m_height;
        // let d = this.y < (rectangle.top + rectangle.bottom);

        // if (rectangle.Name == "Mole" && a && b && c && d) {
        //     let ab = 0;
        // }

        if (rectangle.left < this.x + this.Width &&
            this.x < (rectangle.left + rectangle.right) &&
            rectangle.top < this.y + this.Height) {
            return this.y < (rectangle.top + rectangle.bottom);
        }
        else {
            return false;
        }
    }

}

export = Rectangle;