import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from 'gsap'; 

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,  
            side: THREE.BackSide,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI/2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        this.geometry = new THREE.CircleGeometry(5,64);
        this.material = new THREE.MeshStandardMaterial({ color: 0x8395CD });

        this.circleFirst = new THREE.Mesh( this.geometry, this.material);

        this.circleFirst.position.y = -0.29

        this.circleFirst.scale.set(0,0,0);

        this.circleFirst.rotation.x = -Math.PI/2;
        this.circleFirst.receiveShadow  = true;

        this.scene.add(this.circleFirst);
        

    }

    resize(){


    }

    update(){
    }
}

// SHIVANG WAS HERE