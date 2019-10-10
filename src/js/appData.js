
export default class AppData {
  static getData() {
    return {
      catList: [
        { id: 1, name: "felix", attributes: { breed: "siamese", color: "Black" } },
        { id: 2, name: "Catalax", attributes: { breed: "normal", color: "Silver" } },
        { id: 3, name: "Pizza", attributes: { breed: "normal", color: "Golden" } },
      ],
      dogList: [
        { id: 1, name: "Crispie", attributes: { breed: "shitzu", color: "yellow" } },
        { id: 2, name: "Poptart", attributes: { breed: "Labradoodle", color: "pink" } },
        { id: 3, name: "Donut", attributes: { breed: "Labradour", color: "green" } },
      ],
      ownerList: [
        { id: 1, name: "Hamzah", age: 16, country: "Lebanon", catIds: [], dogIds: [] },
        { id: 2, name: "Adam", age: 32, country: "Egypt", catIds: [], dogIds: [] },
        { id: 3, name: "Laura", age: 33, country: "United Kingdom", catIds: [], dogIds: [] },
        { id: 4, name: "Denise", age: 54, country: "United Kingdom", catIds: [], dogIds: [] },
        { id: 5, name: "Hassan", age: 29, country: "United Kingdom", catIds: [], dogIds: [] },
        { id: 6, name: "Ali", age: 59, country: "Lebanon", catIds: [], dogIds: [] },
      ],
      draggedItem: {
        petId: -1,
        petType: ""
      },
      showOwnerPets: {
        open: false,
        ownerId: 11,
        ownerName: "Penis",
        catList: [
          { id: 1, name: "felix", attributes: { breed: "siamese", color: "Black" } },
          { id: 2, name: "Catalax", attributes: { breed: "normal", color: "Silver" } },
        ],
        dogList: [
          { id: 1, name: "Crispie", attributes: { breed: "shitzu", color: "yellow" } },
          { id: 2, name: "Poptart", attributes: { breed: "Labradoodle", color: "pink" } },
        ]
      }
    }
  } 
}