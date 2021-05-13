document.getElementById('defaultOpen').click();

function openTab(event, id) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(id).style.display = "block";
    event.currentTarget.className += " active";
}

var search = document.getElementById('city');
var searchValue;

search.addEventListener('change', function (e) {
    searchValue = search.value;
    callApi(searchValue);
});
const api_key = 'ce4a0c92d75ac80f5a83ff2d8a4d8009';

function callApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=vi&units=metric`).then(response => response.json())
        .then(function (data) {
            if (data.cod == 200) {
                var temperature = document.getElementById('temperature');
                var like = document.querySelector('#like');
                var min_temp = document.querySelector('#min_temp');
                var max_temp = document.querySelector('#max_temp');
                var icon_tt = document.querySelector('#icon-tt');
                var description = document.querySelector('#description');
                var wind = document.querySelector('#wind');
                var humidity = document.querySelector('#humidity');

                temperature.innerHTML = parseFloat(data.main.temp).toFixed(2);
                like.innerHTML = parseFloat(data.main.feels_like).toFixed(2);
                min_temp.innerHTML = parseFloat(data.main.temp_min).toFixed(2);
                max_temp.innerHTML = parseFloat(data.main.temp_max).toFixed(2);
                icon_tt.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                description.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
                wind.innerHTML = data.wind.speed;
                humidity.innerHTML = data.main.humidity;
            } else if (data.cod == 404) {
                alert('Không tìm thấy thành phố');
            }
        }).catch(function (err) {
            console.log('fail to call api. Mess:' + err);
        })
}

setup();

function setup() {
    var datetime = document.querySelector('#datetime');
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    datetime.innerHTML = date + ', ' + time;

}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'vn' }, 'I love you');
}