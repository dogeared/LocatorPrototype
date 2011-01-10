// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var myCoords = {
  latitude: 0,
  longitude: 0,
  altitude: 0,
  accuracy: 0,
  altitudeAccuracy: 0,
  heading: 0,
  speed: 0,
  timestamp: 0
};

Ti.Geolocation.purpose = "Sample";
Ti.Geolocation.getCurrentPosition(
  function(e) {
    if (e.error) { Ti.API.error('geo - current position' + e.error); return; }
    myCoords.latitude = e.coords.latitude;
    myCoords.longitude = e.coords.longitude;
    myCoords.altitude = e.coords.altitude;
    myCoords.accuracy = e.coords.accuracy;
    altitudeAccuracy = e.coords.altitudeAccuracy;
    myCoords.heading = e.coords.heading;
    myCoords.speed = e.coords.speed;
    myCoords.timestamp = e.coords.timestamp;
    Ti.API.info('geo - current position');
    Ti.API.info(' - latitude: ' + myCoords.latitude);
    Ti.API.info(' - longitude: ' + myCoords.longitude);
    Ti.API.info(' - altitude: ' + myCoords.altitude);
    Ti.API.info(' - accuracy: ' + myCoords.accuracy);
    Ti.API.info(' - altitudeAccuracy: ' + myCoords.altitudeAccuracy);
    Ti.API.info(' - heading: ' + myCoords.heading);
    Ti.API.info(' - speed: ' + myCoords.speed);
    Ti.API.info(' - timestamp: ' + myCoords.timestamp);
  }
);

var mapView = Ti.Map.createView({
  mapType: Ti.Map.STANDARD_TYPE,
  region: {latitude: myCoords.latitude, longitude: myCoords.longitude, latitudeDelta:0.5, longitudeDelta:0.5},
  animate:true,
  regionFit:true,
  userLocation:true
});

win1.add(mapView);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
  color:'#999',
  text:'I am Window 2',
  font:{fontSize:20,fontFamily:'Helvetica Neue'},
  textAlign:'center',
  width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();
