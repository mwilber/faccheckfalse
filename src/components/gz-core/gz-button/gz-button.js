import cssData from './gz-button.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-button', class extends GzDataElement {
  
    constructor(){
      super();

    }
    
    connectedCallback() {
      this.render();
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <button>
          <slot></slot>
        </button>
      `;

      this.shadowRoot.querySelector('slot').addEventListener('click', function(evt){
        let setVal = this.getAttribute('set-value');

        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: this.getAttribute('databind'),
              payload: setVal
          }
        }));
      }.bind(this));
    }
});