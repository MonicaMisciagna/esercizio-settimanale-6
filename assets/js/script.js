
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';


const fetchProduct= fetch(apiUrl,{
    method: 'GET',
     headers:  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM"
    }})
  .then(response => response.json())
  .then((products) => {
    console.log(products);
    products.forEach((product) => {
      let template = `
      <div class="col-6 col-md-4 p-3">
          <div class="card cardHome text-center">
              <img src=${product.imageUrl} class="card-img-top w-100" alt="">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text"> Price: €${product.price}</p>
               
                <a href="./dettaglio.html?productDetails=${product._id}" class="btn btn-primary">Scopri di più</a>
              </div>
            </div>
      </div>`


      const container = document.querySelector('.prod')
      container.innerHTML += template
    }) })
  .catch(error => console.error('Errore durante la richiesta:', error));

 

/*const productData = {
     name: "THE ELEPHANT MAN'S BONES",
    description: "The ALC Edition of The Elephant Man's Bones from Roc Marciano and The Alchemist featuring appearances from Action Bronson, Boldy James, Knowledge The Pirate, and Ice-T. Includes 2 new bonus tracks.",
     brand: "Alc Records",
    imageUrl: "https://alcrecords.com/cdn/shop/files/LP-ALC5036-SPLATTER_a8d262b9-6dcf-489e-8d32-9819aaa4c9d8_960x960_crop_center.jpg?v=1693509831",
     price: 80

 }
 const productData1 = {
    name: "NO YEAST REMIX B/W INSTRUMENTAL ",
   description: "New Craft Single featuring Curren$y, Boldy James, and Westside Gunn, beats by The Alchemist",
    brand: "Alc Records",
   imageUrl: "https://alcrecords.com/cdn/shop/files/F-ALC7016-FRONT_960x960_crop_center.jpg?v=1692401839",
    price: 30

}
const productData2 = {
    name: "FLYING HIGH (FIRST CLASS EDITION LP - SKY VINYL)",
   description: "The new EP from The Alchemist featuring appearances from Earl Sweatshirt, billy woods, TF, Boldy James, MIKE, Sideshow, Larry June and Jay Worthy. ",
    brand: "Alc Records",
   imageUrl: "https://alcrecords.com/cdn/shop/files/LP-ALC5049-SKY_960x960_crop_center.jpg?v=1690217017",
    price: 80
    
}
const productData3 = {
    name: "SANDWICH (ROAST TURKEY PICTURE DISC VINYL)",
   description: "Lunchmeat + Bread = Sandwich. The special edition LP featuring Roc Marciano, Earl Sweatshirt, Black Thought, Conway The Machine, Westside Gunn, ScHoolboy Q, Action Bronson, Styles P, Meyhem Lauren, Boldy James & Benny The Butcher.",
    brand: "Alc Records",
   imageUrl: "https://alcrecords.com/cdn/shop/products/LP-ALC5038-TURKEY-FRONT_960x960_crop_center.jpg?v=1670870410",
    price: 80
  
}

const products=[
    productData,productData1,productData2,productData3,
]
products.forEach(product => {
        fetch(apiUrl, {
             method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM"
            },
            body: JSON.stringify(product)
       })
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.log('Errore:', error))
      
});


const id = "6579dcd47c0dd90018c939a4"

fetch(apiUrl+id, {
     method: 'DELETE',
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM"
     }
 }).then(response => {
     if (!response.ok) {
         throw new Error('Errore nella richiesta: ' + response.statusText);
     }
     return response.json();
 })
 .then(data => console.log('Prodotto eliminato:', data))
 .catch(error => console.error('Errore:', error));
 */

