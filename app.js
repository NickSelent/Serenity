var maleColor = "#B8DEE6";
var femaleColor = "RED";
var rectWidth = 26;
var rectHeight = 26;
var rectBorder = "green"; //"#000000";
var bloodColor = "#000000"; //"none"
var marriageColor = "#000000"; //Was thinking of showing connection to Maia by Blood or Marriage "green"
var nameColor = "#000000";
var lineColor = "#000000";
var namefontsize = 10;
var svg = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(d3.zoom().on("zoom", function () { svg.attr("transform", d3.event.transform); }))
    .append("g");
// see X,Y as you move the mouse.
function findTheMouse() {
    var coordinates = d3.mouse(this);
    document.getElementById("content").innerHTML = "(" + Math.round(coordinates[0]) + "," + Math.round(coordinates[1]) + ")";
}
d3.select('svg').on('mousemove', findTheMouse);
//x is Horizontal placement of top left corner
//y is Vertical placement
//d deceased
var male = [
    { id: 1, x: 138, y: 175, G: "M", B: "B", name: "Varevesena Zhas", more: "207th Emperor of the Elflands", D: true },
    { id: 2, x: 238, y: 325, G: "M", B: "B", name: "Varenechibel IV", more: "208th Emperor of the Elflands", D: true },
    { id: 3, x: 238, y: 450, G: "M", B: "B", name: "Nemolis Drazhar", D: true },
    { id: 4, x: 638, y: 450, G: "M", B: "B", name: "Nazhira Drazhar", D: true },
    { id: 5, x: 763, y: 450, G: "M", B: "B", name: "Ciris Drazhar", D: true },
    { id: 6, x: 970, y: 450, G: "M", B: "B", name: "Maia Drazhar", D: false },
    { id: 7, x: 238, y: 540, G: "M", B: "B", name: "Idra Drazhar", D: false },
    { id: 8, x: 900, y: 175, G: "M", B: "B", name: "Maru Sevraseched", more: "The Great Avar of Barizhan", D: false }
];
//x,y of center
var female = [
    { id: 9, x: 350, y: 185, G: "F", B: "M", name: "Mother of Varenechibel IV", D: true },
    { id: 10, x: 400, y: 335, G: "F", B: "M", name: "Arbelan Drazharan", D: false },
    { id: 11, x: 600, y: 335, G: "F", B: "M", name: "Leshan Drazharan", D: true },
    { id: 12, x: 800, y: 335, G: "F", B: "M", name: "Pazhiro Drazharan", D: true },
    { id: 13, x: 1000, y: 335, G: "F", B: "M", name: "Chenelo Drazharan", more: "Second legitimate daughter of Maru Sevraseched", D: true },
    { id: 14, x: 1200, y: 335, G: "F", B: "M", name: "Csoru Drazharan", D: false },
    { id: 15, x: 375, y: 460, G: "F", B: "M", name: "Sheveän Drazharan", D: false },
    { id: 16, x: 500, y: 460, G: "F", B: "B", name: "Nemriän Imaran", D: false, more: "wife of the Marquess Imel" },
    { id: 17, x: 900, y: 460, G: "F", B: "B", name: "Vedero Drazhin", D: false },
    { id: 18, x: 375, y: 550, G: "F", B: "B", name: "Mirean Drazhin", D: false },
    { id: 19, x: 500, y: 550, G: "F", B: "B", name: "Ino Drazhin", D: false },
    { id: 20, x: 1100, y: 185, G: "F", B: "M", name: "Mother of Chenelo", D: true },
    { id: 21, x: 900, y: 275, G: "F", B: "M", name: "Thever Sevraseched", more: "Elder legitimate daughter of Maru Sevraseched", D: false },
    { id: 22, x: 1100, y: 275, G: "F", B: "M", name: "Holitho Sevraseched", more: "A votary in Urvekh", D: false },
    { id: 23, x: 1200, y: 275, G: "F", B: "M", name: "Shaleän Sevraseched", more: "A sea captain; her ship is the Glorious Dragon", D: false },
    { id: 24, x: 1300, y: 275, G: "F", B: "M", name: "Nadeian Vizhenka", more: "Wife of Captain Vizhenka", D: false },
    { id: 25, x: 1400, y: 275, G: "F", B: "M", name: "Ursu Perenched", more: "A sea captain’s wife", D: false }
];
//Pazhiro Drazharan 4th child Unamed (d) Mother and infant died in childbirth. 
//create a var to hold the union between spouses
var union = [{ m: 1, f: 9 },
    { m: 2, f: 10 },
    { m: 2, f: 11 },
    { m: 2, f: 12 },
    { m: 2, f: 13 },
    { m: 2, f: 14 },
    { m: 8, f: 20 },
    { m: 3, f: 15 }
];
var testvar = [];
//for each union add the male and female to a new var if they are not already there.
union.forEach(createConnections);
function createConnections(item, index) {
    for (var i = 0; i < male.length; i++) {
        if (male[i].id === item.m)
            testvar.push(male[i]);
    }
    for (var i = 0; i < female.length; i++) {
        if (female[i].id === item.f)
            testvar.push(female[i]);
    }
}
var distinctHusbands = [];
union.forEach(createDistinctHusbands);
function createDistinctHusbands(item, index) {
    var newspouse = true;
    for (var i = 0; i < distinctHusbands.length; i++) {
        if (distinctHusbands[i].id === item.m)
            newspouse = false;
    }
    if (newspouse === true) {
        distinctHusbands.push(item);
    }
}
//with a list of distinct husbands then you can build a list of wives to determine how wide the connection should be...
var testvar2 = [];
distinctHusbands.forEach(createSpouseLine);
function createSpouseLine(item, index) {
    var left = 999999;
    var right = 0;
    var ycoor = 0;
    for (var i = 0; i < union.length; i++) {
        if (union[i].m === item.m) {
            for (var w = 0; w < female.length; w++) {
                if (female[w].id === union[i].f) {
                    if (female[w].x > right)
                        right = female[w].x;
                    ycoor = female[w].y;
                }
            }
        }
    }
    for (var m = 0; m < male.length; m++) {
        if (male[m].id === item.m) {
            left = male[m].x + 10;
        }
    }
    testvar2.push({ x1: left, y1: ycoor + 50, x2: right, y2: ycoor + 50 });
}
testvar2.forEach(printme);
//create another union like object to create a join across all children of the same mother.
//horizontal line from the mid of the far left to the mid of far right... n pixals above the x
var childunion = [{ mother: 11, child: 3, union: "Leshan Children" },
    { mother: 11, child: 16, union: "Leshan Children" },
    { mother: 12, child: 4, union: "Pazhiro Children" },
    { mother: 12, child: 5, union: "Pazhiro Children" },
    { mother: 12, child: 17, union: "Pazhiro Children" },
    { mother: 15, child: 7, union: "Shevean Children" },
    { mother: 15, child: 18, union: "Shevean Children" },
    { mother: 15, child: 19, union: "Shevean Children" },
    { mother: 20, child: 21, union: "Great Avar Children" },
    { mother: 20, child: 13, union: "Great Avar Children" },
    { mother: 20, child: 22, union: "Great Avar Children" },
    { mother: 20, child: 23, union: "Great Avar Children" },
    { mother: 20, child: 24, union: "Great Avar Children" },
    { mother: 20, child: 25, union: "Great Avar Children" }
];
var horizontals = [];
var mothers = [];
//both y needs to be slightly above the children
//X needs to be farthest left and farthest right
childunion.forEach(createRelations);
function createRelations(item, index) {
    for (var i = 0; i < female.length; i++) {
        if (female[i].id === item.mother) {
            //need to see if mother is already here before adding her
            var newmom = true;
            for (var j = 0; j < mothers.length; j++) {
                if (mothers[j].id === female[i].id)
                    newmom = false;
            }
            if (newmom)
                mothers.push(female[i]);
        }
    }
}
//then we can iterate mothers to figure out the left right and space children line n pixals below spouses
//horizontals.push({x1:mothers[j].x-10,y1:mothers[j].y+60,x2:mothers[j].x+10,y2:mothers[j].y+60, f: femaleColor, name:mothers[j].name})
//for each unique mother lets check each child for left most and right most
mothers.forEach(createHorizontal);
function createHorizontal(item, index) {
    var left = 999999;
    var right = 0;
    for (var i = 0; i < childunion.length; i++) {
        if (childunion[i].mother === item.id) {
            //use the child id to get left and right from both male and female arrays
            for (var m = 0; m < male.length; m++) {
                if (male[m].id === childunion[i].child) {
                    if (male[m].x < left)
                        left = male[m].x + 10;
                    if (male[m].x > right)
                        right = male[m].x;
                }
            }
            for (var w = 0; w < female.length; w++) {
                if (female[w].id === childunion[i].child) {
                    if (female[w].x < left)
                        left = female[w].x;
                    if (female[w].x > right)
                        right = female[w].x;
                }
            }
        }
    }
    horizontals.push({ x1: left, y1: item.y + 60, x2: right, y2: item.y + 60, f: femaleColor, name: item.name });
}
function printme(item, index) {
    console.log(item);
}
//TODO: How can these lines be calculated instead of manual???
//Horizontal Lines
//horizontal line from the mid of the far left to the mid of far right... n pixals above the x
//var horizontals = [ { x1: 900, y1: 250, x2: 1400, y2: 250, f: lineColor, union: "Great Avar Children" }];
//Vertical Lines for single children...
//var verticals = [     { x1: 250, y1: 225, x2: 250, y2: 325, f: "lightblue", name: "Varenchibel IV Origin" }
//     , { x1: 983, y1: 375, x2: 983, y2: 450, f: "lightblue", name: "Connect Maia"}]
var verticals = [
    { x1: 450, y1: 375, x2: 450, y2: 400, f: "lightblue", name: "Connect Leshan Children" },
    { x1: 725, y1: 375, x2: 725, y2: 400, f: "lightblue", name: "Connect Pazhiro Children" },
    { x1: 350, y1: 505, x2: 350, y2: 520, f: "lightblue", name: "Connect Shevean Children" }
];
var verticalsChildren = [
    { x1: 250, y1: 400, x2: 250, y2: 450, f: lineColor, name: "Connect Nemolis" },
    { x1: 500, y1: 400, x2: 500, y2: 450, f: lineColor, name: "Connect Nemrian" },
    { x1: 650, y1: 400, x2: 650, y2: 450, f: lineColor, name: "Connect Nazhira" },
    { x1: 775, y1: 400, x2: 775, y2: 450, f: lineColor, name: "Connect Ciris" },
    { x1: 900, y1: 400, x2: 900, y2: 450, f: lineColor, name: "Connect Vedero" },
    { x1: 250, y1: 520, x2: 250, y2: 540, f: lineColor, name: "Connect Idra" },
    { x1: 375, y1: 520, x2: 375, y2: 540, f: lineColor, name: "Connect Mirean" },
    { x1: 500, y1: 520, x2: 500, y2: 540, f: lineColor, name: "Connect Ino" },
    { x1: 1000, y1: 225, x2: 1000, y2: 325, f: lineColor, name: "Chenelo Origin" },
    { x1: 900, y1: 250, x2: 900, y2: 265, f: lineColor, name: "Thever Origin" },
    { x1: 1100, y1: 250, x2: 1100, y2: 265, f: lineColor, name: "Holitho Origin" },
    { x1: 1200, y1: 250, x2: 1200, y2: 265, f: lineColor, name: "Shaleän Origin" },
    { x1: 1300, y1: 250, x2: 1300, y2: 265, f: lineColor, name: "Nadeian Origin" },
    { x1: 1400, y1: 250, x2: 1400, y2: 265, f: lineColor, name: "Ursu Origin" }
];
//svg.selectAll("rect").remove(); //remove can be used if you want to redraw these after an interaction...
//Create Rectangles for each person
svg.selectAll("rect")
    .data(male)
    .enter().append("rect")
    .attr("x", function (d) { return d.x; })
    .attr("y", function (d) { return d.y; })
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("stroke", function (d) { return d.B === "B" ? bloodColor : marriageColor; })
    .style("fill-opacity", 0.5)
    .style("fill", function (d) { return d.G === "M" ? maleColor : femaleColor; })
    .on("mouseover", function (d) { tooltip.text(d.more); return tooltip.style("visibility", "visible"); })
    .on("mousemove", function (d) { tooltip.text(d.more); return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px"); })
    .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", 'red')
    .text("a simple tooltip");
svg.selectAll("circle")
    .data(female)
    .enter().append("circle")
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .attr("r", 13)
    .attr("stroke", function (d) { return d.B === "B" ? bloodColor : marriageColor; })
    .attr("stroke-width", 2)
    .style("fill-opacity", 0.2)
    .style("fill", function (d) { return d.G === "M" ? maleColor : femaleColor; })
    .on("mouseover", function (d) { tooltip.text(d.more); return tooltip.style("visibility", "visible"); })
    .on("mousemove", function (d) { tooltip.text(d.more); return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px"); })
    .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
var peopleData = male.concat(female);
//Add Names
svg.selectAll("text")
    .data(peopleData)
    .enter().append("text")
    .attr("x", function (d) { return d.G === "M" ? d.x : d.x - rectHeight; })
    .attr("y", function (d) { return d.G === "M" ? d.y + rectHeight + namefontsize : d.y + rectHeight; })
    .text(function (d) { return d.name; })
    .attr("font-family", "sans-serif")
    .attr("font-size", namefontsize)
    .attr("fill", nameColor);
//mark deceased
svg.selectAll("deceased")
    .data(peopleData.filter(function (d) { return d.D === true; }))
    .enter().append("line")
    .attr("x1", function (d) { return d.G === "M" ? d.x : d.x + (rectHeight / 3); })
    .attr("y1", function (d) { return d.G === "M" ? d.y : d.y + (rectHeight / 3); })
    .attr("x2", function (d) { return d.G === "M" ? d.x + rectHeight : d.x - (rectHeight / 3); })
    .attr("y2", function (d) { return d.G === "M" ? d.y + rectHeight : d.y - (rectHeight / 3); })
    .attr("stroke-width", 2)
    .style("fill-opacity", 1)
    .attr("stroke", function (d) { return femaleColor; });
//All Horizontal Lines
svg.selectAll("horizontals")
    .data(horizontals)
    .enter().append("line")
    .attr("x1", function (d) { return d.x1; })
    .attr("y1", function (d) { return d.y1; })
    .attr("x2", function (d) { return d.x2; })
    .attr("y2", function (d) { return d.y2; })
    .attr("stroke-width", 0.5)
    .style("fill-opacity", 0.5)
    .attr("stroke", function (d) { return d.f; });
//All Vertical Lines
svg.selectAll("verticals")
    .data(verticals)
    .enter().append("line")
    .attr("x1", function (d) { return d.x1; })
    .attr("y1", function (d) { return d.y1; })
    .attr("x2", function (d) { return d.x2; })
    .attr("y2", function (d) { return d.y2; })
    .attr("stroke-width", 1)
    .style("fill-opacity", 0.5)
    .attr("stroke", function (d) { return d.f; });
svg.selectAll("verticals")
    .data(verticalsChildren)
    .enter().append("line")
    .attr("x1", function (d) { return d.x1; })
    .attr("y1", function (d) { return d.y1; })
    .attr("x2", function (d) { return d.x2; })
    .attr("y2", function (d) { return d.y2; })
    .attr("stroke-width", 0.5)
    .style("fill-opacity", 0.5)
    .attr("stroke", function (d) { return d.f; });
//These crazy formulas for line length should all be prefactored...
//Create verticals connecting to the spouse line.
svg.selectAll("verticals")
    .data(testvar)
    .enter().append("line")
    .attr("x1", function (d) { return d.G === "M" ? d.x + (rectWidth / 2) : d.x; })
    .attr("y1", function (d) { return d.G === "M" ? d.y + rectHeight + namefontsize + 4 : d.y + (rectHeight / 2) + namefontsize + 6; })
    .attr("x2", function (d) { return d.G === "M" ? d.x + (rectWidth / 2) : d.x; })
    .attr("y2", function (d) { return d.G === "M" ? d.y + rectHeight + namefontsize + rectHeight : d.y + 16 + namefontsize + rectHeight; })
    .attr("stroke-width", 1)
    .style("fill-opacity", 1)
    .attr("stroke", "green");
//Create horizontal spouse line
//TODO: need to try something different here so that we connect the left most spouse to the right most spouse...
svg.selectAll("horizontals")
    .data(testvar2)
    .enter().append("line")
    .attr("x1", function (d) { return d.x1; })
    .attr("y1", function (d) { return d.y1; })
    .attr("x2", function (d) { return d.x2; })
    .attr("y2", function (d) { return d.y2; })
    .attr("stroke-width", 1)
    .style("fill-opacity", 1)
    .attr("stroke", "green");
//# sourceMappingURL=app.js.map