
const { log } = console;
const TAGNAME = 'scd-partial';
const defined = !!customElements.get(TAGNAME);

if (!defined) customElements.define(TAGNAME, class PartialElement extends HTMLIFrameElement {  // only define if not defined to avoid errors when already defined
    
    #handleLoad(e) {
        const { contentDocument } = this;
        const content = contentDocument.querySelector('.partial.content');
        this.outerHTML = content.outerHTML;  // effectively replaces this node with the content of the .partial.content element
    }
    
    handleEvent(e) {
        if (e.type === 'load') return this.#handleLoad(e);  // early return and handle
    }
    
    connectedCallback() {
        this.addEventListener('load', this, true);  // wait for content document & DOM to be established
    }
    
    disconnectedCallback() {  // run cleanups
        this.removeEventListener('load', this, true);  // avoid memory leaks
    }
    
}, { extends: 'iframe' });
