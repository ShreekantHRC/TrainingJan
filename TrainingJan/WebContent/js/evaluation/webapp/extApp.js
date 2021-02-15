Ext.onReady(function() {
	var windowWidth = Ext.getBody().getViewSize().width;
	var windowHeight25 = (Ext.getBody().getViewSize().height)/5;
	var windowHeight75 = (windowHeight25)*2.45;
	var numberOfRecords= 10;
	
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
			reader:{
				type:'json',
				rootProperty:'movies',
				totalProperty:'total'
			}
		},
		/*data:[
			{Title:"VANISHED GARDEN",Description:"A Intrepid Character Study of a Squirrel And a A Shark who must Kill a Lumberjack in California",ReleaseYear:"1978",Language:"HINDI",DirectorName:"Christopher Nolan"},
			{Title:"GUNFIGHTER MUSSOLINI",Description:"A Touching Saga of a Robot And a Boy who must Kill a Man in Ancient Japan",ReleaseYear:"1979",Language:"SPANISH",DirectorName:"M Night Shyamalan"},
			{Title:"MINORITY KISS",Description:"A Insightful Display of a Lumberjack And a Sumo Wrestler who must Meet a Man in The Outback",ReleaseYear:"1980",Language:"FRENCH",DirectorName:"Bradley Cooper"},
			{Title:"GHOSTBUSTERS ELF",Description:"A Thoughtful Epistle of a Dog And a Feminist who must Chase a Composer in Berlin",ReleaseYear:"1981",Language:"KOREAN",DirectorName:"Christopher Nolan"},
			{Title:"BEDAZZLED MARRIED",Description:"A Astounding Character Study of a Madman And a Robot who must Meet a Mad Scientist in An Abandoned Fun House",ReleaseYear:"1982",Language:"ENGLISH",DirectorName:"M Night Shyamalan"},
			{Title:"FORREST SONS",Description:"A Thrilling Documentary of a Forensic Psychologist And a Butler who must Defeat a Explorer in A Jet Boat",ReleaseYear:"1983",Language:"HINDI",DirectorName:"Bradley Cooper"},
			{Title:"STEPMOM DREAM",Description:"A Touching Epistle of a Crocodile And a Teacher who must Build a Forensic Psychologist in A MySQL Convention",ReleaseYear:"1984",Language:"ENGLISH",DirectorName:"Christopher Nolan"},
			{Title:"LUCK OPUS",Description:"A Boring Display of a Moose And a Squirrel who must Outrace a Teacher in A Shark Tank",ReleaseYear:"1985",Language:"HINDI",DirectorName:"M Night Shyamalan"},
			{Title:"SHIP WONDERLAND",Description:"A Thrilling Saga of a Monkey And a Frisbee who must Escape a Explorer in The Outback",ReleaseYear:"1986",Language:"SPANISH",DirectorName:"Bradley Cooper"},
			{Title:"BALLOON HOMEWARD",Description:"A Insightful Panorama of a Forensic Psychologist And a Mad Cow who must Build a Mad Scientist in The First Manned Space Station",ReleaseYear:"1987",Language:"FRENCH",DirectorName:"Christopher Nolan"},
			{Title:"SEA VIRGIN",Description:"A Fast-Paced Documentary of a Technical Writer And a Pastry Chef who must Escape a Moose in A U-Boat",ReleaseYear:"1988",Language:"KOREAN",DirectorName:"M Night Shyamalan"},
			{Title:"EFFECT GLADIATOR",Description:"A Beautiful Display of a Pastry Chef And a Pastry Chef who must Outgun a Forensic Psychologist in A Manhattan Penthouse",ReleaseYear:"1989",Language:"ENGLISH",DirectorName:"Bradley Cooper"},
			{Title:"WIFE TURN",Description:"A Awe-Inspiring Epistle of a Teacher And a Feminist who must Confront a Pioneer in Ancient Japan",ReleaseYear:"1990",Language:"HINDI",DirectorName:"Christopher Nolan"},
			{Title:"GANGS PRIDE",Description:"A Taut Character Study of a Woman And a A Shark who must Confront a Frisbee in Berlin",ReleaseYear:"1991",Language:"SPANISH",DirectorName:"M Night Shyamalan"},
			{Title:"LEGALLY SECRETARY",Description:"A Astounding Tale of a A Shark And a Moose who must Meet a Womanizer in The Sahara Desert",ReleaseYear:"1992",Language:"FRENCH",DirectorName:"Bradley Cooper"},
			{Title:"KRAMER CHOCOLATE",Description:"A Amazing Yarn of a Robot And a Pastry Chef who must Redeem a Mad Scientist in The Outback",ReleaseYear:"1993",Language:"KOREAN",DirectorName:"Christopher Nolan"},
			{Title:"BREAKING HOME",Description:"A Beautiful Display of a Secret Agent And a Monkey who must Battle a Sumo Wrestler in An Abandoned Mine Shaft",ReleaseYear:"1994",Language:"ENGLISH",DirectorName:"M Night Shyamalan"},
			{Title:"RAINBOW SHOCK",Description:"A Action-Packed Story of a Hunter And a Boy who must Discover a Lumberjack in Ancient India",ReleaseYear:"1995",Language:"HINDI",DirectorName:"Bradley Cooper"},
			{Title:"MUSSOLINI SPOILERS",Description:"A Thrilling Display of a Boat And a Monkey who must Meet a Composer in Ancient China",ReleaseYear:"1996",Language:"SPANISH",DirectorName:"Christopher Nolan"},
			{Title:"CONVERSATION DOWNHILL",Description:"A Taut Character Study of a Husband And a Waitress who must Sink a Squirrel in A MySQL Convention",ReleaseYear:"1997",Language:"FRENCH",DirectorName:"M Night Shyamalan"},
			{Title:"ANONYMOUS HUMAN",Description:"A Amazing Reflection of a Database Administrator And a Astronaut who must Outrace a Database Administrator in A Shark Tank",ReleaseYear:"1998",Language:"KOREAN",DirectorName:"Bradley Cooper"},
			{Title:"MOULIN WAKE",Description:"A Astounding Story of a Forensic Psychologist And a Cat who must Battle a Teacher in An Abandoned Mine Shaft",ReleaseYear:"1999",Language:"ENGLISH",DirectorName:"Christopher Nolan"},
			{Title:"DESTINY SATURDAY",Description:"A Touching Drama of a Crocodile And a Crocodile who must Conquer a Explorer in Soviet Georgia",ReleaseYear:"2000",Language:"HINDI",DirectorName:"M Night Shyamalan"},
			{Title:"STOCK GLASS",Description:"A Boring Epistle of a Crocodile And a Lumberjack who must Outgun a Moose in Ancient China",ReleaseYear:"2001",Language:"SPANISH",DirectorName:"Bradley Cooper"},
			{Title:"GLASS DYING",Description:"A Astounding Drama of a Frisbee And a Astronaut who must Fight a Dog in Ancient Japan",ReleaseYear:"2002",Language:"FRENCH",DirectorName:"Christopher Nolan"},
			{Title:"SORORITY QUEEN",Description:"A Fast-Paced Display of a Squirrel And a Composer who must Fight a Forensic Psychologist in A Jet Boat",ReleaseYear:"2003",Language:"KOREAN",DirectorName:"M Night Shyamalan"},
			{Title:"DREAM PICKUP",Description:"A Epic Display of a Car And a Composer who must Overcome a Forensic Psychologist in The Gulf of Mexico",ReleaseYear:"2004",Language:"ENGLISH",DirectorName:"Bradley Cooper"},
			{Title:"LUST LOCK",Description:"A Fanciful Panorama of a Hunter And a Dentist who must Meet a Secret Agent in The Sahara Desert",ReleaseYear:"2005",Language:"HINDI",DirectorName:"Christopher Nolan"},
			{Title:"HYSTERICAL GRAIL",Description:"A Amazing Saga of a Madman And a Dentist who must Build a Car in A Manhattan Penthouse",ReleaseYear:"2006",Language:"ENGLISH",DirectorName:"M Night Shyamalan"},
			{Title:"MAGIC MALLRATS",Description:"A Touching Documentary of a Pastry Chef And a Pastry Chef who must Build a Mad Scientist in California",ReleaseYear:"2006",Language:"HINDI",DirectorName:"Bradley Cooper"},
			{Title:"ENCINO ELF",Description:"A Astounding Drama of a Feminist And a Teacher who must Confront a Husband in A Baloon",ReleaseYear:"2006",Language:"SPANISH",DirectorName:"Christopher Nolan"},
			{Title:"GORGEOUS BINGO",Description:"A Action-Packed Display of a Sumo Wrestler And a Car who must Overcome a Waitress in A Baloon Factory",ReleaseYear:"2006",Language:"FRENCH",DirectorName:"M Night Shyamalan"},
			{Title:"DROP WATERFRONT",Description:"A Fanciful Documentary of a Husband And a Explorer who must Reach a Madman in Ancient China",ReleaseYear:"2006",Language:"KOREAN",DirectorName:"Bradley Cooper"},
			{Title:"COMMANDMENTS EXPRESS",Description:"A Fanciful Saga of a Student And a Mad Scientist who must Battle a Hunter in An Abandoned Mine Shaft",ReleaseYear:"2006",Language:"ENGLISH",DirectorName:"Christopher Nolan"},
			{Title:"NEIGHBORS CHARADE",Description:"A Fanciful Reflection of a Crocodile And a Astronaut who must Outrace a Feminist in An Abandoned Amusement Park",ReleaseYear:"2006",Language:"HINDI",DirectorName:"M Night Shyamalan"},
			{Title:"METAL ARMAGEDDON",Description:"A Thrilling Display of a Lumberjack And a Crocodile who must Meet a Monkey in A Baloon Factory",ReleaseYear:"2006",Language:"SPANISH",DirectorName:"Bradley Cooper"},
			{Title:"ANNIE IDENTITY",Description:"A Amazing Panorama of a Pastry Chef And a Boat who must Escape a Woman in An Abandoned Amusement Park",ReleaseYear:"2006",Language:"FRENCH",DirectorName:"Christopher Nolan"},
			{Title:"BORN SPINAL",Description:"A Touching Epistle of a Frisbee And a Husband who must Pursue a Student in Nigeria",ReleaseYear:"2006",Language:"KOREAN",DirectorName:"M Night Shyamalan"},
			{Title:"BEHAVIOR RUNAWAY",Description:"A Unbelieveable Drama of a Student And a Husband who must Outrace a Sumo Wrestler in Berlin",ReleaseYear:"2006",Language:"ENGLISH",DirectorName:"Bradley Cooper"},
			{Title:"MATRIX SNOWMAN",Description:"A Action-Packed Saga of a Womanizer And a Woman who must Overcome a Student in California",ReleaseYear:"2006",Language:"HINDI",DirectorName:"Christopher Nolan"},
			{Title:"TEXAS WATCH",Description:"A Awe-Inspiring Yarn of a Student And a Teacher who must Fight a Teacher in An Abandoned Amusement Park",ReleaseYear:"2006",Language:"SPANISH",DirectorName:"M Night Shyamalan"},
			{Title:"APOLLO TEEN",Description:"A Action-Packed Reflection of a Crocodile And a Explorer who must Find a Sumo Wrestler in An Abandoned Mine Shaft",ReleaseYear:"2006",Language:"FRENCH",DirectorName:"Bradley Cooper"},
			{Title:"JERK PAYCHECK",Description:"A Touching Character Study of a Pastry Chef And a Database Administrator who must Reach a A Shark in Ancient Japan",ReleaseYear:"2006",Language:"KOREAN",DirectorName:"Christopher Nolan"},
			{Title:"AFFAIR PREJUDICE",Description:"A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",ReleaseYear:"2006",Language:"ENGLISH",DirectorName:"M Night Shyamalan"},
			{Title:"PHILADELPHIA WIFE",Description:"A Taut Yarn of a Hunter And a Astronaut who must Conquer a Database Administrator in The Sahara Desert",ReleaseYear:"2006",Language:"HINDI",DirectorName:"Bradley Cooper"},
			{Title:"OPEN AFRICAN",Description:"A Lacklusture Drama of a Secret Agent And a Explorer who must Discover a Car in A U-Boat",ReleaseYear:"2006",Language:"SPANISH",DirectorName:"Christopher Nolan"},
			{Title:"FISH OPUS",Description:"A Touching Display of a Feminist And a Girl who must Confront a Astronaut in Australia",ReleaseYear:"2006",Language:"FRENCH",DirectorName:"M Night Shyamalan"},
			{Title:"COMA HEAD",Description:"A Awe-Inspiring Drama of a Boy And a Frisbee who must Escape a Pastry Chef in California",ReleaseYear:"2006",Language:"KOREAN",DirectorName:"Bradley Cooper"},
			{Title:"POCUS PULP",Description:"A Intrepid Yarn of a Frisbee And a Dog who must Build a Astronaut in A Baloon Factory",ReleaseYear:"2006",Language:"ENGLISH",DirectorName:"Christopher Nolan"},
			{Title:"TADPOLE PARK",Description:"A Beautiful Tale of a Frisbee And a Moose who must Vanquish a Dog in An Abandoned Amusement Park",ReleaseYear:"2006",Language:"HINDI",DirectorName:"M Night Shyamalan"},				
			]*/
	});
	
	var addMovie = new Ext.Window(
		    {
			title:'Add new row',
		        layout: {
		        	type:'vbox',
		        	align:'center'
		        },
		        width: 500,
		        height: 400,
		        closeAction: 'hide',
		        items :[
		        		{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype:'textfield',
		        			fieldLabel: 'First Name',
		        			name: 'newfname',
		        			//padding:'40,50,20,70',
		        			allowBlank: false,
		        			width:400,
		        			//height:5
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype:'textfield',
		        			fieldLabel: 'Last Name',
		        			name: 'newlname',
		        			width:400,
		        			//height:5,
		        			allowBlank: false
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'Department',
				    	    hiddenName: 'age',
				    	    //height: ,
				    	    width:400,
				    	    id:'newCombo',
				    	    //padding:'40,50,50,70',
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	        	data: [
				    	        		[1, 'Sales'],
				    	        		[2, 'Hindi'],
				    	        		[3, 'Spanish'],
				    	        		[4, 'Italian'],
				    	        		[5, 'French'],
				    	        		[6, 'Russian'],
				    	        		[7, 'Portugese'],
				    	        		[8, 'Indonesian'],
				    	        		],
				    	        	id: 0,
				    	        	fields: ['value', 'text']
				    	    	})
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
			            xtype: 'datefield',
			            width:400,
			            id:'newdate',
			            pack  : 'center',
		 	            fieldLabel: 'Hired Date'
		        		},{
		        			xtype:'button',
		        			text:'Submit',
		        			listeners: {
		        				click: function() {
		        					Ext.MessageBox.alert('Add a new row', 'New row has been added successfully!')
		        					console.log(staticStore.add({
		        							Title:'Yeh naya title',
		        							Description:'yeh naya description',
		        							ReleaseYear:'2020-01-01',
		        							Language:'Yeh nayi bhaasha',
		        							DirectorName:'Naya director',
		        					}));
		        					console.log("store ke baad");
		        					console.log(Ext.getCmp('testGrid').getStore().load());
		        					console.log("load ke baad");
		        				}
		        			}
		        		}  
		        		],
		    });

	var editMovie = new Ext.Window(
		    {
		    	title:'Advance Search',
		        layout: {
		        	type:'vbox',
		        	align:'center'
		        },
		        width: 500,
		        height: 400,
		        //modal: true,
		        closeAction: 'hide',
		        items :[
		        		{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype:'textfield',
		        			fieldLabel: 'First Name',
		        			name: 'first',
		        			//padding:'40,50,20,70',
		        			allowBlank: false,
		        			width:400,
		        			//height:5
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype:'textfield',
		        			fieldLabel: 'Last Name',
		        			name: 'last',
		        			width:400,
		        			//height:5,
		        			allowBlank: false
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'combo',
				    	    fieldLabel: 'Department',
				    	    hiddenName: 'age',
				    	    //height: ,
				    	    width:400,
				    	    //padding:'40,50,50,70',
				    	    allowBlank: false,
				    	    store: new Ext.data.SimpleStore({
				    	    		data: [
				    	    			[1, 'Sales'],
				    	    			[2, 'Hindi'],
				    	    			[3, 'Spanish'],
				    	    			[4, 'Italian'],
				    	    			[5, 'French'],
				    	    			[6, 'Russian'],
				    	    			[7, 'Portugese'],
				    	    			[8, 'Indonesian'],
				    	    			],
				    	    		id: 0,
				    	    		fields: ['value', 'text']
				    	    })
		        		},{
		        			xtype:'tbspacer',
		        			height:20
		        		},{
		        			xtype: 'datefield',
		        			width:400,
		        			pack  : 'center',
		        			fieldLabel: 'Hired Date'
		        		},{
		        			xtype:'button',
		        			text:'Search',		        	
		        			listeners: {
		        				click: function() {
		        					Ext.MessageBox.alert('', 'Coming Soon !');
		        				}
		        			}
		        		}],
		    })

	var grid = Ext.create('Ext.grid.Panel', {
		store: Ext.data.StoreManager.lookup('employeeStore'),
		plugins: 'gridfilters',
		//bodyPadding: 10,
		title:'Movie Grid',
		columns: [
					 //{text: 'FilmId',  dataIndex:'filmId', editor:'textfield',cellWrap: true,flex: 20/100, sortable : true},
					{text: 'Title',  dataIndex:'title', editor:'textfield',cellWrap: true,flex: 20/100,sortable : false},
					{text: 'Genre',  dataIndex:'genre',cellWrap: true,flex: 15/100,sortable : false},
					{text: 'Description',  dataIndex:'description', editor:'textfield',cellWrap: true,flex: 35/100,sortable : false},
					{text: 'Release Year',  dataIndex:'releaseYear', editor:'textfield',flex: 10/100,sortable : true},
					{text: 'Language',  dataIndex:'language', editor:'textfield',flex: 15/100,sortable : false},
					{text: 'Rating',  dataIndex:'rating',cellWrap: true,flex: 5/100,sortable : false},
					{text: 'Special Feature',  dataIndex:'specialFeature',cellWrap: true,flex: 15/100,sortable : false}
				],
		id:'testGrid',
		selModel:{
				injectCheckbox:'first',
				checkOnly:true,
				model:'SIMPLE',
				type:'checkboxmodel'
		},
		listeners:{
			
		},
		tbar:[{
			xtype:'pagingtoolbar',
			displayinfo: 'true',
			//afterPageText:'of  '+Math.ceil( staticStore.proxy.data.length /  numberOfRecords),
			store: staticStore,
		},{
			xtype:'tbspacer',
			width:25
		},
			{
				xtype:'textfield',
				emptyText: 'Search..',
				width: 150,
			},
			{
				xtype:'tbspacer',
				width:25
			},
			{ xtype:'button',
			      text: 'Add',
			      itemId:'addButton',
			      iconCls:'x-fa fa-plus',
			      tooltip:'Add',
			      width:75,
			      listeners: {
			    	  	click: function() {
			    	  		addMovie.show()
			    	  	}
			      }
			},
			{
				xtype:'tbspacer',
				width:25
			},{ 
				xtype:'button',
			      text: 'Edit',
			      tooltip: 'Edit',
			      itemId:'editButton',
			      disabled:true,
			      iconCls: 'x-fa fa-edit',
			      listeners: {
			                click: function() {
			                	editMovie.show()
			          }
			      }
			},{
				xtype:'tbspacer',
				width:25
			},{
			xtype:'button',
			text:'Delete',
			itemId:'deleteButton',
			disabled:true,
			tooltip:'Delete',
			iconCls:'x-fa fa-trash',
				listeners:{
					click:function(){
								console.log("Delete")
					}
				}
			}
		],
		width: windowWidth,
		forceFit: true,
		maxHeight : windowHeight75
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