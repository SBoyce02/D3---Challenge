// @TODO: YOUR CODE HERE!

// var svgWidth = 960;
// var svgHeight = 500;

var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(CensusData) {
  
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    CensusData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

 // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(CensusData, d => d.healthcare)])
      .range([0, width]);

      var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(CensusData, d => d.poverty)])
      .range([height, 0]);


 // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

  // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(CensusData)
    .enter()
    .append("circle")
    // .attr("cx", d => xLinearScale(d.healthcare))
    // .attr("cy", d => yLinearScale(d.poverty))
    // .attr("r", "15")
    // .attr("fill", "blue")
    // .attr("opacity", ".5");


// Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Healthcare: ${d.healthcareh}<br>Poverty Level: ${d.poverty}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

      // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    // .attr("class", "axisText")
    .text("Healthcare");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    // .attr("class", "axisText")
    .text("Poverty Level");
}).catch(function(error) {
  console.log(error);
});



