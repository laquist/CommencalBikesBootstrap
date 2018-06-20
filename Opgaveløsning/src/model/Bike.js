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
     * The Bike class is to create instances of different bikes, with their own values (ID, Name, Price, Type, Image)
     * @param {Object} bike Object with following properties: ID, Name, Price, Type, Image
     */
    constructor(bike) {
        this.id = bike.id;
        this.name = bike.name;
        this.price = bike.price;
        this.type = bike.type;
        this.image = bike.image;
    };
    
    static add(bike) {
        //Tjekker om en bike med det samme ID eksisterer
        if (!Bike.Instances[bike.id]) {
            var bike = new Bike(bike);
            Bike.Instances[bike.id] = bike;
            console.log("Bike with ID: " + bike.id + " has been added.");

            Bike.saveToLocalStorage();
        }
        else {
            console.log("Error while creating the bike! A bike with that ID already exists.");
        }
    };

    static delete(id) {
        if (Bike.Instances[id]) {
            delete Bike.Instances[id];
            console.log("Bike with ID: " + id + " has been deleted.");

            Bike.saveToLocalStorage();
        }
    };

    //Skal denne være static? Eller skal den køres på selve instansen som skal updates?
    static update(updatedBike) {
        var bike = Bike.Instances[updatedBike.id];
        if (bike.name !== updatedBike.name) {
            bike.name = updatedBike.name;
        }
        if (bike.price !== updatedBike.price) {
            bike.price = updatedBike.price;
        }
        if (bike.type !== updatedBike.type) {
            bike.type = updatedBike.type;
        }
        if (bike.image !== updatedBike.image) {
            bike.image = updatedBike.image;
        }

        console.log("Bike with ID: " + bike.id + " has been updated");
        
        Bike.saveToLocalStorage();
    };
    
    //Denne er dog ikke instance-level, for det giver ikke mening. Man kan bare bruge Bike1.Price, i stedet for at skulle sige Bike1.getPrice();
    static getPrice(id) {
        if(Bike.Instances[id]) {
            console.log("The price of the bike with ID: " + id + " is: " + Bike.Instances[id].price);
        }
        else {
            console.log("No bike found with ID: " + id);
        }
    };
    
    static createTestData() {
        var testBike1 = {
        	id:1,
        	name:"TestBike1",
        	price:100,
        	type:"Mountain Bike",
        	image:"bike1.jpg"
        };

        var testBike2 = {
        	id:2,
        	name:"TestBike2",
        	price:200,
        	type:"City Bike",
        	image:"bike2.jpg"
        };

        var testBike3 = {
        	id:3,
        	name:"TestBike3",
        	price:300,
        	type:"Racer Bike",
        	image:"bike3.jpg"
        };

        Bike.add(testBike1);
        Bike.add(testBike2);
        Bike.add(testBike3);

        console.log("Testdata created.");
    };

    static deleteAllData() {
        //Laver array af hvor mange properties/objekter som Bike.Instances indeholder
        var keys = Object.keys(Bike.Instances);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            console.log("Key: " + key);
            
            console.log("Deleted bike with ID: " + key);
            Bike.delete(key);
        }
        console.log("All bikes deleted.");
    };

    static saveToLocalStorage() {
        var bikeTableString = "";
        var error = false;

        try {
            bikeTableString = JSON.stringify(Bike.Instances);
            localStorage["bikeTable"] = bikeTableString;
        } 
        catch (e) {
            alert("Error when writing to Local Storage\n" + e);
            error = true;
        }
        
        if (!error) {
            console.log("Succesfully saved to Local Storage.");
        }
        else {
            console.log("Error when writing to Local Storage\n" + e);
        }
    };

    static loadFromLocalStorage() {
        var bikeTableString = "";
        var bikeTable = {};
        var keys = [];
        var key = "";

        try {
           if (localStorage["bikeTable"]) {
               bikeTableString = localStorage["bikeTable"];
           } 
        } 
        catch (e) {
            alert("Error when reading from Local Storage\n" + e);
        }

        if (bikeTableString) {
            bikeTable = JSON.parse(bikeTableString);
            keys = Object.keys(bikeTable);
            
            console.log(keys.length + " bikes loaded from local storage.");

            for (var i=0; i < keys.length; i++) {
                key = keys[i];
                Bike.Instances[key] = new Bike(bikeTable[key]);
            }
        }
        else {
            console.log("No matching data found in Local Storage.");
        }
    }
};

// Liste/Array/Map til instanserne
Bike.Instances = {};

//Loads the data from Local Storage, when the page loads.
window.addEventListener("onload", Bike.loadFromLocalStorage());