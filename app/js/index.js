// Check for Metamask and show/hide appropriate warnings.
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if ((typeof web3 !== 'undefined') && (web3.givenProvider !== null)) {
        // Use Mist/MetaMask's provider    
    web3.eth.getAccounts(function(err, accounts){
        if (err != null) console.error("An error occurred: "+err);
        
        // User is not logged into Metamask
        else if (accounts.length == 0) {
          $("#main-content").hide();
          $("#metamask-login").show();
          $("#metamask-install").hide();
          console.log("User is not logged in to MetaMask");
        }
      
        // User is logged in to Metamask
        else {
          console.log("User is logged in to MetaMask");
          $("#main-content").show();
          $("#metamask-login").hide();
          $("#metamask-install").hide();
        }
      
    });
    
  // User does not have Metamask / web3 provider  
  } else {
    $("#main-content").hide();
    $("#metamask-login").hide();
    $("#metamask-install").show();
    console.log('No web3? You should consider trying MetaMask!')
  }
})

var getQueryVariable = function(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


$(document).ready(function() {
  
  var ipfs = ''
  
  $("#blockchain").hide();
  $("#invite").hide();
  $("#learn-more").hide();
  
  EmbarkJS.Storage.setProvider('ipfs',{server: 'ipfs.infura.io', port: '5001', protocol: 'https'})  
  
  $(".btn-learn-more").click(function() {
    $(".btn-learn-more").hide();
    $("#learn-more").show();
  });
  
  // Sign page
  if (getQueryVariable("ipfs") != false) {

    $("span.file_url").html('<a href="' + EmbarkJS.Storage.getUrl(getQueryVariable("ipfs")) + '">View document</a>');
    
    $("#signatures button.get").click(function() {
      let value = web3.utils.asciiToHex(getQueryVariable("ipfs"))
    
      let addresses = Notary.methods.getSignatures(value).call().then(function(signatures) { 
        signatures.forEach(function(sig) {
          console.log(sig) 
          
          $("#signatures button.get").hide();
          $("#signatures .card-body").append("<p>" + sig + "</p>");
        })
      });
        
    });
    
    $("#sign button.set").click(function() {
      let value = web3.utils.asciiToHex(getQueryVariable("ipfs"))
    
      Notary.methods.signDocument(value).send({from: web3.eth.defaultAccount});
        
      $("#signed").show();
      $("#signed").append("<p>You have signed! Keep a record of this URL to refer to your agreement.</p>");
    
    });
  }
  
  
  // Step 1 - upload file to IPFS
  $("#storage button.uploadFile").click(function() {
    var input = $("#storage input[type=file]");
    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
      ipfs = hash;
      let url = EmbarkJS.Storage.getUrl(ipfs);
      $("#storage .card-body").append('<p><a href="' + url + '">Here is a link to your document</p>"');
      $("#blockchain").show()
      
    })
    .catch(function(err) {
      if(err){
        $("#storage .card-body").append('<p>Sorry, it looks like there is a problem connecting to IPFS at the moment. Please try again later.</p>');
        console.log("IPFS uploadFile Error => " + err.message);
      }
    });
  });
  
  // Step 2 - sign document
  $("#blockchain button.set").click(function() {
    let value = web3.utils.asciiToHex(ipfs)
    
    Notary.methods.addDocument(value).send({from: web3.eth.defaultAccount});
    
    let sign_url = window.location.href + "/sign.html?ipfs=" + ipfs;
    
    $("#invite").show();
    $("#invite .card-body").append("<p>Keep this address and share it with others who you want to sign the document: </p>");
    $("#invite .card-body").append('<p><a href="' + sign_url + '">' + sign_url + "</p>");
    
  });

});

