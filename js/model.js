//#######MODEL###########//

var initialLocations = [{
    name: 'Prospect Park', address: '10 Grand Army Plaza, Brooklyn, NY 11238', coordinates: {lat: 40.66197082538004, lng: -73.97122621536255},},
    {name: 'Brooklyn Museum', address: '200 Eastern Pkwy, Brooklyn, NY 11238', coordinates: {lat: 40.671892, lng: -73.963610},},
    {name: 'New York-Presbyterian Brooklyn Methodist Hospital', address: '506 6th St, Brooklyn, NY 11215', coordinates: {lat: 40.66804190055108, lng: -73.97978782653809},},
    {name: 'Old Stone House', address: '336 3rd St, Brooklyn, NY 11215', coordinates: {lat: 40.673180, lng: -73.984597},},
    {name: 'Litchfield Villa', address: '95 Prospect Park West, Brooklyn, NY 11215', coordinates: {lat: 40.667144, lng: -73.973683},}
];

var Location = function(data) {
    this.name = data.name;
    this.address = data.address;
    this.coordinates = data.coordinates;
    this.marker = data.marker;
};