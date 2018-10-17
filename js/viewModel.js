//#######View Model######//

let ViewModel = function() {
    let self = this;  

    this.locationList = ko.observableArray([]);

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    //Shows marker when list item is clicked.
    this.showMarker = function(location) {
        google.maps.event.trigger(location.marker, 'click');
    }        

    //Filter for searching through map list
    this.filter = ko.observable("");
    
    this.filteredLocations = ko.computed(function() {
        let filter = self.filter().toLowerCase();
        return ko.utils.arrayFilter(self.locationList(), function(item) {
            let isVisible = item.name.toLowerCase().indexOf(filter) > -1 || !filter;
            item.marker.setVisible(isVisible);
            return isVisible;
        });
    });

};
