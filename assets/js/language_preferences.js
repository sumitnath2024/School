document.addEventListener('DOMContentLoaded', function() {
    const userSelect = document.getElementById('user_id');
    const languageSelect = document.getElementById('language');
    const userLanguagePreferencesTable = document.getElementById('user_language_preferences_table').getElementsByTagName('tbody')[0];

    function setLanguagePreference() {
        const userId = userSelect.value;
        const language = languageSelect.value;

        if (!userId || !language) {
            alert("Please select a user and a language.");
            return;
        }

        firebase.firestore().collection('language_preferences').doc(userId).set({
            language: language
        }).then(() => {
            alert("Language preference set successfully.");
            fetchUserLanguagePreferences();
        }).catch(error => {
            console.error('Error setting language preference:', error);
            alert("Error setting language preference. Please try again.");
        });
    }

    function fetchUserLanguagePreferences() {
        firebase.firestore().collection('language_preferences').get().then(snapshot => {
            userLanguagePreferencesTable.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const row = userLanguagePreferencesTable.insertRow();
                row.insertCell(0).textContent = doc.id;
                row.insertCell(1).textContent = data.language;
            });
        }).catch(error => {
            console.error('Error fetching user language preferences:', error);
            alert("Error fetching user language preferences. Please try again.");
        });
    }

    function loadUsers() {
        // Replace this with the actual code to load user IDs into the userSelect element
        firebase.firestore().collection('users').get().then(snapshot => {
            snapshot.forEach(doc => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = doc.id;
                userSelect.appendChild(option);
            });
        }).catch(error => {
            console.error('Error loading users:', error);
            alert("Error loading users. Please try again.");
        });
    }

    document.querySelector('button[onclick="setLanguagePreference()"]').addEventListener('click', setLanguagePreference);

    loadUsers();
    fetchUserLanguagePreferences();
});
