
var addToLog = function(id, txt) {
  $(id).append("<br>" + txt);
};

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


// ===========================
// Blockchain example
// ===========================
$(document).ready(function() {
  
  var ipfs = ''
  
  $("#blockchain").hide();
  $("#invite").hide();
  
  // we're on sign page
 // if (getQueryVariable("ipfs") != false) {
 //   let addresses = Notary.methods.getSignatures().call().then(function(value) { console.log(value) });

 //   console.log(addresses)
    $("span.file_url").html('<a href="' + EmbarkJS.Storage.getUrl(getQueryVariable("ipfs")) + '">View document</a>');
    
    $("#signatures button.get").click(function() {
      let value = web3.utils.asciiToHex(getQueryVariable("ipfs"))
    
      let addresses = Notary.methods.getSignatures(value).call().then(function(value) { console.log(value) });
        
    });
    
    $("#sign button.set").click(function() {
      let value = web3.utils.asciiToHex(getQueryVariable("ipfs"))
    
      Notary.methods.signDocument(value).send({from: web3.eth.defaultAccount});
        
      $("#signed").show();
      $("#signed").append("<p>You have signed! Keep a record of this URL to refer to your agreement.</p>");
    
    });
//  }
  
  
  


  $("#blockchain button.set").click(function() {
    let value = web3.utils.asciiToHex(ipfs)
    
    Notary.methods.addDocument(value).send({from: web3.eth.defaultAccount});
    
    let sign_url = window.location.href + "/sign.html?ipfs=" + ipfs;
    
    $("#invite").show();
    $("#invite .card-body").append("<p>Keep this address and share it with others who you want to sign the document: </p>");
    $("#invite .card-body").append('<p><a href="' + sign_url + '">' + sign_url + "</p>");
    
  });
  

  $("#storage button.uploadFile").click(function() {
    var input = $("#storage input[type=file]");
    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
      ipfs = hash;
      let url = EmbarkJS.Storage.getUrl(ipfs);
      $("#storage .card-body").append('<p>Your document is accessible here: <a href="' + url + '">' + url + "</p>");
      $("#blockchain").show()
      
    })
    .catch(function(err) {
      if(err){
        console.log("IPFS uploadFile Error => " + err.message);
      }
    });
  });

});

