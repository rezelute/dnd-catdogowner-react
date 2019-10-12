export class Cat
{
  static cat_names = ["Aldo", "Bear", "Toby", "Teddy", "Zeus", "Louie", "Murphy", "Henry", "Ollie", "Oscar", "Finn", "Lucky", "Sam", "Beau", "Jasper", "Apollo", "Thor", "Shadow", "Otis", "Rocco", "Rex", "George", "Ziggy", "Romeo", "Benny", "Ranger", "Prince", "Oreo", "Joey", "Peanut", "Frankie", "Chico", "Chase", "Zeke", "Chester", "Odin", "Walter", "Sebastian", "Dusty", "Theo", "Tiger", "Felix", "Xavier", "Goose", "Smokey", "Tigger", "Diego", "Eddie", "Rascal", "Tango", "Midnight", "Rocky", "Panda", "Jake", "Thomas", "Boo", "Gizmo", "Sylvester", "Ivan", "Vincent", "Rey", "Elvis", "Griffin", "Harry", "Peregrine", "Leonard", "Dante", "Paco", "Chewy", "Silver", "Justice", "Hunter", "Chase", "Cedar", "Zander"];
  static cat_colors = ["White", "Black", "Ginger", "Grey", "Cream", "Brown", "Cinnamon", "Fawn"];
  static cat_breeds= ["Abyssinian","Aegean cat","Australian Mist","American Polydactyl","American Bobtail","American Curl","American Longhair","American Shorthair","American Wirehair","Asian Semi-longhair","Balinese","Bengal","Birman","Bombay","Brazilian Shorthair","British Shorthair","British Longhair","Burmese","Burmilla","California Spangled Cat","Chantilly/Tiffany","Chartreux","Chausie","Cheetoh","Colorpoint Shorthair","Cornish Rex","Cymric","Devon Rex","Donskoy or Don Sphynx","Dragon Li","Egyptian Mau","European Shorthair","Exotic Shorthair","German Rex","Havana Brown","Himalayan/Colorpoint Persian","Japanese Bobtail","Javanese","Korat","Kurilian Bobtail","LaPerm","Maine Coon","Manx","Munchkin","Nebelung","Norwegian Forest Cat","Ocicat","Ojos Azules","Oregon Rex","Oriental Bicolour","Oriental Shorthair","Oriental Longhair","Persian","Peterbald","Pixie-bob","Ragamuffin","Ragdoll","Russian Blue","Russian White, Black and Tabby","Savannah","Scottish Fold","Selkirk Rex","Serengeti cat","Siamese","Siberian","Singapura","Snowshoe","Sokoke","Somali","Sphynx","Sumxu","Thai/Old-style Siamese","Tonkinese","Toyger","Turkish Angora","Turkish Van","Turkish Vankedisi","Twisty Cat/Squitten","Ukrainian Levkoy","Ussuri","York Chocolate Cat"];

  static generateBreed()
  {
    return this.cat_breeds[Math.floor(Math.random() * this.cat_breeds.length)];
  }

  static generateColor()
  {
    return this.cat_colors[Math.floor(Math.random() * this.cat_colors.length)];
  }

  static generateName()
  {
    return this.cat_names[Math.floor(Math.random() * this.cat_names.length)];
  }
}

