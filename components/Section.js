export default class Section {
  constructor({renderedItems, renderer}, containerSelector){
    this._renderedItems = renderedItems
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }
  clear() {
    this._container.innerHTML = ""
  }

  renderAll() {
    this.clear();
    this._renderedItems.forEach(item => {
      const itemElement = this._renderer(item);
      this.addItem(itemElement)
    });
  }
  addItem(item){
    this._container.prepend(item)
  }
}
