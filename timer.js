var x=0;
  
let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "C";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  // canvas.parent('webcam');

  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log("pose classification ready!");
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
    var y=document.getElementsByTagName("BODY")[0];
    if(x===0 && poseLabel==="C")
      {
        y.style.backgroundColor ="white";


      }
    else if(poseLabel==x[0])
      {
        y.style.backgroundColor ="#99ff66";


      }
    else
      {
         y.style.backgroundColor = "#ff6666";
        
      }
  }
  console.log(results[0].confidence + "got results");
  classifyPose();
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  // textSize(200);
  // textAlign(CENTER, CENTER);
  // text(poseLabel, width / 3, height / 3);

  console.log(poseLabel);

}
function timer() {
                const startingMinutes = 1;
                var time = startingMinutes * 60;
                var animation = time;
                const count = document.getElementById("count");

                // document.getElementById("pg-val").style.animationDuration = `${animation}s`;
                // document.getElementById(
                //     "home-left-back"
                // ).style.animationDuration = `${animation}s`;

                setInterval(updateCount, 1000);
                function updateCount() {
                    if (time >= 0) {
                        const minutes = Math.floor(time / 60);
                        var seconds = time % 60;

                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        count.innerHTML = `${minutes}:${seconds}`;
                        time--;
                    } else {
                        // document.getElementById("pg-val").style.width = "0%";
                    }
                }
            }
        
        function poseselected(){
               x=document.getElementById("mySelect").value;
              document.getElementById("posehead").innerHTML =x;
              document.getElementById("imgbox").style.display = "block";
              if(x==="Mountain")
                {
                  document.getElementById("imgsrc").src = "https://media.istockphoto.com/vectors/woman-standing-in-yoga-position-vector-id1087408928?k=6&m=1087408928&s=612x612&w=0&h=6BqTvAlXIjywb97T7Nb_YkFiNwHwOsPeiLy-s5HGDF0="
;
                }
          if(x==="Bend")
                {
                  document.getElementById("imgsrc").src = "https://st3.depositphotos.com/10343106/17864/v/600/depositphotos_178646230-stock-illustration-standing-forward-bend-pose.jpg"
;
                }
          
                if(x==="Warrior")
                {
                  document.getElementById("imgsrc").src = "https://media.istockphoto.com/vectors/woman-doing-yoga-at-home-vector-illustration-healthy-lifestyle-vector-id1177849625?k=6&m=1177849625&s=612x612&w=0&h=Gy_JdXYbugoUibp9-cT7JQh1M48Pm9C-MZ-oJDWk0Qk="
;
                }
              timer()
          
              
        }