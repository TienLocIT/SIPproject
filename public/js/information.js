function addItem() {
    var div=document.createElement("div");
    var input=document.createElement("input");
    var span=document.createElement("span");
    input.setAttribute("type","hidden")
    input.setAttribute("name","skill");
    input.setAttribute("value",document.getElementById("skill").value);
    span.textContent=document.getElementById("skill").value;
    input.textContent=document.getElementById("skill").value;
    div.className="test aaa";
    div.appendChild(input)
    div.appendChild(span)
    // div.textContent=document.getElementById("skill").value;
    var listSkill=document.getElementsByClassName("list-skill");
    listSkill[0].appendChild(div);
 }
