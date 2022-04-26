var form = document.getElementById("search-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
var page = 0

function formTable(data, div) {
    
    var html = '<table class="table table-hover table-striped table-bordered" id="posts">'
    html += '<tr>'

    for(var key in data[0]){
        html += '<th>'+key+'</th>'
    }

    html += '</tr>'
    
    for(var i = 0; i < data.length; i++){
        html += '<tr>';
        value = data[i]
        for(var key in value){
            datapoint = value[key]
            if(key === 'Medium URL')
                datapoint = "<a href='" + datapoint + "'>" + "Post by: " + value['Creator'] + '</a>'
            html += '<td>'+datapoint+'</td>';
       }
       html += '<tr>';
    }

    html += '</table>'
    div.innerHTML = html
}

function appendTable(data) {
    var postsTable = document.getElementById('posts')

    for(var i = 0; i < data.length; i++){
        var newRow = posts.insertRow()
        value = data[i]
        for(var key in value){
            datapoint = value[key]

            var newCell = newRow.insertCell()
            datapointElement = document.createTextNode(datapoint)

            if(key === 'Medium URL') {
                var linkElement = document.createElement('a');
                var linkText = document.createTextNode("Post by: " + value['Creator']);
                linkElement.appendChild(linkText);
                linkElement.title = datapoint;
                linkElement.href = datapoint;
                datapointElement = linkElement
            }

            newCell.appendChild(datapointElement)
       }
    }
}

async function performRequest(tags, page, flag) {
    params = {tags: tags, page: page}

    url = document.URL + 'search?'
    
    var searchParams = new URLSearchParams()
    
    Object.keys(params).forEach(key => searchParams.append(key, params[key]))
    url = url + searchParams.toString()

    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        
        result_box = document.getElementById('result')
        if(flag == 0)
            formTable(json, result_box)
        else
            appendTable(json)
        document.getElementById('result').scrollIntoView(false)
    } else {
        let json = await response.json()
        alert("Error: " + json.error);
    }
}

document.getElementById("find").addEventListener("click", function(){
    tags = document.getElementById('tags').value
    page = 0
    performRequest(tags, page, 0)
    document.getElementById('loadMore').style.display = ''
})

document.getElementById("loadMore").addEventListener("click", async function(){
    tags = document.getElementById('tags').value
    page++
    
    performRequest(tags, page, 1)
})
