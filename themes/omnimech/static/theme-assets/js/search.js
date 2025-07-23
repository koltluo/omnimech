// 全局变量
let lunrIndex, pages;

// 初始化Lunr.js和索引
function initLunr() {
  fetch('/search/index.json') // 加载Hugo生成的JSON索引
    .then(response => response.json())
    .then(data => {
      pages = data.pages; // 保存页面数据
      lunrIndex = lunr(function() {
        this.ref('permalink'); // 引用字段，用于匹配结果
        this.field('title');   // 可搜索的字段
        this.field('content');
        pages.forEach(page => this.add(page)); // 添加数据到索引
      });
    })
    .catch(error => console.error('加载索引失败:', error));
}

// 执行搜索
function search(query) {
  if (!lunrIndex) return; // 确保索引已加载
  const results = lunrIndex.search(query); // 执行搜索
  displayResults(results); // 显示结果
}

// 显示搜索结果
function displayResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // 清空现有结果
  results.forEach(result => {
    const page = pages.find(p => p.permalink === result.ref);
    const item = document.createElement('li');
    item.innerHTML = `<a href="${page.permalink}">${page.title}</a>`;
    resultsContainer.appendChild(item);
  });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initLunr);

// 监听搜索输入
document.getElementById('search-input').addEventListener('input', function(e) {
  search(e.target.value);
});