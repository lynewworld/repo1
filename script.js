document.addEventListener('DOMContentLoaded', () => {
  // … các phần xử lý ý tưởng giữ nguyên …

  // ======= Phần Search trên home.html =======
  if (window.location.pathname.endsWith('home.html')) {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('searchResults');
    // Lấy danh sách ý tưởng từ localStorage
    const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');

    function renderSearchResults(filter) {
      resultsList.innerHTML = '';
      const filtered = ideas.filter(i =>
        i.title.toLowerCase().includes(filter.toLowerCase())
      );
      if (filtered.length === 0) {
        resultsList.innerHTML = '<li>Không tìm thấy kết quả nào.</li>';
        return;
      }
      filtered.forEach(idea => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="ideas.html">${idea.title}</a>`;
        resultsList.appendChild(li);
      });
    }

    // Khởi đầu: hiển thị tất cả
    renderSearchResults('');

    // Lắng nghe nhập liệu
    searchInput.addEventListener('input', e =>
      renderSearchResults(e.target.value)
    );
  }
});
