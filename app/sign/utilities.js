// Define our labelmap
const labelMap = {
    1:{name:'Hello', color:'red'},
    2:{name:'Thank You', color:'yellow'},
    3:{name:'I Love You', color:'lime'},
    4:{name:'Yes', color:'blue'},
    5:{name:'No', color:'purple'},
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    ctx.clearRect(0, 0, imgWidth, imgHeight)
    for(let i=0; i<boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [yMin,xMin,yMax,xMax] = boxes[i]
            const text = classes[i]
            const label = labelMap[text]
            if (!label) continue
            
            // Set styling
            ctx.strokeStyle = label.color
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(label.name + ' - ' + Math.round(scores[i]*100)/100, xMin*imgWidth, yMin*imgHeight-10)
            ctx.rect(xMin*imgWidth, yMin*imgHeight, (xMax-xMin)*imgWidth, (yMax-yMin)*imgHeight);
            ctx.stroke()
        }
    }
}
