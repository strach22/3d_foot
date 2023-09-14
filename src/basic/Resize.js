import camera from "./Camera";

class Resize {
    constructor(){
        this.rederer = null;
    }
    start(rederer){
        this.rederer = rederer
        window.addEventListener('resize',this.resize.bind(this))
    }
    stop(rederer){
        window.removeEventListener('resize',this.resize.bind(this))
    }
    resize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        this.rederer.setSize(window.innerWidth,window.innerHeight)
    }
}
const resize = new Resize()
export default resize 