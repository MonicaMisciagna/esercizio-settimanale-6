document.addEventListener('DOMContentLoaded', function () {
  let productId;

  const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM'
    }
  })
    .then(response => response.json())
    .then(products => {
      const container = document.querySelector('.prod');

      products.forEach(product => {
        let template = `
          <div class="col-6 col-md-4 p-2">
            <div class="card text-center">
              <img src=${product.imageUrl} class="card-img-top w-100" alt="">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.brand}</p>
                <p class="card-text">Price: €${product.price}</p>
                <button type="button" class="btn btn-primary openUpdateModalBtn" data-bs-toggle="modal" data-bs-target="#updateModal" data-bs-whatever="@mdo" data-product-id="${product._id}">MODIFICA</button>
                <button class="btn btn-primary deleteButton" data-id="${product._id}">CANCELLA</button>
              </div>
            </div>
          </div>`;

        container.innerHTML += template;
      });

      // Open Modal Button Click Event
      const openUpdateModalButtons = document.querySelectorAll('.openUpdateModalBtn');
      openUpdateModalButtons.forEach(openUpdateModalButton => {
        openUpdateModalButton.addEventListener('click', function () {
          productId = this.getAttribute('data-product-id');
          console.log('Product ID for update:', productId);

          const product = products.find(p => p._id === productId);

          const updateForm = document.getElementById('updateForm');
          updateForm.innerHTML = `
            <label for="updateProductName">Nome</label>
            <input type="text" class="form-control" id="updateProductName" value="${product.name}" required>

            <label for="updateImageURL">Immagine</label>
            <input type="text" class="form-control" id="updateImageURL" value="${product.imageUrl}" required>

            <label for="updateDescription">Descrizione</label>
            <input type="text" class="form-control" id="updateDescription" value="${product.description}" required>

            <label for="updateBrand">Brand</label>
            <input type="text" class="form-control" id="updateBrand" value="${product.brand}" required>

            <label for="updatePrice">Prezzo</label>
            <input type="text" class="form-control" id="updatePrice" value="${product.price}" required>
          `;

          const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
          updateModal.show();
        });
      });

      // Update Button Click Event
      const updateBtn = document.getElementById('updateBtn');
      updateBtn.addEventListener('click', function () {
        const updateForm = document.getElementById('updateForm');
        const updatedProductName = document.getElementById('updateProductName').value;
        const updatedImageURL = document.getElementById('updateImageURL').value;
        const updatedDescription = document.getElementById('updateDescription').value;
        const updatedBrand = document.getElementById('updateBrand').value;
        const updatedPrice = document.getElementById('updatePrice').value;

        const formData = {
          name: updatedProductName,
          imageUrl: updatedImageURL,
          description: updatedDescription,
          brand: updatedBrand,
          price: updatedPrice
          // Add other form fields as needed
        };

        // Esegui una chiamata PUT all'API per aggiornare il prodotto
        fetch(apiUrl + productId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(updatedProduct => {
            console.log('Product updated successfully:', updatedProduct);
            location.reload();
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });

        const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
        updateModal.hide();
      });

      // Delete Button Click Event
      const deleteButtons = document.querySelectorAll('.deleteButton');
      deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', function (event) {
          event.preventDefault();

          const productId = this.getAttribute('data-id');
          console.log('Product ID for deletion:', productId);

          // Esegui una chiamata DELETE all'API per cancellare il prodotto
          fetch(apiUrl + productId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM'
            }
          })
            .then(response => {
              if (response.ok) {
                console.log('Prodotto cancellato con successo');
                // Rimuovi l'elemento della card dall'interfaccia utente
                const cardElement = this.closest('.card');
                cardElement.remove();
              } else {
                console.error('Errore durante la cancellazione del prodotto:', response.status);
              }
            })
            .catch(error => {
              console.error('Errore durante la cancellazione del prodotto:', error);
            });
        });
      });

      // Gestione evento di invio del form per il nuovo prodotto
      const newProductForm = document.getElementById('newProductForm');
      if (newProductForm) {
        newProductForm.addEventListener('submit', function (event) {
          event.preventDefault(); // Evita il comportamento predefinito di invio del modulo

          // Ottieni i valori dai campi di input del form
          const productName = document.getElementById('newProductName').value;
          const productDescription = document.getElementById('newProductDescription').value;
          const imgUrl = document.getElementById('newImgUrl').value;
          const brand = document.getElementById('newBrand').value;
          const price = document.getElementById('newPrice').value;

          // Crea un oggetto con i dati del form
          const formData = {
            name: productName,
            description: productDescription,
            imageUrl: imgUrl,
            brand: brand,
            price: price
          };

          // Esegui una chiamata POST all'API per aggiungere un nuovo prodotto
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ3NDI2NzYxNDAwMTgzYzJlYjAiLCJpYXQiOjE3MDI0ODUyNjcsImV4cCI6MTcwMzY5NDg2N30.kmyZ2iKvlr5_Jt2FVHFyFs06NDcRUtjwqepoAyxYjzM'
            },
            body: JSON.stringify(formData)
          })
            .then(response => response.json())
            .then(newProduct => {
              console.log('Nuovo prodotto aggiunto con successo:', newProduct);
              // Puoi fare qualcos'altro dopo l'aggiunta del nuovo prodotto, ad esempio aggiornare l'interfaccia utente o reindirizzare l'utente.
              location.reload();
              // Puoi anche ripristinare il form dopo l'inserimento dei dati
              newProductForm.reset();
            })
            .catch(error => {
              console.error('Errore durante l\'aggiunta del nuovo prodotto:', error);
            });
        });
      }
    })
    .catch(error => console.error('Errore durante la richiesta:', error));
});