export class Dog
{
  static dog_breeds = ["Affenpinscher", "Affenpoo", "Afghan Hound", "Airedale Terrier", "Airedoodle", "Akbash Dog", "Aki-Poo", "Akita", "Akita Mix", "Alapaha Blue Blood Bulldog", "Alaskan Klee Kai", "Alaskan Malamute", "Alaskan Malamute Mix", "American Bulldog", "American Bulldog Hybrid", "American Bully", "American Bully Hybrid", "American Eskimo", "American Foxhound", "American Leopard Hound", "American Pit Bull Terrier", "American Staffordshire Terrier", "American Water Spaniel", "Anatolian Shepherd", "Anatolian Shepherd Hybrid", "Aussiedoodle", "Australian Cattle Dog", "Australian Shepherd", "Australian Shepherd Mix", "Australian Terrier", "Basenji", "Basset Hound", "Basset Mix", "Beabull", "Beagle", "Beagle Mix", "Beaglier", "Bearded Collie", "Beauceron", "Bedlington Terrier", "Belgian Malinois", "Belgian Malinois Hybrid", "Belgian Sheepdog", "Bengal Kitten", "Bernedoodle", "Bernese Mountain Dog", "Bernese Mountain Dog Mini", "Bernese Mountain Dog Mix", "Bichon Frise", "Bichon Mix", "Bichpoo", "Biewer Terrier", "Black and Tan Coonhound", "Black and Tan Coonhound Hybrid", "Black Russian Terrier", "Bloodhound", "Bloodhound Poodle Hybrid", "Blue Heeler", "Blue Heeler Mix", "Border Collie", "Border Collie Mix", "Border Terrier", "Borzoi", "Boston Terrier", "Boston Terrier Mix", "Bouvier des Flandres", "Boxer", "Boxer Mix", "Boxer/Bulldog", "Briard", "Briquet Griffon Vendéen", "Brittany Mix", "Brittany Spaniel", "Brittnepoo", "Broodle Griffon", "Brussels Griffon", "Brussels Griffon Mix", "Bugg", "Bull Mastiff Hybrid", "Bull Terrier", "Bullmastiff", "Bully Bassets", "Cairn Terrier", "Cairn Terrier Mix", "Cairnpoo / Cairnoodle", "Canaan Dog", "Cane Corso (Italian Mastiff)", "Cane Corso (Italian Mastiff) Mix", "Cardigan Welsh Corgi", "Catahoula Leopard Dog", "Cava Tzu", "Cavachon", "Cavalier King Charles Spaniel", "Cavalier Mix", "Cavanese", "Cavapom", "Cavapoo", "Cavestie", "Central Asian Ovcharka", "Cesky Terrier", "Chesapeake Bay Retriever", "Chi-Poo", "Chihuahua", "Chihuahua Mix", "Chinese Crested", "Chinese Shar Pei Hybrid", "Chinese Shar-Pei", "ChiPom (Chihuahua/Pomerian)", "ChiWeenie", "Chow Chow", "Chugs", "Clumber Spaniel", "Cockalier", "Cockapoo", "Cocker Spaniel", "Cocker Spaniel Mix", "Collie", "Collie Mix", "Coonhound", "Coonhound Mix", "Corgipoo", "Coton De Tulear", "Coton de Tulear Mix", "Curly-Coated Retriever", "Dachapoo", "Dachshund", "Dachshund Mini", "Dachshund Mix", "Dalmatian", "Dalmation Mix", "Dandie Dinmont Terrier"];
  static dog_names = ["Max", "Charlie", "Cooper", "Buddy", "Jack", "Rocky", "Duke", "Bear", "Oliver", "Tucker", "Milo", "Bentley", "Toby", "Leo", "Teddy", "Jax", "Zeus", "Winston", "Murphy", "Louie", "Jake", "Ollie", "Finn", "Gus", "Dexter", "Bailey", "Henry", "Riley", "Buster", "Moose", "Lucky", "Hank", "Jackson", "Loki", "Harley", "Bruno", "Beau", "Oscar", "Blue", "Diesel", "Thor", "Baxter", "Apollo", "Bandit", "Cody", "Sam", "Ace", "Koda", "Jasper", "Gunner", "Scout", "Bo", "Shadow", "Gizmo", "Marley", "Sammy", "Brody", "Otis", "Maverick", "Roscoe", "Simba", "Tank", "Rex", "Rocco", "Luke", "Boomer", "George", "Copper", "Chance", "Ziggy", "Rusty", "Cash", "Hunter", "Benny", "Ranger", "Prince", "Chester", "Oreo", "Benji", "Tyson", "Romeo", "Coco", "Chewy", "Chase", "Rudy", "King", "Frankie", "Bruce", "Joey", "Samson", "Zeke", "Archie", "Peanut", "Odin", "Theo", "Kobe", "Brutus", "Brady", "Mac", "Chico"];
  static dog_colors = ["black", "white", "brown", "red", "blue", "grey", "gold", "cream", "yellow"];

  static generateBreed()
  {
    return this.dog_breeds[Math.floor(Math.random() * this.dog_breeds.length)];
  }

  static generateColor()
  {
    return this.dog_colors[Math.floor(Math.random() * this.dog_colors.length)];
  }

  static generateName()
  {
    return this.dog_names[Math.floor(Math.random() * this.dog_names.length)];
  }
}

export class Owner
{
  static owner_countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Costa Rica","Côte d’Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor (Timor-Leste)","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","The Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia, Federated States of","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","Sudan","Sudan, South","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

  static generateCountry()
  {
    return this.owner_countries[Math.floor(Math.random() * this.owner_countries.length)];
  }
  static generateAge()
  {
    const max = 80;
    const min = 20;
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
