AFRAME.registerComponent("markerhandler", {
    init: async function() {
      var toys= await this.getToys();

      this.el.addEventListener("markerFound", () => {
        var markerId= this.el.id;
        this.handleMarkerFound(toys, markerId);
      });
  
      this.el.addEventListener("markerLost", () => {
        console.log("marker is lost");
        this.handleMarkerLost();
      });
    },
    handleMarkerFound: function(toys, markerId) {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";
  
      var orderButtton = document.getElementById("order-button");
      var orderSummaryButtton = document.getElementById("order-summary-button");
  
      // Handling Click Events
      orderButtton.addEventListener("click", () => {
        swal({
          icon: "https://media.istockphoto.com/vectors/hand-drawn-text-support-quote-vector-id1251581856",
          title: "Thanks For Order !",
          text: "Please Visit Again",
          timer: 2000,
          buttons: false
        });
      });
  
      orderSummaryButtton.addEventListener("click", () => {
        swal({
          icon: "warning",
          title: "Order Summary",
          text: "Work In Progress"
        });
      });

      var toy= toys.filter(toy => toy.id === markerId)[0]
      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
    },
    
    getToys: async function(){
      return await firebase
      .firestore()
      .collection('toys')
      .get()
      .then(snap =>{
        return snap.docs.map(doc => doc.data());
      })
    },
  
    handleMarkerLost: function() {
      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "none";
    }
  });


