import cssData from './fcf-host.css';

window.customElements.define('fcf-host', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      this.render();
      console.log('fcf-host loaded');
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <button>Start a Game</button>
      `;

      this.shadowRoot.querySelector('button').addEventListener('click', function(evt){

        // Simulating call to firebase.
        // Todo: Add call to datastore object that does the following...
        // - Generate session hash and set firebase bucket
        // - Populate empty bucket with json object below
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail: {
              target: '.',
              payload: {
                questions: [],
                players: {
                },
                state: {
                	responses: {
                	},
                	navigation: 'host'
                }
              }
          }
        }));
      }.bind(this));
    }
});