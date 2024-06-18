document.addEventListener('DOMContentLoaded', function() {
    const surveyTitleInput = document.getElementById('survey_title');
    const surveyQuestionsInput = document.getElementById('survey_questions');
    const surveyListTable = document.getElementById('survey_list_table').getElementsByTagName('tbody')[0];

    function createSurvey() {
        const surveyTitle = surveyTitleInput.value;
        const surveyQuestions = surveyQuestionsInput.value;

        if (!surveyTitle || !surveyQuestions) {
            alert("Please fill in all fields.");
            return;
        }

        const surveyData = {
            title: surveyTitle,
            questions: surveyQuestions
        };

        firebase.firestore().collection('surveys').add(surveyData)
            .then(() => {
                alert("Survey created successfully.");
                fetchSurveyList();
            })
            .catch(error => {
                console.error('Error creating survey:', error);
                alert("Error creating survey. Please try again.");
            });
    }

    function fetchSurveyList() {
        firebase.firestore().collection('surveys').get()
            .then(snapshot => {
                surveyListTable.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const row = surveyListTable.insertRow();
                    row.insertCell(0).textContent = data.title;
                    row.insertCell(1).textContent = data.questions;
                });
            })
            .catch(error => {
                console.error('Error fetching survey list:', error);
                alert("Error fetching survey list. Please try again.");
            });
    }

    document.querySelector('button[onclick="createSurvey()"]').addEventListener('click', createSurvey);

    fetchSurveyList();
});
