import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from 'gsap'; 
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.rescources = this.experience.rescources;
        this.time = this.experience.time;
        this.room = this.rescources.items.CheemRoom;        
        this.actualRoom = this.room.scene;
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        

        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) =>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
            if( child.name === "Aquarium"){
                child.children[2].material = new THREE.MeshPhysicalMaterial();
                child.children[2].material.roughness = 0;
                child.children[2].material.color.set(0x549dd2);
                child.children[2].material.ior = 3;
                child.children[2].material.transmission = 1;
                child.children[2].material.opacity = 1;
            }

            if( child.name === "Computer"){
                
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.rescources.items.screen,
                })
            }
           

            if( child.name === "Table_stuff"){
                
                child.children[1].material.color.set(0xffffff);
            }

            if( child.name === "Mini_floor" )
            {
                child.position.x = 5.23346 ;
                child.position.z = -1.86861 ;
            }

            child.scale.set(0,0,0);

            if( child.name==="Cube")
            {
                // child.scale.set(2,2,2);
                child.position.set(0,0,-10);
                child.rotation.y = Math.PI/4
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        })
       

             //Fish Tank Light
            const width = .5;
            const height = .7;
            const intensity = 1;
            const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
            rectLight.position.set(5.98828, 7, 0.5);
            rectLight.rotation.x = -Math.PI / 2;
            rectLight.rotation.z = -Math.PI / 4;
            this.actualRoom.add(rectLight);

            this.roomChildren['rectLight'] = rectLight;

            this.scene.add(this.actualRoom)
            this.actualRoom.scale.set(0.11,0.11,0.11);
        
    }




    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()
    }

    onMouseMove(){
      window.addEventListener('mousemove', (e)=>{
        this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
        this.lerp.target = this.rotation*0.05;
      })

    }
    resize(){


    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y =  this.lerp.current;
        this.mixer.update(this.time.delta * 0.0009)

    }
}

// SHIVANG WAS HERE