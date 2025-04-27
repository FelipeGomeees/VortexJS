import { Entity, SceneControl, SpriteControl } from "../../vortex.js";

export class Scene {
    entities = [];
    constructor(name = "Scene", bgColor = "#000000", debug = false) {
        this.name = name;
        this.bgColor = bgColor;
        this.debug = debug;

        SceneControl.addScene(name, this);
    }

    /*
        entity = {
            tag,
            obj: Entity,
            canMove,
            attachedSprite: {
                key,
                offset,
            }
        }
    */

    AddEntity(entity) {
        const newEntity = {
            ...entity,
            obj: new Entity(entity.obj),
        };
        this.entities.push(newEntity);
        return newEntity;
    }

    setSetup(callback) {
        this.setup = callback;
    }

    setLoop(callback) {
        this.loop = callback;
    }

    GetEntity(tag) {
        return this.entities.find(entity => entity.tag === tag)
    }

    UpdateEntity(tag, ...entity) {
        const target = this.entities.find(entity => entity.tag === tag);
        if (target) {
            target.obj = { ...target.obj, ...entity[0] };
        }
    }

    Attach(key, entity, offset = new Vector2(0, 0)) {
        if (!this.SpriteControl.sprites.has(key)) {
            throw new Error(`Sprite "${key}" not loaded.`);
        }

        this.entities[entity].attachedSprite = SpriteControl.sprites.get(key);
    }

    Detach(entity) {
        this.attachedSprites.delete(entity);
    }

    GetAttached(entity) {
        return this.attachedSprites.get(entity);
    }

    GetAllAttachments() {
        return this.attachedSprites.entries();
    }

    // ChangeEntity(tag) {
    //     this.entities.find(entity => entity.tag === tag)
    // }
}