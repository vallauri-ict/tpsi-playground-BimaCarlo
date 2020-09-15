let dati;
let aggiungi = false;
let modifica = false;
$(document).ready(setup);
function setup()
{
    c($("#modifica"));
    $("#modifica").hide();
    aggiungiCallBackElemento($("#avvia"),"click",avvia);
}

function avvia()
{
    var txt = $("#testo").val();
    dati = JsonDaStringa(txt);
    creaTabellaDaJson(dati);
    creaControlli("button",["Cancella","Aggiungi","Modifica"]);
}

function c(s){
    console.log(s);
}