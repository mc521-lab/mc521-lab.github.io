export interface THint {
    type: "info" | "success" | "warning" | "error";
    content: any;
    time?: number;
}
