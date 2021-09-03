// JSON.stringify(source) 是为了把源码转成一行
function loader(source) {
  let style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
  return style;
}
module.exports = loader;
