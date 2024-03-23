// ==========================================================================
// Project:   Aodb - mainPage
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Aodb */

// This page describes the main user interface for your application.  
Aodb.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'workspaceView'.w(),

    workspaceView: SC.WorkspaceView.design({
      toolbarSize: 65,
      topToolbar: SC.ToolbarView.design({
      	  childViews: 'searchField selectEvent buttonEvent buttonOffice buttonContacts buttonHotel buttonRestaurant buttonShuttle buttonTodos buttonNotes'.w(),
      	  
      	  searchField: SC.TextFieldView.design({
      	  	layout: { top: 5, height: 24, centerX: 0, width: 150 },
      	  	fieldLabel: 'xx'
      	  }),
      	  
      	  selectEvent: SC.SelectView.design({
      	  	layout: { top: 5, height: 24, left: 15, width: 250 },
      	  }),
      	  
      	  buttonEvent: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 15, width: 75 },
      	  	title: 'Event'
      	  }),
      	  
      	  buttonOffice: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 95, width: 75 },
      	  	title: 'Office'
      	  }),
      	  
      	  buttonContacts: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 175, width: 75 },
      	  	title: 'Contacts'
      	  }),
      	  
      	  buttonHotel: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 255, width: 75 },
      	  	title: 'Hotel'
      	  }),
      	  
      	  buttonRestaurant: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 335, width: 100 },
      	  	title: 'Restaurant'
      	  }),
      	  
      	  buttonShuttle: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, left: 440, width: 75 },
      	  	title: 'Shuttle'
      	  }),
      	  
      	  buttonTodos: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, right: 95, width: 75 },
      	  	title: 'Todos'
      	  	target: 'Aodb.todosController',
      	  	action: 'toggleView'
      	  }),
      	  
      	  buttonNotes: SC.ButtonView.design({
      	  	layout: { bottom: 5, height: 24, right: 15, width: 75 },
      	  	title: 'Notes',
      	  	target: 'Aodb.notesController',
      	  	action: 'toggleView'
      	  })
      }),
      
      contentView: SC.ContainerView.create()
      
    })
    
  }),
  
  startView: SC.View.design({
  			childViews: 'contentView'.w(),
      		contentView: SC.LabelView.design({
	      		layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
		      		textAlign: SC.ALIGN_CENTER,
    		  		tagName: "h1", 
	    	  		value: "Welcome to Athletes Office!"
	  		})
  })
});


Aodb.toggleView = function toggleView(view, showView) {
  	view.parentView.parentView.contentView.set('nowShowing', showView);
};
