const postContainer = document.querySelector('.post-container');
const createPostBtn = document.querySelector('#create-btn');
const publishPostBtn = document.querySelector('.modal-footer button[data-bs-dismiss="modal"]');
const postHeadingInput = document.querySelector('#Enter-Your-heading');
const postBodyInput = document.querySelector('#Enter-Your-Blog-Post');

let posts = [];

// function to render all the posts 
function renderPosts() {
  postContainer.innerHTML = '';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'card mb-4';
    postElement.innerHTML = `
      <div class="card-header">
        <h5 class="card-title">${post.heading}</h5>
      </div>
      <div class="card-body">
        <p class="card-text">${post.body}</p>
        <button class="btn btn-outline-light edit-post-btn" data-index="${index}">Edit Post</button>
        <button class="btn btn-outline-light delete-post-btn" data-index="${index}">Delete Post</button>
        <div class="post-info">Created at: ${new Date().toLocaleString()}</div>
      </div>
    `;
    
    postElement.style.backgroundColor="black";
    postElement.style.color="white";
    postElement.style.border="1px solid #E3E3E3"
    
    postContainer.appendChild(postElement);
  });
}

// function to add a new post
function addPost() {
  const heading = postHeadingInput.value;
  const body = postBodyInput.value;
  posts.push({ heading, body });
  postHeadingInput.value = '';
  postBodyInput.value = '';
  renderPosts();
}

// function to update an existing post
function updatePost(index, updatedHeading, updatedBody) {
  posts[index].heading = updatedHeading;
  posts[index].body = updatedBody;
  renderPosts();
}

// function to delete a post
function deletePost(index) {
  posts.splice(index, 1);
  renderPosts();
}

// event listener for creating a new post
createPostBtn.addEventListener('click', () => {
  postHeadingInput.value = '';
  postBodyInput.value = '';
});

// event listener for publishing a new post
publishPostBtn.addEventListener('click', () => {
  addPost();
});

// Event listener for edit post button
postContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-post-btn')) {
    const index = event.target.dataset.index;
    const post = posts[index];
    const editHeadingInput = document.querySelector('#edit-heading');
    const editBodyInput = document.querySelector('#edit-body');
    editHeadingInput.value = post.heading;
    editBodyInput.value = post.body;
    const saveEditPostBtn = document.querySelector('#save-edit-post-btn');
    saveEditPostBtn.dataset.index = index;
    const editPostModal = new bootstrap.Modal(document.querySelector('#editPostModal'));
    editPostModal.show();
  }
});

// Event listener for save edited post button
const saveEditPostBtn = document.querySelector('#save-edit-post-btn');
saveEditPostBtn.addEventListener('click', () => {
  const index = saveEditPostBtn.dataset.index;
  const updatedHeading = document.querySelector('#edit-heading').value;
  const updatedBody = document.querySelector('#edit-body').value;
  updatePost(index, updatedHeading, updatedBody);
  const editPostModal = bootstrap.Modal.getInstance(document.querySelector('#editPostModal'));
  editPostModal.hide();
});

//event listener for deleting a post
postContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-post-btn')) {
    const index = parseInt(event.target.dataset.index);
    deletePost(index);
  }
});