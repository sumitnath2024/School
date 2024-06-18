document.addEventListener('DOMContentLoaded', function() {
    const routeNameInput = document.getElementById('route_name');
    const busNumberInput = document.getElementById('bus_number');
    const routeDetailsInput = document.getElementById('route_details');
    const routeListTable = document.getElementById('route_list_table').getElementsByTagName('tbody')[0];

    function addRoute() {
        const routeName = routeNameInput.value;
        const busNumber = busNumberInput.value;
        const routeDetails = routeDetailsInput.value;

        if (!routeName || !busNumber || !routeDetails) {
            alert("Please fill in all fields.");
            return;
        }

        const routeData = {
            route_name: routeName,
            bus_number: busNumber,
            route_details: routeDetails
        };

        firebase.firestore().collection('bus_routes').add(routeData)
            .then(() => {
                alert("Route added successfully.");
                fetchRouteList();
            })
            .catch(error => {
                console.error('Error adding route:', error);
                alert("Error adding route. Please try again.");
            });
    }

    function fetchRouteList() {
        firebase.firestore().collection('bus_routes').get()
            .then(snapshot => {
                routeListTable.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const row = routeListTable.insertRow();
                    row.insertCell(0).textContent = data.route_name;
                    row.insertCell(1).textContent = data.bus_number;
                    row.insertCell(2).textContent = data.route_details;
                });
            })
            .catch(error => {
                console.error('Error fetching route list:', error);
                alert("Error fetching route list. Please try again.");
            });
    }

    document.querySelector('button[onclick="addRoute()"]').addEventListener('click', addRoute);

    fetchRouteList();
});
