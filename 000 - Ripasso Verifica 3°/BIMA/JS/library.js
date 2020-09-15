//necessita JQuery
function creaElemento(tipo,classe, id, text){
    let ele = $("<"+tipo+">"+text+"</"+tipo+">");
    ele.attr("id",id);
    ele.attr("class",classe);
    return ele;
}

function aggiungiCallBackID(id, evento, func){
    if(func && typeof func === "function")
    {
        //let boj = document.getElementById(id);
        let obj = $("#"+id);
        console.table(obj);
        obj.on(evento,func);    
    }
}

function aggiungiCallBackElemento(elem, evento, func)
{
    if(func && typeof func === "function")
        elem.on(evento,func);
        else
        console.log("errore : aggiungiCallBackElemento ==>  parametri passati non validi");
}

function sostituisciClasse(obj, classe1, classe2){
    if(obj.hasClass(classe1))
    {
        obj.removeClass(classe1);
        obj.addClass(classe2);
    }
    else
    {
        obj.removeClass(classe2);
        obj.addClass(classe1);
    }
    
}
//
//
//
let selezionata = -1;

function JsonDaStringa(stringa)
{
    var json = JSON.parse(stringa);
    return json;
}

function creaTabellaDaJson(json){
    var keys = Object.keys(json);
    switch(keys.length)
    {
        case 0:
            //tabella vuota
            break;
        case 1:
            var array = json[keys];
            creaTabellaDaArray(array);
            console.log(array);
            break;
        default:
            //creo una tabella prendendo come colonne il numero di keys
            
            break;
    }
}


function creaTabellaDaArray(array)
{
    let tab = $("<table></table>");
    tab.attr("id","tabella");
    for(let key in array)//scorrendo le tighe
    {
        console.log(array + "\n" + key);
        let tr = $("<tr></tr>");
        tr.addClass("noSelezionata");
        tr.attr("id","tr"+key);
        aggiungiCallBackElemento(tr,"click",function(){riga_Click(this.id);})
        for(let campo in array[key])
        {
            console.log(array[key][campo]);
            let td = $("<td>"+array[key][campo]+"</td>");
            td.attr("name",campo);
            tr.append(td);
        }
        tab.append(tr);
    }
    $("body").append(tab);
}

function creaControlli(tipo,testi)
{
    for(let name of testi)
    {
        let controllo = creaElemento(tipo,"",name,name);
        aggiungiCallBackElemento(controllo,"click",function(){pressioneBottone(this.id);});
        $("body").append(controllo);

    }
}

function pressioneBottone(id){
    switch(id){
        case "Aggiungi":
            anggiungiRigaTabella($("#tabella"));
            break;
        case "Cancella":
            cancellaRigaTabella($("tabella"));
            break;
        case "Modifica":
            modificaRigaTabella($("tabella"));
             break;
    }
}

function riga_Click(id){
    alert(id +" - "+ selezionata);
    if(selezionata != -1)
        $("#"+selezionata).removeClass("selezionata");
    if(id != selezionata)
    {
        selezionata = id;     
        sostituisciClasse($("#"+id),"noSelezionata","selezionata");                  
    }
    else
        selezionata = -1;

}

function anggiungiRigaTabella(tabella){
    alert("Aggiungi");
    if(!aggiungi){
        $("#modifica").show();
        aggiungi = true;
    }
    else
    {
        anggiungiRigaTabellaDaTI();
        aggiungi = false;        
        $("#modifica").hide();
    }
}

function anggiungiRigaTabellaDaTI(){
    let nome = $("#nome").val();
    let cognome = $("#cognome").val();
    let media = $("#media").val();
    let id = "tr"+($("#tabella tr").length);
    let tr = creaElemento("tr","noSelezionata",id,"");
    tr.append(creaElemento(("<td>"+nome+"</td>")).attr("name","nome"));
    tr.append(creaElemento(("<td>"+cognome+"</td>")).attr("name","cognome"));
    tr.append(creaElemento(("<td>"+media+"</td>")).attr("name","media"));
    aggiungiCallBackElemento(tr,"click",function(){riga_Click(this.id);})
    $("#tabella").append(tr);
}

function cancellaRigaTabella(tabella){
    alert("Cancellazione della riga : " + selezionata);
    $("#"+selezionata).remove()
}

function modificaRigaTabella(tabella){
    alert("Modifica");
    if(!modifica){
        $("#modifica").show();
        datiPerModifica();
        modifica = true;
    }
    else
    {
        modificaRigaTabellaDati();
        modifica = false;    
        $("#modifica").hide();
    }
}

function modificaRigaTabellaDati()
{
    
    let nome = $("#"+selezionata+"[name=nome]");
    let cognome = $("#"+selezionata+"[name=cognome]")
    let media = $("#"+selezionata+"[name=media]");
    console.log(nome.attr("id") + "nome ");    
    console.log(cognome.attr("id") + "cogno ");    
    console.log(media.attr("id") + "media ");
    nome.html($("#nome").val());
    cognome.html($("#cognome").val());
    media.html($("#media").val());
}

function datiPerModifica()
{
    $("#nome").val($("#"+selezionata+"[name=nome]").html());    
    console.log($("#"+selezionata+"[name=nome]"));
    $("#cognome").val($("#"+selezionata+"[name=nome]").html());
    $("#media").val($("#"+selezionata+"[name=nome]").html());
}