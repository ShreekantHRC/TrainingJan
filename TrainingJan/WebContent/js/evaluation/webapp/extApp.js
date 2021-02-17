Ext.onReady(function() {
	var windowWidth = Ext.getBody().getViewSize().width;
	var windowHeight25 = (Ext.getBody().getViewSize().height)/5;
	var windowHeight75 = (windowHeight25)*2.45;
	var numberOfRecords= 10;
	
	Ext.override(Ext.Window, {
	    closeAction: 'hide'
	})
	
	var languages = Ext.create( 'Ext.data.Store',{
		fields: ['value', 'text'],
		data: [
			{"value":"1", "text":'English'},
			{"value":"2", "text":'Italian'},
			{"value":"3", "text":'Japanese'},
			{"value":"4", "text":'Mandarin'},
			{"value":"5", "text":'German'}
		],
	});
		
	var track = Ext.create('Ext.data.Store', {
	    fields: ['abbr', 'name'],
	    data : [
	        {"abbr":"ENG", "name":"English"},
	        {"abbr":"HIN", "name":"Hindi"},
	        {"abbr":"ENG - US", "name":"English - US"},
	        {"abbr":"KOR", "name":"Korean"},
	        {"abbr":"ESP", "name":"Spanish"},
	        {"abbr":"FRA", "name":"French"}
	    ]
	});
	
	var modelSet = Ext.define('User', {
	    extend: 'Ext.data.Model',
	    fields: [
	        {name: 'filmId',  type: 'int'},
	        {name: 'title',  type: 'string'},
	        {name: 'description',  type:'string'},
	        {name: 'releaseYear', type: 'date',convert: null},
	        {name: 'language', type: 'string'},
	        {name: 'genre', type: 'string'},
	        {name: 'rating', type: 'string'},
	        {name: 'specialFeature', type: 'string'}]
	});
	
	var staticStore = Ext.create('Ext.data.Store', {	
		model:'User',
		storeId:'employeeStore',
		autoLoad: true,
		pageSize: numberOfRecords,
		proxy: { 
			type:'ajax',
			url:'http://localhost:8080/TrainingJan/dataFetch',
			enablePaging:true, 
//		    method: 'GET',          
			reader:{
				type:'json',
				rootProperty:'movies',
				totalProperty:'total'
			}
		},
		
	});
	
	var editButton = Ext.create('Ext.button.Button',{
		  text: 'Edit',
	      tooltip: 'Edit',
	      width:100,
	      id:'editButton',
	      disabled:true,
	      iconCls: 'x-fa fa-edit',
	      listeners: {
	                click: function() {
	                	editMovie.show()
	          }
	      }
	})

	var addButton=Ext.create('Ext.button.Button',{
	      text: 'Add',
	      itemId:'addButton',
	      iconCls:'x-fa fa-plus',
	      width:100,
	      tooltip:'Add',
	      listeners: {
	    	  	click: function() {
	    	  		addMovie.show();
	    	  	}
	      }
	})
	
	var deleteButton=Ext.create('Ext.button.Button',{
			text:'Delete',
			width:100,
			id:'deleteButton',
			disabled:true,
			tooltip:'Delete',
			iconCls:'x-fa fa-trash',
				listeners:{
					click:function(){
						var dataFields="";
						var titleFields="";
						if(Ext.getCmp('testGrid').getSelectionModel().getSelection().length>0){
							var length=Ext.getCmp('testGrid').getSelectionModel().getSelection().length;
							var gridData =Ext.getCmp('testGrid').getSelectionModel().getSelection();
							for(i=0;i<length;i++){
							    if(dataFields==""){
							    dataFields=gridData[i].data.filmId;
							    }else{
							    dataFields=dataFields+","+gridData[i].data.filmId;
							    } 
							    if(titleFields==""){
							    	titleFields=gridData[i].data.title;
							    }else{
							    	titleFields=titleFields+", "+gridData[i].data.title;
							    }
							}
						}
						console.log(dataFields);
						console.log(titleFields);
						var textResp = 'Are you sure you want to delete entry for - ' +titleFields; 
						Ext.Msg.show({title:'Delete', message:textResp,
							buttons:Ext.Msg.YESNO,
							icon:Ext.Msg.Question,
							fn:function(btn){
								if(btn=='yes'){
									Ext.Ajax.request({
		        					    url: 'http://localhost:8080/TrainingJan/deleteOneMovie',
		        					    method: 'GET',          
		        					    params: {
		        					    	uFilmId:dataFields,
		        					    },
		        					    success: function(){console.log('Success');Ext.MessageBox.alert('Success ', 'Data Deleted Successfully !');},
		        					    failure: function(){console.log('failure');Ext.MessageBox.alert('Failure ', 'Error while deleting !');}
		        					});
									Ext.getCmp('testGrid').getStore().load();	
									console.log("Loading again");
								}else{
									console.log("Pressed No in delete");
								}
							}}).setSize(500);
					}
				}
	});
	
	var addMovie = new Ext.Window(
			{
		    	title:'Edit Film Details',
		        layout: {
		        	type:'vbox',
		        	align:'center',
		        		pack:'middle',
		        },
		        width: 500,
		        height: 625,
		        items :[{
        					xtype:'textfield',
        					fieldLabel: 'New Title',
        					name: 'last',
        					width:400,
        					value:'New Movie Title',
        					id:'addTitle',
        					allowBlank: false
        				},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'numberfield',
		        	        anchor: '100%',
		        	        name: 'rYear',
		        	        id:'addRelYear',
		        	        fieldLabel: 'New Release year ',
		        	        minValue: 1970,
		        	        maxValue: 2021,
		        	        width:400,
		        	        value:2020,
        					allowBlank: false,
		        	        keyNavEnabled:true,
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Language',
				    	    width:400,
				    	    store:languages,
				    	    id: 'addlangCombo',
				    	    queryMode:'local',
				    	    value:'English', 	
				    	    allowBlank: false,
				    	    displayField: 'text',
							valueField: 'value',
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Rating',
				    	    width:400,
				    	    id: 'addratingCombo',
				    	    value:'PG',
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	    		data: [
				    	    			[1, 'G'],
				    	    			[2, 'NC-17'],
				    	    			[3, 'PG'],
				    	    			[4, 'PG-13'],
				    	    			[5, 'R'],
				    	    			],
				    	    		
				    	    		fields: ['value', 'text'],
				    	    		displayField: 'text',
    								valueField: 'value',
				    	    })
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Special Features',
				    	    width:400,
				    	    value:'Trailers',
				    	    id: 'addfeatureCombo',
				    	    multiSelect:true,
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	    		data: [
				    	    			[1, 'Trailers'],
				    	    			[2, 'Commentaries'],
				    	    			[3, 'Deleted Scenes'],
				    	    			[4, 'Behind the scenes'],
				    	    			],
				    	    		fields: ['value', 'text'],
				    	    		displayField: 'text',
    								valueField: 'value',
				    	    })
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
        					xtype:'textarea',
        					fieldLabel: 'New Description',
        					name: 'last',
        					id:'addDesc',
        					value:'A Fantastic new movie',
        					align:'center',
        					pack:'middle',
        					width:400,
        					height:100,
        					allowBlank: false
        				},{
		        			xtype:'tbspacer',
		        			height:50
		        		},{
		        			layout: {
		    		        	type:'hbox',
		    		        	align:'center',
		    		        	columnWidth:'0.5',	
		    		        	flex:1,
		    		        },
		    				border:0,
		    		        items:[
			        			{
				        			xtype:'button',
				        			text:' Save ',	
				        			width : 100,
				        			listeners: {
				        				click: function() {
				        					var addTitle = Ext.getCmp('addTitle').getValue();
				        					var addRelYear = Ext.getCmp('addRelYear').getValue();
				        					var addDesc = Ext.getCmp('addDesc').getValue();
				        					var addSpecialFeatures = Ext.getCmp('addfeatureCombo').getValue();
				        					var addRating = Ext.getCmp('addratingCombo').getValue();
				        					var addLang = Ext.getCmp('addlangCombo').getValue();
				        					var choiceAddLang;
				        					if(addLang=='English' || addLang=='1'){
				        						choiceAddLang=1;
				        					}else if(addLang=='Italian' || addLang=='2'){
				        						choiceAddLang=2;
				        					}else if(addLang=='Japanese' || addLang=='3'){
				        						choiceAddLang=3;
				        					}else if(addLang=='Mandarin' || addLang=='4'){
				        						choiceAddLang=4;
				        					}else if(addLang=='German' || addLang=='5'){
				        						choiceAddLang=5;
				        					}
				        					console.log("language in add ", addLang);
				        					addSpecialFeatures=addSpecialFeatures.join(",")
				        					console.log(addSpecialFeatures);
				        					Ext.Ajax.request({
				        					    url: 'http://localhost:8080/TrainingJan/addMovie',
				        					    method: 'POST',          
				        					    params: {
				        					    	uTitle:addTitle,
				        					    	uDesc:addDesc,
				        					    	uLang:choiceAddLang,
				        					    	uSpec:addSpecialFeatures,
				        					    },
				        					    success: function(){console.log('Success');Ext.MessageBox.alert('Success ', 'Data Added Successfully !');},
				        					    failure: function(){console.log('failure');Ext.MessageBox.alert('Failure ', 'Error Occured while adding !');}
				        					});

											Ext.getCmp('testGrid').getStore().load();	
											console.log("Loading again");
				        					addMovie.close();
				        				}
				        			}
				        		},{
				        			xtype:'tbspacer',
				        			width:50
				        		},
				        		{
				        			xtype:'button',
				        			text:' Cancel ',
				        			width : 100,
				        			listeners: {
				        				click: function() {
				        					addMovie.close();
				        				}
				        			}
				        		},
				        		],}
		        		],
		    });

	var editMovie = new Ext.Window(
		    {
		    	title:'Edit Film Details',
		        layout: {
		        	type:'vbox',
		        	align:'center',
		        		pack:'middle',
		        },
		        width: 500,
		        height: 625,
		        items :[{
        					xtype:'textfield',
        					fieldLabel: 'New Title',
        					name: 'last',
        					width:400,
        					id:'newTitle',
        					allowBlank: false
        				},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'numberfield',
		        	        anchor: '100%',
		        	        name: 'rYear',
		        	        id:'newRelYear',
		        	        fieldLabel: 'New Release year ',
		        	        minValue: 1970,
		        	        maxValue: 2021,
		        	        width:400,
		        	        keyNavEnabled:true,
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Language',
				    	    width:400,
				    	    store:languages,
				    	    id: 'langCombo',
				    	    queryMode:'local',
				    	    allowBlank: false,
				    	    displayField: 'text',
							valueField: 'value',
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Rating',
				    	    width:400,
				    	    id: 'ratingCombo',
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	    		data: [
				    	    			[1, 'G'],
				    	    			[2, 'NC-17'],
				    	    			[3, 'PG'],
				    	    			[4, 'PG-13'],
				    	    			[5, 'R'],
				    	    			],
				    	    		
				    	    		fields: ['value', 'text'],
				    	    		displayField: 'text',
    								valueField: 'value',
				    	    })
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'New Special Features',
				    	    width:400,
				    	    id: 'featureCombo',
				    	    multiSelect:true,
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	    		data: [
				    	    			[1, 'Trailers'],
				    	    			[2, 'Commentaries'],
				    	    			[3, 'Deleted Scenes'],
				    	    			[4, 'Behind the scenes'],
				    	    			],
				    	    		
				    	    		fields: ['value', 'text'],
				    	    		displayField: 'text',
    								valueField: 'value',
				    	    })
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
        					xtype:'textarea',
        					fieldLabel: 'New Description',
        					name: 'last',
        					id:'newDesc',
        					align:'center',
        					pack:'middle',
        					width:400,
        					height:100,
        					allowBlank: false
        				},{
		        			xtype:'tbspacer',
		        			height:50
		        		},{
		        			layout: {
		    		        	type:'hbox',
		    		        	align:'center',
		    		        	columnWidth:'0.5',	
		    		        	flex:1,
		    		        },
		    				border:0,
		    		        items:[
			        			{
				        			xtype:'button',
				        			text:' Save ',	
				        			width : 100,
				        			listeners: {
				        				click: function() {
				        					var userTitle = Ext.getCmp('newTitle').getValue();
				        					var userRelYear = Ext.getCmp('newRelYear').getValue();
				        					var userDesc = Ext.getCmp('newDesc').getValue();
				        					var userSpecialFeatures = Ext.getCmp('featureCombo').getValue();
				        					var userRating = Ext.getCmp('ratingCombo').getValue();
				        					var userLang = Ext.getCmp('langCombo').getValue();
				        					var choiceLang;
				        					if(userLang=='English'){
				        						choiceLang=1;
				        					}else if(userLang=='Italian'){
				        						choiceLang=2;
				        					}else if(userLang=='Japanese'){
				        						choiceLang=3;
				        					}else if(userLang=='Mandarin'){
				        						choiceLang=4;
				        					}else if(userLang=='German'){
				        						choiceLang=5;
				        					}	
				        					var userfilmId= Ext.getCmp('testGrid').getSelectionModel().getSelection()[0].data.filmId;
				        					
				        					Ext.Ajax.request({
				        					    url: 'http://localhost:8080/TrainingJan/updateMovie',
				        					    method: 'POST',          
				        					    params: {
				        					    	uTitle:userTitle,
				        					    	uDesc:userDesc,
				        					    	uLang:choiceLang,
				        					    	uSpec:userSpecialFeatures,
				        					    	uFilmId:userfilmId,
				        					    },
				        					    success: function(){console.log('Success');Ext.MessageBox.alert('Success ', 'Data Updated Successfully !');},
				        					    failure: function(){console.log('failure');Ext.MessageBox.alert('Failure ', 'Error while saving !');}
				        					});

											Ext.getCmp('testGrid').getStore().load();	
											console.log("Loading again");
				        					editMovie.close();
				        				}
				        			}
				        		},{
				        			xtype:'tbspacer',
				        			width:50
				        		},
				        		{
				        			xtype:'button',
				        			text:' Cancel ',
				        			width : 100,
				        			listeners: {
				        				click: function() {
				        					editMovie.close();
				        				}
				        			}
				        		},
				        		],}
		        		],
		    });

	var grid = Ext.create('Ext.grid.Panel', {
		store: Ext.data.StoreManager.lookup('employeeStore'),
		plugins: 'gridfilters',
		//bodyPadding: 10,
		title:'Movie Grid',
		
		toggleOnClick:true,
		columns: [
					{text: 'Title',  dataIndex:'title', editor:'textfield',cellWrap: true,flex: 20/100,sortable : true},
					{text: 'Genre',  dataIndex:'genre',cellWrap: true,flex: 15/100,sortable : true},
					{text: 'Description',  dataIndex:'description', editor:'textfield',cellWrap: true,flex: 35/100,sortable : false},
					{text: 'Release Year',  dataIndex:'releaseYear', editor:'textfield',flex: 10/100,sortable : true},
					{text: 'Language',  dataIndex:'language', editor:'textfield',flex: 15/100,sortable : true},
					{text: 'Rating',  dataIndex:'rating',cellWrap: true,flex: 5/100,sortable : true},
					{text: 'Special Feature',  dataIndex:'specialFeature',cellWrap: true,flex: 15/100,sortable : false}
				],
		id:'testGrid',
		width: windowWidth,
		forceFit: true,
		maxHeight : windowHeight75,
		showHeaderCheckbox:false,
		selModel:{
				injectCheckbox:'first',
				//checkOnly:true,
				model:'SIMPLE',
				type:'checkboxmodel'
		},
		listeners:{
			rowclick: function() {
				var select = Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0];
				console.log(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection().length);
				if(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection().length == 1){
					Ext.getCmp('deleteButton').enable();
					Ext.getCmp('editButton').enable();
					Ext.getCmp('newTitle').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.title);
					Ext.getCmp('newRelYear').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.releaseYear);
					Ext.getCmp('newDesc').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.description);
					Ext.getCmp('featureCombo').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.specialFeature);
					Ext.getCmp('ratingCombo').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.rating);
					Ext.getCmp('langCombo').setValue(Ext.getCmp('testGrid').getView().getSelectionModel().getSelection()[0].data.language);
				}else{
					Ext.getCmp('editButton').disable();
				}
			}
		},
		dockedItems:[
						{
							xtype:'pagingtoolbar',
							store: staticStore,
							dock:'top',
							inputItemWidth:'3em',
							displayMsg:'Displaying {0} - {1} of {2}',
							emptyMsg:'No records to display',
							displayInfo: 'true',
							border:0,
							id:'paginationToolbar',
							items:[{
												xtype:'tbspacer',
												width:12.5
											},{xtype:'tbseparator'},{
												xtype:'tbspacer',
												width:12.5
											},{
												xtype:'textfield',
												label:'Title Search ',
												emptyText: 'Search..',
												width: 150,
											},{
												xtype:'tbspacer',
												width:12.5
											},{xtype:'tbseparator'},
											{
												xtype:'tbspacer',
												width:12.5
											},addButton,{
												xtype:'tbspacer',
												width:12.5
											},{xtype:'tbseparator'},{
												xtype:'tbspacer',
												width:12.5
											},editButton,{
												xtype:'tbspacer',
												width:12.5
											},{xtype:'tbseparator'},{
												xtype:'tbspacer',
												width:12.5
											},deleteButton
									]
					}],		
		});

	var filterPanel = Ext.create('Ext.panel.Panel', {
	    title: 'Movie Advance Search',
	    width: windowWidth,
	    height:285,
	    layout: {
	    	type: 'hbox',
	    	align: 'middle',
	    	pack: 'center'
	    },
    		items:[{
    				xtype:'panel',
    				frame:false,
    				border:0,
    				layout:'vbox',
    					items:[{
        						xtype: 'textfield',
        						fieldLabel: 'Movie Name ',
        						name: 'fname',
        						allowBlank: false,
        						emptyText:'Enter the name of the movie',
        						fieldStyle: 'text-align: center;',
        						//padding: '50 0 50 200',
        						width:400
        					},	
        					{
        						xtype:'tbspacer',
        						height:50
        					},
        					{ 
        						xtype: 'datefield',
        						fieldLabel: 'Release Year',
        						//padding: '150 0 0 -400',
        						id: 'rYear',
        						emptyText:'When was it released ?',
        						width:400,
        						pack:'center',
        					    fieldStyle: 'text-align: center;',

        						allowBlank: false,
        			            //startDate : '1970-01-01'
        					},
        					   
        					]
    				},{
    					xtype:'tbspacer',
    					width:300
    				},{
    					xtype:'panel',
    					frame:false,
    					border:0,
    					layout:'vbox',
    					items:[
    							{
    								fieldLabel: 'Director Name ',
    								//padding: '50 200 10 250',
    								xtype: 'textfield',
    								emptyText:'Who is the director ?',
    								id: 'dName',
    								width:400,
    								fieldStyle: 'text-align: center;',
    								allowBlank: false
    							},{
    								xtype:'tbspacer',
    								height:50
    							},{
    								fieldLabel: 'Language',
    								//	padding: '150 200 0 -600',
    								xtype: 'combobox',
    								store:track,
    								emptyText:'And the language ?',
    								displayField: 'name',
    								valueField: 'abbr',
    								id: 'myCombobox',
    								forceSelection:true,
    								 editable: true, 
    								queryMode:'local',
    								fieldStyle: 'text-align: center;',
    								forceSelection: false,
    								multiSelect: false,
    								typeahead: true,
    								width:400,
    							},   
    						]
    				}
    			], 
    })

    var newPanel=Ext.create('Ext.Container', {
        		padding: '5 5 5 5',
        		layout:{
        			type  : 'hbox',
        			pack  : 'center',
        			align : 'middle'
        		},
        		margin : '15 0 15 0',
        		title: 'Buttons', 
        		items: [{
            					xtype:'button',
            					text:'Search',
            					width:115,
            					padding: '8 28 8 28',
            					//margin : '0 40 0 0',
            					listeners: {
            						click: function() {
            							console.log(Ext.getCmp('testGrid').getSelectionModel().select(0));
            							Ext.MessageBox.alert('Searching in Grid', ' Coming Soon !');
            						}
            					}
            				},{
            					xtype:'tbspacer',
            					width:40
            				},
            				{
            					xtype:'button',
            					text:'Reset',
            					width:115,
            					padding: '8 28 8 28',
            					//margin : '0 0 0 40',
            					listeners: {
            						click: function() {
            							Ext.Msg.show({title:'Reset', message:'Do you want to reset the fields?',
            									buttons:Ext.Msg.YESNO,
            									icon:Ext.Msg.Question,
            									height:150,
            									width:150,
            									fn:function(btn){
            										if(btn=='yes'){
            											filterPanel.down('textfield[name=fname]').reset();
            											Ext.getCmp('dName').reset();
            											Ext.getCmp('myCombobox').setValue(null);
            											Ext.getCmp('rYear').reset();
            											
            										}else{
            											console.log("Pressed No in reset");
            											console.log("Values in reset");
            											console.log("Name of the movie "+ filterPanel.down('textfield[name=fname]').getValue() + 
            											" Name of the director "+Ext.getCmp('dName').getValue() + 
            											" Language "+Ext.getCmp('myCombobox').getValue() + 
            											" Release Year "+Ext.getCmp('rYear').getValue());
            										}
            									}}).setSize(200);
            							
            		                    
            						}
            					}
        				}
        				],	
			});

	var finalPanel=Ext.create('Ext.container.Container', {
					title:'Employee Management System',
					//padding: '5 5 5 5',
					layout:{
						type  : 'vbox',
						pack  : 'center',
						align : 'middle'
					},
					title: 'Bottom', 
					items: [filterPanel,newPanel,grid],
					renderTo: Ext.getBody(),	
				});	
	});