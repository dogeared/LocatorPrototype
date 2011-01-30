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

Titanium.Geolocation.purpose = "Sample";
Titanium.Geolocation.getCurrentPosition(function(e) {
  if (e.error) { Ti.API.error('geo - current position' + e.error); return; }
  var latitude = e.coords.latitude;
  var longitude = e.coords.longitude;

  Ti.API.info('geo - current position');
  Ti.API.info(' - latitude: ' + latitude);
  Ti.API.info(' - longitude: ' + longitude);

  //send my coords
  var xhr = Ti.Network.createHTTPClient();
  xhr.onload = function(e) {
    var responseData = JSON.parse(this.responseText);
    Ti.API.info('Response data: ' + responseData.result + ": " + responseData.message);

    // Get Rob's Coords
    var robLatitude = 0;
    var robLongitude = 0;
    var xhr1 = Ti.Network.createHTTPClient();
    xhr1.onload = function(e) {
      var responseData = JSON.parse(this.responseText);
      Ti.API.info('Response data: ' + responseData.result + ": " + responseData.message);

      robLatitude = parseFloat(responseData.latitude);
      robLongitude = parseFloat(responseData.longitude);

      var robLocation = Titanium.Map.createAnnotation({
          latitude: robLatitude,
          longitude: robLongitude,
          title: "Rob's Location",
          subtitle: '',
          pincolor:Titanium.Map.ANNOTATION_RED,
          animate:true,
          leftButton: '../images/appcelerator_small.png',
          myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
      });

      var micahLocation = Titanium.Map.createAnnotation({
          latitude: latitude,
          longitude: longitude,
          title: "Micah's Location",
          subtitle: '',
          pincolor:Titanium.Map.ANNOTATION_GREEN,
          animate:true,
          leftButton: '../images/appcelerator_small.png',
          myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
      });

      var boston = {latitude: 42.334537, longitude: -71.170101, latitudeDelta: 0.0001, longitudeDelta: 0.0001};
      var myLoc = {latitude: latitude, longitude: longitude, latitudeDelta: 1, longitudeDelta: 1};

      var mapView = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        region: myLoc,
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: [robLocation, micahLocation]
      });

      mapView.addEventListener('complete', function(evt) {
        Ti.API.info('in complete listener...');
      });

      mapView.addEventListener('regionChanged', function(evt) {
        Ti.API.info('in regoinChanged listener...');
      });

      win1.add(mapView);

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

      tabGroup.addTab(tab1);
      tabGroup.addTab(tab2);

      tabGroup.open();

    };
    xhr1.open('POST','http://microb.mpowerit.com:4000/getLocation');
    xhr1.send({ name: 'rob' });

  };

  xhr.open('POST','http://microb.mpowerit.com:4000/setLocation');
  xhr.send({ name: 'micah', latitude: latitude, longitude: longitude });
});
