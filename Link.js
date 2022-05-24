class Link{
    constructor(body1,body2){
        var lastrectangle=body1.body.bodies.length-2
        this.link=Constraint.create({
            bodyA:body1.body.bodies[lastrectangle],
            bodyB:body2,
           pointA:{x:0,y:0},
           pointB:{x:0,y:0},
           length:-10,
           stiffness:0.1,
           
        })

        World.add(world,this.link)
    }
    detach(){
        World.remove(world,this.link)
    }
}