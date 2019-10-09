import { LightningElement } from 'lwc';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import LCC from 'lightning-container';

export default class Entries extends LightningElement {
    contentful_client;
    contentfulInitialized = false;
    entries=[];

    renderedCallback() {
        if (this.contentfulInitialized) {
            return;
        }
        this.contentfulInitialized = true;
        this.loadContentful();
    }

    get entries() {
        return this.entries;
    }

    handleClick(event){
        console.log(event);
        var entryId=event.currentTarget.dataset.item;
        console.log(entryId);
        this.contentful_client
        .getEntry(entryId)
        .then(entry => {
            console.log(entry);
          const rawRichTextField = entry.fields.content;

          return documentToHtmlString(rawRichTextField);
        })
        .then(renderedHtml => {
          // do something with html, like write to a file
          console.log(renderedHtml);
          var msg = {"content": renderedHtml};
          LCC.sendMessage(msg);
          //document.getElementById('rich-text-body').innerHTML = renderedHtml;
        })
        .catch(error => console.log(error));
    }

    async loadContentful() {
        var contentful = require(/* webpackChunkName: "contentful" */ 'contentful');
        var contentful_client = contentful.createClient({
          // This is the space ID. A space is like a project folder in Contentful terms
          space: 'yoszpxxrz6z3',
          // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
          accessToken: '7a39bb8e056d4bcf856c3bd728dfcf5fc4509557b44bc6ff3777c7d962789959'
        })
        this.contentful_client = contentful_client;
        console.log(contentful_client);
        var self=this;
        contentful_client.getEntries({'content_type': 'headline'})
        .then(function(response){
            self.entries=response.items;
            console.log(response.items);
        })
        .catch(console.error)
    }
}

