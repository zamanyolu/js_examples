
const newPeriodFormEl = document.getElementsByName("form")[0;
const startDateInputEl = document.getElementById("start-date")
const endDateInputEl = document.getElementById("end-date")

// listen to form submission
newPeriodFormEl.addEventListener("submit", (event) =>{
    evetn.preventDefault();

    // get the start and end dates from the form
    const startDate = startDateInputEl.value;
    const endDate = endDateInputEl.value;

    // check if the dates are invalid
    if (checkDatesInvald(startDate, endDate)){
        // if dates are invalid, exit.
        return;
    }

    // store the new period in our client-side storage.
    storeNewPeriod(startDate, endDate);

    // refresh the UI
    renderPastPeriods();

    // reset the form.
    newPeriodFormEl.reset();
});

function checkDatesInvalid(startDate, endDate){
    // check start date is after end date, and neither is null.
    if(!startDate || !endDate || startDate > endDate){
        // To make the validation robust we could:
        // 1. add error messaging based on error type
        // 2. Alert assistive technology users about the error
        // 3. move focus to the error location
        // instead, for now, we clear the dates if either
        // or both are invalid
        newPeriodFormEl.reset();

        // as dates are invalid, return true.
        return true;
    }

    // else
    return false;
}

const STORAGE_KEY = "period-tracker";

function storeNewPeriod(startDate, endDate){
    // get ddata from storage.
    const periods = getAllStoredPeriods();

    // add new period object to the end of the array of periods.
    periods.push({startDate, endDate});

    //sort array so that periods are ordered by start date, from newest ot oldest
    periods.sort((a,b)=>{
        return new Date(b.startDate) - new Date(a.startDate);
    });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
}

function getAllStoredPeriods(){
    // get the string of periods data from localStorage
    const data = window.localStorage.getItem(STORAGE_KEY);

    // if no periods were stored, default to en ampty array
    // otherwise, return stored data as parsed JSON
    const periods = data ? JSON.parse(data): [];

    return periods;
}