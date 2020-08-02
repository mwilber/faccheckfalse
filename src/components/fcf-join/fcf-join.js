import cssData from './fcf-join.css';

window.customElements.define('fcf-join', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      this.render();
      console.log('fcf-join loaded');
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <button>Join a Game</button>
      `;
    }
});