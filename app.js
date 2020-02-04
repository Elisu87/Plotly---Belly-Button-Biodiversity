
// Empty Arrays for Metadata, Samples, and Names 
var metadataData =[]
var namesData= []
var sampleData= []

//Function to set up Plot 
function buildplot(id){

// Use D3 to load json file from sample file 
d3.json("Data/samples.json ").then(function (data) {

  //Assign variable for Metadata, Names, and Sample Dataset 
  var metadataData = data.metadata;
  var sampleData = data.samples;
  var namesData = data.names;

  // filter sample values by id 
  var samples = sampleData.filter(s => s.id.toString())[0];
  // console.log(samples);

  //Grab top 10 values
  var topsampleValues = samples.sample_values.slice(0,10).reverse();

  //Grab top 10 ids
  var topotuIds = samples.otu_ids.slice(0,10).reverse();

  //Grab top 10 Labels
  var topLabels = samples.otu_labels.slice(0,10);



  // Trace1 for the Sample Data(otu_ids and sample_values )
  var trace1 = {
    x: topsampleValues,
    y: topotuIds.map(d => "OTU " + d),
    text: topLabels,
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs", 
            tickmode:"linear"
          },
     margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 30
     
    }
  };
    
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", chartData, layout);
  
    //Create a bubble chart that displays each sample

    var trace1 = {
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: 'markers',
      marker: {
        colorscale: 'Earth',
        color: samples.otu_ids,
        size: samples.sample_values
      }
    };
    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
      title: 'SampleValues for OTU IDs',
      xaxis: { title: "OTU IDs"},
      yaxis: { title: "Sample Values"}, 
      showlegend: false,
      height : 600,
      width: 1200,
      margin:
                {
                    top: 10,
                    bottom: 10,
                    right: 10,
                    left: 10
                }
    };
     // Render the plot to the div tag with id "plot"
    Plotly.newPlot('bubble', data, layout);
   
  });
}  

// Function filter by id 
function displayInfo(id){

  // Use D3 to load json file from sample file 
  d3.json("Data/samples.json ").then(function (data) {
  
    //Assign variable for Metadata
    var metadataData = data.metadata;
    console.log(metadataData);
    // filter meta data info by id
    var metadata= metadataData.filter(meta => meta.id.toString());
    console.log(metadataData);
     //Use D3 to select panel div in index.html
     panel = d3.select(".panel-body");
    
    //Clear any data from existing metadata
    panel.html(" ");
  
      //Append h5 tag for each key and value from the metadata dataset
      Object.entries(metadata).forEach((key) => {   
        panel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");     
        })
    })
  }  

// Function to change event
function optionChanged(newid) {
  buildPlot(newid);
  displayInfo(newid);
}

//Function to initiate data display  by selecting id and plotting 
function init() {

  // Use D3 to load json file from sample file 
  d3.json("Data/samples.json ").then(function (data) {

  //Assign variable for Metadata
  var metadataData = data.metadata;
  
  //Assign ID variable
  var ids = metadataData.map(m => m.id);
  
  //Select Dropdown
  var dropdown = d3.select("#selDataset");
  
  //get the id data to the dropdwown menu
    ids.forEach(function(id) {
      dropdown.append("option").text(id).property("value");

  //Call functions for plotting 
  buildplot()
  displayInfo()

    });
  })
}

// Initiate function
init();