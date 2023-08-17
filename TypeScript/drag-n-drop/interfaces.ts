


    export interface draggable {
        onDragStart(event: DragEvent): void;
        onDragStop(event: DragEvent): void;
    }

    export interface draggTarget {
        onDragover(event: DragEvent): void;
        onDragDrop(event: DragEvent): void;
        onDragLeave(event: DragEvent): void;
    }

