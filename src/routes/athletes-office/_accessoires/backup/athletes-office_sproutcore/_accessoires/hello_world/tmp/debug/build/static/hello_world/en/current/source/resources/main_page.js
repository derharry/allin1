// ==========================================================================
// Project:   HelloWorld - mainPage
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals HelloWorld */

// This page describes the main user interface for your application.  
HelloWorld.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'labelView buttonView checkboxView'.w(),
    
    labelView: SC.LabelView.design({
      layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
      textAlign: SC.ALIGN_CENTER,
      classNames: 'clock',
      tagName: "h1",
      valueBinding: 'HelloWorld.appController.greeting'
    }),
    
    buttonView: SC.ButtonView.design({
      layout: { centerX: 0, centerY: 50, width: 200, height: 30 },
      themeName: 'capsule',
      title: "Change Title",
      action: "toggleGreeting",
      target: "HelloWorld.appController"
    }),
    
    checkboxView: SC.CheckboxView.design({
      layout: { centerX: 0, centerY: 75, width: 200, height: 30 },
      title: "Show Clock",
      valueBinding: "HelloWorld.appController.isClockShowing"
    })
    
  })

});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('hello_world');