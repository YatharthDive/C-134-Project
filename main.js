img = "";
status1 = ""
objects = []
alarm=""
function preload() {
    alarm=loadSound("Alarm.mp3")
}

function setup() {
    C1 = createCanvas(640, 420)
    C1.center()
    V1=createCapture(VIDEO)
    V1.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML="status : Detecting Object"
}

function modelLoaded() {
    console.log("model Loaded")
    status1 = true
    objectDetector.detect(V1, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects=results
    }

}

function draw() {
    image(V1, 0, 0, 640, 420)
    if(status1!=""){
        R=random(255)
        G=random(255)
        B=random(255)
        objectDetector.detect(V1,gotResults)
        for(var I=0;I<objects.length;I++){
            document.getElementById("status").innerHTML="status : Detected Object"
            document.getElementById("no_of_objects").innerHTML="No. of Objects detected are: "+objects.length;
            fill(R,G,B)
            percent=floor(objects[I].confidence*100)
            text(objects[I].label+" "+percent+"%", objects[I].x, objects[I].y)
            noFill()
            stroke(R,G,B)
            rect(objects[I].x,objects[I].y,objects[I].width,objects[I].height)
            if(objects[I].label=="person"){
                document.getElementById("no_of_objects").innerHTML= "Baby found"
                alarm.stop()
        }
        else{
            document.getElementById("no_of_objects").innerHTML= "Baby not found"
            alarm.play()
        }
    }
}
}