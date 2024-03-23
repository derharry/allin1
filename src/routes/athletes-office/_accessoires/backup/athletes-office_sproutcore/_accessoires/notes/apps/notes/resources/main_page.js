// ==========================================================================
// Project:   Notes - mainPage
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Notes */

// This page describes the main user interface for your application.  
Notes.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'topView notesView'.w(),
    
    topView: SC.ToolbarView.design({
    	layout: { top: 0, left: 0, right: 0, height: 36 },
    	anchorLocation: SC.ANCHOR_TOP,
    	childViews: 'labelView addButton'.w(),
    	
    	labelView: SC.LabelView.design({
    		layout: { centerY: 0, height: 24, left: 8, width: 200 },
    		controlSize: SC.LARGE_CONTROL_SIZE,
    		fontWeight: SC.BOLD_WEIGHT,
    		value: 'Notes'
    	}),
    	
    	addButton: SC.ButtonView.design({
    		layout: { centerY: 0, height: 24, right: 12, width: 100 },
    		title: 'Add Note',
    		action: 'addNote',
    		target: 'Notos.noteController'
    	})
    }),
    
    /*
    notesView: SC.TableView.design({
    	layout: { left: 15, right: 15, top: 15, bottom: 15 },
    	columns: [
    		SC.TableColumn.create({
    			'label': 'Name',
    			width: 50
    		}),
    		SC.TableColumn.create({
    			'label': 'Age',
    			width: 50
    		})
    	]
    })
    */
    
  })

});
