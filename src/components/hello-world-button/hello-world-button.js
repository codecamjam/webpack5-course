import "./hello-world-button.scss";

class HelloWorldButton {
  //this is example of class property and
  //not supported by major browsers
  //most only allow methods inside js classes but not
  //properties
  //actually this is supported out of the box now
  //but any brand new features would probably throw an error
  //like pipeline operator
  buttonCssClass = "hello-world-button";

  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello world";
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector("body");
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };

    body.appendChild(button);
  }
}

export default HelloWorldButton;
