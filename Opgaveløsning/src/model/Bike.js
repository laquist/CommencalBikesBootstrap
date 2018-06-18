// Opret en klasse med tilhørende constructor og metoder, så hver cykel kan eksistere som en klasse instans (objekt) med tilhørende relevant information (pris, navn, type, billede). 
// Der skal minimum være en instance-level metode (ikke static) som kan returnere en bestemt cykels pris. (+ metoder til at kunne gemme instanser i local storage)


// var testBike5 = {
// 	id:5,
// 	name:"Test2",
// 	price:200,
// 	type:"Mountain Bike2",
// 	image:"placeholder2"
// };

// ---------------------------------

//Jeg skal vel lige finde en ordenlig metode til at give instanserne ID's automatisk. Så man ikke selv skal give et. Så kan det jo være den bare overskriver en anden bike.

class Bike {
    /**
     * 
     * @param {Object} bike Object with following properties: ID, Name, Price, Type, Image
     */
    constructor(bike) {
        this.id = bike.id;
        this.name = bike.name;
        this.price = bike.price;
        this.type = bike.type;
        this.image = bike.image;
    };
    
    //Denne skal nok lige tjekke om der findes en bike med dette ID, så den ikke bare overskriver
    static add(bike) {
        //Tjekker om en bike med det samme ID eksisterer
        if (!Bike.Instances[bike.id]) {
            var bike = new Bike(bike);
            Bike.Instances[bike.id] = bike;
            console.log("Bike with ID: " + bike.id + " has been added.");
        }
        else {
            console.log("Error while creating the bike! A bike with that ID already exists.");
        }
    };

    delete(id) {
        if (Bike.Instances[id]) {
            delete Bike.Instances[id];
            console.log("Bike with ID: " + id + " has been deleted.");
        }
    };
    
    getBikePrice(id) {
        if(Bike.Instances[id]) {
            console.log("The price of the bike with ID: " + id + " is: " + Bike.Instances[id].price);
        }
        else {
            console.log("No bike found with ID: " + id);
        }
    };
    
    
    //ToDo
    //Load fra local storage
    //Save til local storage
    //Update

};

// Liste/Array/Map til instanserne
Bike.Instances = {};