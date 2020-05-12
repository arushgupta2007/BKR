var to_paint = false;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

context = document.getElementById("whiteboard").getContext("2d");

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

var rect = document.getElementById("whiteboard").getBoundingClientRect();
var offsetLeft = rect.left;
var offsetTop = rect.top;

$("#whiteboard").mousedown(function (e) {
  var mouseX = e.pageX - offsetLeft;
  var mouseY = e.pageY - offsetTop;
  paint = true;
  addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
  redraw();
})

$('#whiteboard').mousemove(function(e){
  if(paint){
    addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
    redraw();
  }
});

$('#whiteboard').mouseup(function(e){
  paint = false;
});

// $('#whiteboard').mouseleave(function(e){
//   paint = false;
// });
