document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for the recipe
    const recipeData = {
      title: 'French Fries',
      ingredients: ['Potatoes', 'Salt', 'Oil'],
      instructions: '1. Peel and cut potatoes into fries.\n2. Fry in hot oil until golden brown.\n3. Sprinkle salt and serve.'
    };
  
    // Dummy data for comments
    const commentsData = [
      { author: 'John', text: 'These fries are amazing!' },
      { author: 'Alice', text: 'I love the crispy texture!' },
    ];
  
    // Display the recipe
    const recipeContent = document.getElementById('recipe-content');
    recipeContent.innerHTML = `
      <h2>${recipeData.title}</h2>
      <p><strong>Ingredients:</strong> ${recipeData.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> ${recipeData.instructions}</p>
    `;
  
    // Display comments
    const commentsList = document.getElementById('comments-list');
    commentsData.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment';
      commentItem.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      commentsList.appendChild(commentItem);
    });
  
    // Handle comment submission
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const commentInput = document.getElementById('comment');
      const commentText = commentInput.value.trim();
  
      if (commentText) {
        // Assume you have a backend API endpoint for adding comments
        try {
          const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author: 'Anonymous', text: commentText }),
          });
  
          if (response.ok) {
            const newComment = await response.json();
            displayComment(newComment);
          } else {
            console.error('Failed to add comment');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      commentInput.value = '';
    });
  
    // Function to display a new comment
    function displayComment(comment) {
      const commentItem = document.createElement('li');
      commentItem.className = 'comment';
      commentItem.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
      commentsList.appendChild(commentItem);
    }
  });
  