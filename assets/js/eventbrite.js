//defining the main variables and params for functions
var checkdate, custom, locate, locater, subaddress, sublonlat, subaddress, submit;

//locate function is used to determine the users current position without input
locate = function() {
  var error, latitude, longitude, output, success;
  longitude = document.getElementById('longitude').value;
  latitude = document.getElementById('latitude').value;
  output = document.getElementById('alerts');

  //if the geolocation works and browser is able to locate user
  success = function(position) {
    var longitude;
    var latitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    spinner.className = 'fa';
    return sublonlat(longitude, latitude, '10mi');
  };

  //if geolocation fails and browser is unable to locate user could be due to faulty coordinates
  error = function() {
    output.innerHTML = 'Unable to retrieve your location';
    output.className = 'alert alert-warning';
  };

  //if the browser doesnt support geoloaction
  if (!navigator.geolocation) {
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    output.className = 'alert alert-warning';
    return;
  }

  //loads the spinner while waiting for XMLHttprequest
  spinner.className = 'fa fa-ticket glyphicon-spin';
  navigator.geolocation.getCurrentPosition(success, error);
};

//Takes in a longitude, latitude and a distance which are then put into a get request that gets sent to Eventbrite API
sublonlat = function(lon, lat, distance) {
  var current, data, later, now, output, spinner;
  now = document.getElementById('events-now');
  later = document.getElementById('events-later');
  data = new XMLHttpRequest;
  current = new Date;
  output = document.getElementById('alerts');
  spinner = document.getElementById('spinner');

  //function that executes only once it has fetched all the data
  data.onreadystatechange = function() {
    var address1, city, location, description, end, enddate, endtime, eventdata, events, header, info, newevent, start, startdate, starttime, title, x, more, nowhead, laterhead;

    //takes the text file and parses it into a JSON object
    if (data.readyState === XMLHttpRequest.DONE) {
      eventdata = JSON.parse(data.response);
      events = eventdata.events;
      console.log(data.response);
      x = 0;

      //check if there actually is any data for the event that was searched
      if (events.length === 0){
        output.innerHTML = 'no events found';
        output.className = 'alert alert-warning';
      }

      //selects and prepares to organize the elements that have been found
      nowhead = document.getElementById("now-header");
      nowhead.innerHTML = "<h4>Events happening now</h4>";
      laterhead = document.getElementById("later-header");
      laterhead.innerHTML = "<h4>Events happening later</h4>"

      //iterates through the different event objects and displays them
      while (x < events.length) {
        header = document.createElement('div');
        title = events[x].name.text;
        description = events[x].description.text;
        newevent = document.createElement('div');
        info = document.createElement('div');

        startdate = new Date(events[x].start.utc);
        start = startdate.toLocaleTimeString();
        starttime = start.substr(0, start.length - 6);

        enddate = new Date(events[x].end.local);
        end = enddate.toLocaleTimeString();
        endtime = end.substr(0, end.length - 6);

        location = events[x].venue.name;

        if(events[x].venue.name != null){
          location = events[x].venue.name;
        } else {
          location = " ";
        }

        if(events[x].venue.address.address_1 != null){
          address1 = events[x].venue.address.address_1;
        } else {
          address1 = " ";
        }

        if(events[x].venue.address.address_1 != null){
          city = events[x].venue.address.city;
        } else {
          city = " ";
        }

        address = address1 + " " + city;

        //filters the objects so that only the ones happening today are displayed in this section
        if (current.toDateString().valueOf() === startdate.toDateString().valueOf()) {
          header.innerHTML = '<strong><a href=' + events[x].url + '<h5>' + title + '</a> </h5></strong>';
          header.className = 'page-header';
          info.innerHTML = '<h6>' + location + " at " + address + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'glyphicon glyphicon-calendar\')></span>' + ' ' + startdate.toDateString() + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'fa fa-clock-o\'></span>' + " " + starttime + " " + start.substr(start.length - 2, start.length) + '</h6>';
          newevent.className = 'well';
          newevent.appendChild(header);
          newevent.appendChild(info);
          now.appendChild(newevent);

        //all other events are displayed now
        } else {
          header.innerHTML = '<strong><a href=' + events[x].url + '<h5>' + title + '</a> </h5></strong';
          header.className = 'page-header';
          info.innerHTML = '<h6>' + location + " at " + address + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'glyphicon glyphicon-calendar\')></span>' + ' ' + startdate.toDateString() + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'fa fa-clock-o\'></span>' + " " + starttime + " " + start.substr(start.length - 2, start.length) + '</h6>';
          newevent.className = 'well';
          newevent.appendChild(header);
          newevent.appendChild(info);
          later.appendChild(newevent);
        }
        x++;
      }
      spinner.className = 'fa';
    }
  };
  data.open('GET', 'https://www.eventbriteapi.com/v3/events/search/?popular=on&expand=events,venue&sort_by=date&location.within=' + distance + '&location.latitude=' + lat + '&location.longitude=' + lon + '&token=6FH625HKF3TE4NTSEL3Q', true);
  data.responseType = '';
  data.send(null);
  spinner.className = 'fa fa-ticket glyphicon-spin';
};

