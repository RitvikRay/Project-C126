Song1 = "";
Song2 = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
statusOfSong1="";
statusOfSong2="";
function preload()
{
    Song1 = loadSound("1.mp3");
    Song2= loadSound("2.mp3");
}
function setup()
{
    canvas=createCanvas(640,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}
function modelLoaded()
{
    console.log("loaded");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}
function draw()
{
    image(video,0,0,640,500);
    statusOfSong1=Song1.isPlaying();
    if(scoreLeftWrist>0.2)
    {
        fill("#0E5135");
        stroke("#0E5135");
        circle(leftWristX,leftWristY,20);
        Song2.stop();
        if(statusOfSong1==false)
        {
            document.getElementById("song_playing").innerHTML="TOTK Main Theme";
            Song1.play();
        }
    }
    if(scoreRightWrist>0.2)
    {
        fill("blue");
        stroke("blue");
        circle(rightWristX,rightWristY,20);
        Song1.stop();
        if(statusOfSong2==false)
        {
            document.getElementById("song_playing").innerHTML="Otherside";
            Song2.play();
        }
    }
}
