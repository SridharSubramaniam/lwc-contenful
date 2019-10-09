import { buildCustomElementConstructor } from 'lwc';
import MyApp from 'my/app';
import Contentful from 'contentful/entries';

customElements.define('contentful-entries', buildCustomElementConstructor(Contentful));
