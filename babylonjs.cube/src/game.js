import { Animation, ArcRotateCamera, CreateBox, Engine, HemisphericLight, Scene, Vector3 } from "@babylonjs/core";

export class game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();
        this.createRotationAnimation();

        this.engine.runRenderLoop(()=>{
            this.scene.render();
        });
        window.addEventListener("resize", ()=>{
            this.engine.resize();
        });
    }

    createScene() {
        const scene = new Scene(this.engine);
        const camera = new ArcRotateCamera("camera", -Math.PI/2, Math.PI/2.5, 3, new Vector3(0,0,0),  scene);
        camera.attachControl(this.canvas, true);

        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        this.box = CreateBox("box", {size: 1}, scene);
        
        return scene;
    }

    createRotationAnimation(box) {
        const rotationAnimation = new Animation(
            "rotationAnimation",
            "rotation.y",
            30,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: 0
        });
        keyFrames.push({
            frame: 100,
            value: Math.PI * 2
        });
        rotationAnimation.setKeys(keyFrames);
        this.box.animations = [];
        this.box.animations.push(rotationAnimation);

        this.scene.beginAnimation(this.box, 0, 100, true);
    }
}