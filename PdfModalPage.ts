import { Component,ViewChild, ChangeDetectorRef,ElementRef } from '@angular/core';
import {  NavController, NavParams, Platform, AlertController, ViewController , Gesture, Content} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-pdf-modal',
  templateUrl: 'pdf-modal.html',
})
export class PdfModalPage {
  
 @ViewChild(Content) content: Content;
  @ViewChild('zoom') zoom: ElementRef;

  constructor() {}

  ionViewDidEnter(): void {
    // Page must be fully rendered, ionViewDidLoad, doesnt work for this. Because it shows clientHeight without the margin of the header
    this._pinchZoom(this.zoom.nativeElement, this.content);
  }

  private _pinchZoom(elm: HTMLElement, content: Content): void {
    const _gesture = new Gesture(elm);
    let ow = 0;
    let oh = 0;
    for (let i = 0; i < elm.children.length; i++) {
      let c = <HTMLElement>elm.children.item(i);
      ow = c.offsetWidth;
      oh += c.offsetHeight;
    }
    const original_x = content.contentWidth - ow;
    const original_y = content.contentHeight - oh;
    let max_x = original_x;
    let max_y = original_y;
    let min_x = 0;
    let min_y = 0;
    let x = 0;
    let y = 0;
    let last_x = 0;
    let last_y = 0;
    let scale = 1;
    let base = scale;
    
    _gesture.listen();
    _gesture.on('pan', onPan);
    _gesture.on('panend', onPanend);
    _gesture.on('pancancel', onPanend);
    // _gesture.on('tap', onTap);
    _gesture.on('pinch', onPinch);
    _gesture.on('pinchend', onPinchend);
    _gesture.on('pinchcancel', onPinchend);

    function onPan(ev) {   
      setCoor(ev.deltaX, ev.deltaY);
      transform();
    }
    function onPanend() {
      // remembers previous position to continue panning.
      last_x = x;
      last_y = y;
    }
    function onTap(ev) {
      if (ev.tapCount === 2) {
        let reset = false;
        scale += .5;
        if (scale > 2) {
          scale = 1; //1
          reset = true;
        }
        setBounds();
        reset ? transform(max_x/2, max_y/2) : transform();
      }
    }
    function onPinch(ev) {
      // formula to append scale to new scale
      scale = base + (ev.scale * scale - scale)/scale

      setBounds();
      transform();
    }
    function onPinchend(ev) {
      if (scale > 4) {
       scale = 4;
      }
      if (scale < 0.5) {
        scale = 0.5;
      }
      // lets pinch know where the new base will start
      base = scale;
     setBounds();
     transform();
    }
    function setBounds() {
      // I am scaling the container not the elements
      // since container is fixed, the container scales from the middle, while the
      // content scales down and right, with the top and left of the container as boundaries
      // scaled = absolute width * scale - already set width divided by 2;
      let scaled_x = Math.ceil((elm.offsetWidth * scale - elm.offsetWidth) / 2);
      let scaled_y = Math.ceil((elm.offsetHeight * scale - elm.offsetHeight) / 2);
      // for max_x && max_y; adds the value relevant to their overflowed size
      let overflow_x = Math.ceil(original_x * scale - original_x); // returns negative
      let overflow_y = Math.ceil(oh * scale - oh);
      
      setCoor(-scaled_x, scaled_y);
  
    }
    function setCoor(xx: number, yy: number) {
      x = Math.min(Math.max((last_x + xx), max_x), min_x);
      y = Math.min(Math.max((last_y + yy), max_y), min_y);
    }
    // xx && yy are for resetting the position when the scale return to 1.
    function transform(xx?: number, yy?: number) {
      elm.style.webkitTransform = `translate3d(${xx || x}px, ${yy || y}px, 0) scale3d(${scale}, ${scale} , 1)`;
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }



}