subaddress = function(addr, distance) {
  var current, data, later, now, output, spinner;
  now = document.getElementById('events-now');
  later = document.getElementById('events-later');
  data = new XMLHttpRequest;
  current = new Date;
  output = document.getElementById('alerts');
  spinner = document.getElementById('spinner');

  //function that executes only once it has fetched all the data
  data.onreadystatechange = function() {
    var address1, city, location, description, end, enddate, endtime, eventdata, events, header, info, newevent, start, startdate, starttime, title, x, more, nowhead, laterhead;

    //takes the text file and parses it into a JSON object
    if (data.readyState === XMLHttpRequest.DONE) {
      eventdata = JSON.parse(data.response);
      events = eventdata.events;
      console.log(data.response);
      x = 0;

      //check if there actually is any data for the event that was searched
      if (events.length === 0){
        output.innerHTML = 'no events found';
        output.className = 'alert alert-warning';
      }

      //selects and prepares to organize the elements that have been found
      nowhead = document.getElementById("now-header");
      nowhead.innerHTML = "<h4>Events happening now</h4>";
      laterhead = document.getElementById("later-header");
      laterhead.innerHTML = "<h4>Events happening later</h4>"

      //iterates through the different event objects and displays them
      while (x < events.length) {
        header = document.createElement('div');
        title = events[x].name.text;
        description = events[x].description.text;
        newevent = document.createElement('div');
        info = document.createElement('div');

        startdate = new Date(events[x].start.utc);
        start = startdate.toLocaleTimeString();
        starttime = start.substr(0, start.length - 6);

        enddate = new Date(events[x].end.local);
        end = enddate.toLocaleTimeString();
        endtime = end.substr(0, end.length - 6);

        location = events[x].venue.name;

        if(events[x].venue.name != null){
          location = events[x].venue.name;
        } else {
          location = " ";
        }

        if(events[x].venue.address.address_1 != null){
          address1 = events[x].venue.address.address_1;
        } else {
          address1 = " ";
        }

        if(events[x].venue.address.address_1 != null){
          city = events[x].venue.address.city;
        } else {
          city = " ";
        }

        address = address1 + " " + city;

        //filters the objects so that only the ones happening today are displayed in this section
        if (current.toDateString().valueOf() === startdate.toDateString().valueOf()) {
          header.innerHTML = '<strong><a href=' + events[x].url + '<h5>' + title + '</a> </h5></strong>';
          header.className = 'page-header';
          info.innerHTML = '<h6>' + location + " at " + address + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'glyphicon glyphicon-calendar\')></span>' + ' ' + startdate.toDateString() + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'fa fa-clock-o\'></span>' + " " + starttime + " " + start.substr(start.length - 2, start.length) + '</h6>';
          newevent.className = 'well';
          newevent.appendChild(header);
          newevent.appendChild(info);
          now.appendChild(newevent);

        //all other events are displayed now
        } else {
          header.innerHTML = '<strong><a href=' + events[x].url + '<h5>' + title + '</a> </h5></strong';
          header.className = 'page-header';
          info.innerHTML = '<h6>' + location + " at " + address + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'glyphicon glyphicon-calendar\')></span>' + ' ' + startdate.toDateString() + '</h6>';
          info.innerHTML = info.innerHTML + '<h6><span class=\'fa fa-clock-o\'></span>' + " " + starttime + " " + start.substr(start.length - 2, start.length) + '</h6>';
          newevent.className = 'well';
          newevent.appendChild(header);
          newevent.appendChild(info);
          later.appendChild(newevent);
        }
        x++;
      }
      spinner.className = 'fa';
    }
  };
  data.open('GET', 'https://www.eventbriteapi.com/v3/events/search/?popular=on&expand=events,venue&sort_by=date&location.within=' + distance + '&location.address=' + addr + '&token=6FH625HKF3TE4NTSEL3Q', true);
  data.responseType = '';
  data.send(null);
  spinner.className = 'fa fa-ticket glyphicon-spin';
};

//function is used to see if the event is happening today
checkdate = function(date, event) {
  var curr, month, year;
  curr = new Date;
  year = curr.getFullYear() === event.getFullYear();
  month = curr.getMonth() === event.getMonth();
  if (year === true && month === true && date === event.getDayOfYear() ) {
    return true;
  } else {
    return false;
  }
};

//takes input from the input boxes and passes it to the lon lat function
submit = function() {
  var latitude, longitude, address;
  longitude = document.getElementById('longitude').value;
  latitude = document.getElementById('latitude').value;
  address = document.getElementById('address').value;
  console.log(longitude + " " + latitude + " " + address);

  if(address != null || address != ""){
    subaddress(address, "10mi");
  }

  if(longitude != null || longitude != "" || latitude != null || latitude != ""){
    return sublonlat(longitude, latitude, '10mi');
  }

};

//attach the submit function to the submit button
document.addEventListener('DOMContentLoaded', function() {
  custom = document.getElementById('custom');
  custom.addEventListener('click', submit);
});

//attach the locate function to the globe button
document.addEventListener('DOMContentLoaded', function() {
  locater = document.getElementById('locate');
  locater.addEventListener('click', locate);
});
