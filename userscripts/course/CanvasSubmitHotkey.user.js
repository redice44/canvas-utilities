// ==UserScript==
// @name         Canvas UX - Save Hotkey
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Daniel Vicotirano <victoriano518@gmail.com>
// @description  Overrides browser default action for "Ctrl + s" hotkey to submit/save the current form/page.
// @match        https://[YOUR-URL]/*
// @grant        none
// ==/UserScript==

(function() {

  function submitPage( e ) {

    const selectors = [

      'button[type="submit"]', // General 'Save' buttons
      '\.button_type_submit', // Module Item Edit
      '\.add_item_button', // Add Module Item
      '\.create_assignment', // Edit Assignment Item
      '\.submit' // Pages

    ];

    const sKeyCode = 83;
    const ctrlKey = navigator.platform.match( 'Mac' ) ? e.metaKey : e.ctrlKey;

    if ( e.keyCode === sKeyCode && ctrlKey ) {

      e.preventDefault();

      for ( let selector of selectors ) {

        let selected = document.querySelector( selector );

        if ( selected ) {

          selected.click();

          return;

        }

      }

      console.log( 'No matching Submit button found.' );

    }

  }

  function tinyMCEHandler( e ) {

    if ( tinymce ) {

      const addHandler = e => {

        console.log( `TinyMCE Editor Added with ID: ${ e.editor.id }` );

        e.editor.on( 'keydown', submitPage );

      };

      tinymce.on( 'AddEditor', addHandler );

    }

  }

  document.addEventListener( 'keydown', submitPage, false);
  window.addEventListener('load', tinyMCEHandler );

})();
