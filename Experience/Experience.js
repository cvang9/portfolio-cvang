import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";

import Renderer from "./Renderer.js";

import Preloader from "./Preloader.js";

import Time from "./Utils/Time.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

import Rescources from "./Utils/Rescources.js";

import assets from "./Utils/assets.js";

export default class Experience{
    
    static instance

    constructor(canvas){
        if( Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.rescources = new Rescources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", ()=>{
            this.controls = new Controls();
        });

        this.sizes.on("resize", ()=>{
            this.resize();
        })

        this.time.on("update", ()=>{
            this.update();
        })

        
    }

    resize(){
        this.camera.resize();
        this.world.update();
        this.renderer.resize();
    }

    update(){
        this.preloader.update()
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}

// SHIVANG WAS HERE