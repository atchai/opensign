
var addToLog = function(id, txt) {
  $(id).append("<br>" + txt);
};


// ===========================
// Blockchain example
// ===========================
$(document).ready(function() {
  
  var ipfs = ''
  
  $("#blockchain").hide();

  $("#blockchain button.set").click(function() {
    
    let value = "0x23"
    Notary.methods.addDocument(value).send({from: web3.eth.defaultAccount});
    addToLog("#invite", "You can ask others to sign the same agreement by going to this address: ");
    
  });
  

  $("#storage button.uploadFile").click(function() {
    var input = $("#storage input[type=file]");
    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
      $("span.fileIpfsHash").html(hash);
      $("input.fileIpfsHash").val(hash);
      ipfs = hash;
      $("#blockchain").show()
    })
    .catch(function(err) {
      if(err){
        console.log("IPFS uploadFile Error => " + err.message);
      }
    });
  });

});

