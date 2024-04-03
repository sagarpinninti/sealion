sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/HBox",
    "sap/m/GenericTile",
    "sap/m/Text",
    "sap/m/Label",
    "sap/m/Image",
    "sap/ui/core/library"
], function (Controller, MessageBox, HBox, GenericTile, Text, Label, Image) {
    "use strict";

    return Controller.extend("myns.oceanus.controller.view1", {

        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel({
                items: [{
                    key: "hyperscaler",
                    text: "Hyperscaler"
                },
                {
                    key: "container",
                    text: "Container"
                },
                {
                    key: "network",
                    text: "Network"
                },
                {
                    key: "database",
                    text: "Database"
                },
                {
                    key: "applicationserver",
                    text: "Application Server"
                }
                ]
            });
            this.getView().setModel(oModel, "dropdownModel");
        },

        
        onGo: function () {
            var selectedKey = this.getView().byId("searchField").getSelectedKey();
            var selectedTileName = this.getSelectedTileName();
            var contentContainer = this.getView().byId("contentContainer");
        
            // Clear previous content
            contentContainer.removeAllItems();
        
            // Handle "Standard as Code" scenario based on selected key
            if ((selectedKey === "hyperscaler" || selectedKey === "network") && selectedTileName === "Standard as Code") {
                var filePath = selectedKey === "hyperscaler" ? "oscal/DSS.yml" : "oscal/css.yml";
                this.loadAndDisplayFile(filePath);
                return;
            }
        
            // Handle 'hyperscaler' and 'threat_analysis' scenario
            if (selectedKey === "hyperscaler" && selectedTileName === "") {
                this.showThreatAnalysisTable();
                return;
            }
        
            // Create tiles for other selections
            var hbox = this.createTiles();
            contentContainer.addItem(hbox);
        },
        
        
 
        setTableContainerHeight: function () {
            var windowHeight = $(window).height(); // Get the viewport height
            var headerHeight = this.byId("page").getHeader().$().outerHeight(true); // Get the height of the page header
            var footerHeight = this.byId("page").getFooter().$().outerHeight(true); // Get the height of the page footer
            var selectButtonContainerHeight = this.byId("selectAndButtonContainer").$().outerHeight(true); // Get the height of the select and button container
            var contentContainer = this.byId("contentContainer"); // Get the content container

            // Calculate the available height for the table container
            var availableHeight = windowHeight - headerHeight - footerHeight - selectButtonContainerHeight;

            // Set the height of the content container
            contentContainer.setHeight(availableHeight + "px");
        },

        onSearchFieldChange: function (oEvent) {
            var selectedItemKey = oEvent.getParameter("selectedItem").getKey();
            var oThreatAnalysisTable = this.getView().byId("threatAnalysisTable");

            // Show the SmartTable when "Hyperscaler" is selected
            if (selectedItemKey === "hyperscaler") {
                oThreatAnalysisTable.setVisible(true);
            } else {
                oThreatAnalysisTable.setVisible(false);
            }
        },


        getSelectedTileName: function () {
            var dropdownModel = this.getView().getModel("dropdownModel");
            var selectedKey = this.getView().byId("searchField").getSelectedKey();
            var selectedItem = dropdownModel.getProperty("/items").find(item => item.key === selectedKey);
            return selectedItem ? selectedItem.text : "";
        },

        createTiles: function () {
            var that = this; // Reference to the controller
            var hbox = new HBox({
                justifyContent: "SpaceAround"
            });
            var tileNames = ["Threat & Control Catalog", "Threat Analysis", "Threat_Landscape", "Standard", "Standard as Code", "Hardening", "BestPractise"];
            tileNames.forEach(function (name) {
                var tile = new GenericTile({
                    header: name,
                    press: function () {
                        if (name === "Threat & Control Catalog") {
                            that.showThreatAnalysisTable(); // Show the table when Threat and Control Catalog tile is clicked
                        } else if (name === "Threat Analysis") {
                            var selectedKey = that.getView().byId("searchField").getSelectedKey();
                            if (selectedKey === "container") {
                                that.showThreatLandscapeImage("img/TA.png");
                            } else {
                                MessageBox.information("Please select 'container' to view Threat Analysis.");
                            }
                        } else if (name === "Threat_Landscape") {
                            var selectedKey = that.getView().byId("searchField").getSelectedKey();
                            if (selectedKey === "container") {
                                that.showThreatLandscapeImage("img/c2c.png");
                            } else if (selectedKey === "hyperscaler") {
                                that.showThreatLandscapeImage("img/hyp.png");
                            } else {
                                MessageBox.information("You clicked on " + name);
                            }
                        } else if (name === "Standard") {
                            var selectedKey = that.getView().byId("searchField").getSelectedKey();
                            that.showObjects(selectedKey); // Pass the selected key to the function
                        } else if (name === "Standard as Code") {
                            // Load and display the file based on category
                            var selectedKey = that.getView().byId("searchField").getSelectedKey();
                            var filePath = selectedKey === "hyperscaler" ? "oscal/DSS.yml" : "oscal/css.yml";
        
                            // Clear previous content
                            var contentContainer = that.getView().byId("contentContainer");
                            contentContainer.removeAllItems();
        
                            // Create a container element
                            var container = new sap.m.VBox({
                                width: "80%" // Adjust width as needed
                            });
        
                            // Apply CSS properties
                            container.addStyleClass("fileContainer"); // Add any custom CSS classes if needed
        
                            that.loadAndDisplayFile(filePath, container);
                        } else {
                            MessageBox.information("You clicked on " + name);
                        }
                    }
                });
                tile.addStyleClass("visibleText"); // Add a CSS class to ensure text visibility
                hbox.addItem(tile);
            });
            return hbox;
        },
        
        
      
        showThreatAnalysisTable: function () {
            var contentContainer = this.getView().byId("contentContainer");
            contentContainer.removeAllItems(); // Remove all other items
        
            // Define column names
            var columnNames = [
                "Threat_ID",
                "Threat_Component_ID",
                "Threat",
                "Threat_Narrative",
                "Attack_Precondition",
                "Component",
                "Phase",
                "Attack_Path",
                "Ease_of_Attack",
                "Impact",
                "Severity",
                "Followup",
                "Comment",
                "Control_ID",
                "Control_Narration",
                "NIST800_53r5_Mapping",
                "MITRE_Tactic_ID",
                "MITRE_Technique_ID"
            ];
        
            // Create an array to store column objects
            var columns = [];
        
            // Iterate over column names to create column objects
            columnNames.forEach(function(columnName) {
                var column = new sap.ui.table.Column({
                    label: new sap.m.Label({ text: columnName }),
                    template: new sap.m.Text({ text: "{" + columnName + "}" }), // Assuming data binding path is same as column name
                    visible: true // Set default visibility
                });
                columns.push(column);
            });
        
            // Create a table
            var table = new sap.ui.table.Table({
                width: "100%",
                visibleRowCount: 15, // Adjust this number as needed to display more rows
                selectionMode: sap.ui.table.SelectionMode.None, // Disable row selection
                columns: columns
            });
        
            // Bind table rows to a model (assuming you have a model named "threatModel" containing the data)
            table.setModel(this.getView().getModel("datamodel.cds"));
            table.bindRows({
                path: "/threatinfoSet"
            });
        
            // Set CSS class to control table height
            table.addStyleClass("dynamicTableHeight");
        
            // Create column visibility checkboxes
            var columnItems = [];
            table.getColumns().forEach(function(column) {
                var labelText = "";
                var columnLabel = column.getLabel();
                // Check if label is an object with a getText method
                if (columnLabel && typeof columnLabel === "object" && typeof columnLabel.getText === "function") {
                    labelText = columnLabel.getText();
                } else if (typeof columnLabel === "string") { // Fallback for string labels
                    labelText = columnLabel;
                }
                var checkbox = new sap.m.CheckBox({
                    text: labelText, // Use column header as text
                    selected: column.getVisible(),
                    select: function(event) {
                        column.setVisible(event.getParameter("selected"));
                    }
                });
                columnItems.push(checkbox);
            });
        
            // Add column items to a HBox
            var hbox = new sap.m.HBox({
                items: columnItems
            });
        
            // Add HBox to the content container
            contentContainer.addItem(hbox);
        
            // Add table to the content container
            contentContainer.addItem(table);
        },

        showThreatLandscapeImage: function (imageSrc) {
            var contentContainer = this.getView().byId("contentContainer");
            contentContainer.removeAllItems(); // Remove all other tiles

            var image = new Image({
                src: imageSrc, // Path to the image
                width: "80%", // Set width to 100% to fit the screen
                height: "auto" // Maintain aspect ratio
            });
            contentContainer.addItem(image);
        },

        showObjects: function (selectedKey) {
            var contentContainer = this.getView().byId("contentContainer");
            contentContainer.removeAllItems(); // Remove all other tiles

            // Determine the data for object1 based on the selected key
            var object1Data = "";
            if (selectedKey === "container") {
                object1Data = "title: BSI Controls for Kubernetes Profile\nversion: 1.0\nauthor: TBD\ncoauthor: TBD\napprover: XYZ\nreviewer: Sam, Ram, Peter, Lee\ncreation-date: 2024-02-21";
            } else if (selectedKey === "hyperscaler") {
                object1Data = "title: Hyperscaler Controls baseline Profile\nversion: 1.0\nauthor: TBD\ncoauthor: TBD\napprover: Danny, Tony, Sab, Tob\ncreation-date: 2024-02-22";
            }

            // Add content to object1 within a box
            // Add a CSS class for styling
            var object1Box = new sap.m.VBox({
                width: "100%"
            });
            object1Box.addStyleClass("objectBox Content"); // Add CSS class using addStyleClass method

            var object1Label = new Label({
                text: "Metadata",
                design: sap.m.LabelDesign.Bold, // Make the text bold
                style: "font-size: 110%; color: #FF9933 !important;" // Increase font size by 5% and set color to 'FF9933'
            });



            var object1Content = new Text({
                text: object1Data
            });
            object1Box.addItem(object1Label);
            object1Box.addItem(object1Content);
            contentContainer.addItem(object1Box);

            // Add padding between object1 and object2
            contentContainer.addItem(new sap.m.VBox({
                height: "5px"
            })); // Adjust the height as needed

            // Add content to object2 within a box
            // Add a CSS class for styling
            var object2Box = new sap.m.VBox({
                width: "100%"
            });
            object2Box.addStyleClass("objectBox Content"); // Add CSS class using addStyleClass method

            var object2Label = new Label({
                text: "Introduction",
                design: sap.m.LabelDesign.Bold, // Make the text bold
                style: "font-size: 110%; color: #FF9933 !important;" // Increase font size by 5% and set color to 'FF9933'
            });
            var object2Content = new Text({
                text: "this is for testing fox"
            });
            object2Box.addItem(object2Label);
            object2Box.addItem(object2Content);
            contentContainer.addItem(object2Box);

            // Add padding between object2 and object3
            contentContainer.addItem(new sap.m.VBox({
                height: "5px"
            })); // Adjust the height as needed

            // Add content to object3 within a box
            // Add a CSS class for styling
            var object3Box = new sap.m.VBox({
                width: "100%"
            });
            object3Box.addStyleClass("objectBox Content"); // Add CSS class using addStyleClass method

            var object3Label = new Label({
                text: "Object 3"
            });
            var object3Content = new Text({
                text: "Content for Object 3"
            });
            object3Box.addItem(object3Label);
            object3Box.addItem(object3Content);
            contentContainer.addItem(object3Box);
        },


        loadAndDisplayFile: function (filePath) {
            var that = this;

            // Make an asynchronous request to fetch the content of the file
            fetch(filePath)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Failed to fetch file: ' + response.status);
                    }
                    return response.text();
                })
                .then(function (data) {
                    // On success, display the content of the file
                    var contentContainer = that.getView().byId("contentContainer");
                    contentContainer.removeAllItems(); // Remove all other items

                    // Create a container element
                    var container = new sap.m.VBox({
                        width: "80%", // Adjust width as needed
                    });

                    // Apply CSS class to the container
                    container.addStyleClass("fileContainerWithMargin");

                    // Create a text control to display file content
                    var fileContent = new sap.m.Text({
                        text: data // Display the fetched content
                    });

                    // Add file content to the container
                    container.addItem(fileContent);

                    // Create a button for downloading the file
                    var downloadButton = new sap.m.Button({
                        text: "Download File",
                        press: function () {
                            // Create a Blob object from the file content
                            var blob = new Blob([data], { type: "text/plain;charset=utf-8" });

                            // Create a URL for the Blob object
                            var url = window.URL.createObjectURL(blob);

                            // Create an anchor element to trigger the download
                            var a = document.createElement("a");
                            a.href = url;
                            a.download = "file.txt"; // Set the file name
                            document.body.appendChild(a);
                            a.click();

                            // Clean up
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        }
                    });

                    // Add download button to the container
                    container.addItem(downloadButton);



                    // Add the container to the content container
                    contentContainer.addItem(container);
                })
                .catch(function (error) {
                    // Handle error if the file couldn't be fetched
                    MessageBox.error("Failed to load file: " + error.message);
                });
        }


    });
});
