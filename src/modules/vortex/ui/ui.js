import { Entity } from "../entity/entity.js";

export class UIEntity extends Entity {
    constructor(obj) {
        super(obj);
        this.text = obj.text || {
            content: '',
            color: '#fff',
            font: 'pixel',
            size: 32
        };
        this.children = obj.children || [];
    }

    SetText(text) {
        this.text.content = text;
    }
}
