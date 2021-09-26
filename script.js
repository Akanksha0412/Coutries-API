let countries;
const container = document.querySelector(".container-fluid");

var create = function (data) {

    var r = Math.floor(countries.length / 3);
    var count = 0;
    for (var i = 0; i < r; i++) {
        var row = document.createElement('div');
        row.className = "row box1";
        container.appendChild(row);
        for (var j = 1; j <= 3; j++) {
            var capital = data[count].capital;
            if (!capital) {
                capital = "None";
            }
            
            var cardHtml = `
                <div class="col-md-4 col-sm-12 mt-3">
                    <div class="card item-card card-block">
                        <p id=` + count + ` class="heading">
                            <b>` + data[count].name + `</b>
                        </p>
                        <img class="flag" src=` + data[count].flags[0] + ` alt="img" height="80px">
                        <p class="text">Capital : 
                            <b class="textValue">` + data[count].capital + `</b>
                        </p>
                        <p class="text">Region : 
                            <b class="textValue">` + data[count].region + `</b>
                        </p>
                        <p class="text">Country Code : 
                            <b class="textValue">` + data[count].alpha2Code + `</b>
                        </p> 
                        <button type="button" class="button btn btn-primary" data-toggle="modal" data-target="#exampleModal" id="` +capital+ `" onclick="popup(this.id)"> Show Temperature</button>
                    </div>
                </div>`;
            row.innerHTML += cardHtml;
            count = count + 1;
        }
    }
}

fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(data => intialize(data))
    .catch(err => console.error("Error :", err));

function intialize(countriesData) {
    countries = countriesData;
    create(countries);
}

function popup(capital) {
    $("#fillData").empty();
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+capital+"&appid=7efabb514883dd5b2b8b5d8fc318dec0")
        .then(response => response.json())
        .then(data => {
                console.log(data.main.temp);
                
                $("#fillData").append("The temperature here is: "+data.main.temp);
            }
        );
        
}


