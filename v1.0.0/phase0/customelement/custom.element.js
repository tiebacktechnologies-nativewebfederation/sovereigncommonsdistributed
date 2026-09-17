
const { log } = console;
const TAGNAME = 'scd-partial';
const defined = !!customElements.get(TAGNAME);

if (!defined) customElements.define(TAGNAME, class PartialElement extends HTMLIFrameElement {
    
    #handleLoad(e) {
        const { contentDocument } = this;
        const content = contentDocument.querySelector('.partial.content');
        this.outerHTML = content.outerHTML;
    }
    
    handleEvent(e) {
        if (e.type === 'load') return this.#handleLoad(e);
    }
    
    connectedCallback() {
        this.addEventListener('load', this, true);
    }
    
}, { extends: 'iframe' });
