document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ideaForm');
  const titleInput = document.getElementById('title');
  const imageInput = document.getElementById('image');
  const descInput = document.getElementById('description');
  const editIndexInput = document.getElementById('editIndex');
  const ideasList = document.getElementById('ideasList');

  let ideas = JSON.parse(localStorage.getItem('ideas') || '[]');

  function renderIdeas() {
    ideasList.innerHTML = '';
    ideas.forEach((idea, index) => {
      const item = document.createElement('div');
      item.className = 'idea-item';
      item.innerHTML = `
        <h3>${idea.title}</h3>
        <div class="idea-images">
          ${idea.images.map(url => `<img src="${url}" alt="${idea.title}">`).join('')}
        </div>
        <p>${idea.description}</p>
        <div class="idea-actions">
          <button class="edit">Sửa</button>
          <button class="delete">Xóa</button>
        </div>`;
      ideasList.appendChild(item);

      item.querySelector('.delete').onclick = () => {
        if (confirm('Bạn có chắc muốn xóa ý tưởng này?')) {
          ideas.splice(index, 1);
          saveAndRender();
        }
      };

      item.querySelector('.edit').onclick = () => {
        titleInput.value = idea.title;
        descInput.value = idea.description;
        editIndexInput.value = index;
        form.querySelector('button').textContent = 'Cập nhật ý tưởng';
      };
    });
  }

  function saveAndRender() {
    localStorage.setItem('ideas', JSON.stringify(ideas));
    renderIdeas();
    form.reset();
    editIndexInput.value = -1;
    form.querySelector('button').textContent = 'Thêm ý tưởng';
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const files = Array.from(imageInput.files);
    if (!files.length) {
      alert('Vui lòng chọn ít nhất một ảnh.');
      return;
    }
    let loaded = 0, images = [];
    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        images[idx] = reader.result;
        if (++loaded === files.length) {
          saveIdea(images);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  function saveIdea(images) {
    const title = titleInput.value;
    const description = descInput.value;
    const editIndex = parseInt(editIndexInput.value, 10);
    const newIdea = { title, images, description };
    if (editIndex >= 0) {
      ideas[editIndex] = newIdea;
    } else {
      ideas.push(newIdea);
    }
    saveAndRender();
  }

  renderIdeas();
});
