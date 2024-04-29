const fileImage=document.getElementById('archivo');
const img=document.getElementById('imagen');
const tableConsultation=document.getElementById('consultasTabla');
const selectNameRelevants=document.getElementById('comboNombresParientes');
const searchButton=document.getElementById('btnBuscar');
const form=document.getElementById('formulario');
const tablePersons=document.getElementById('tabla');
const searchRelative=document.getElementById('btnBuscarPariente');
searchButton.addEventListener('click', function(){
    const idSearch=document.getElementById('cedulaConsulta').value;
    console.log({idSearch});
    const lblNameData=document.getElementById('nombreConsulta');
    console.log({lblNameData})
    if(lblNameData){
        findId(idSearch, tablePersons, lblNameData);
    }
})

function findId(idSearch, table, lblName){
    let found=false;
    let name;
    for(let i=1; i<table.rows.length; i++){
        const id=table.rows[i].cells[0].textContent.trim();
        if(id===idSearch){
            name=table.rows[i].cells[1].textContent.trim();
            found=true;
            break;
        }
    }
    if(found){
        lblName.value=name;
    }else{
        alert('Cedula no encontrada');
    }
}

searchRelative.addEventListener('click', function(){
    const idSearch=document.getElementById('datoCedulaPariente').value;
    console.log({idSearch});
    const lblNameData=document.getElementById('nombrePariente');
    console.log({lblNameData});
    if(lblNameData){
        findId(idSearch, tablePersons, lblNameData);
    }
})
fileImage.addEventListener('change', function(){
    const selected=fileImage.files[0];
    if(selected){
        const fileReader=new FileReader();
        fileReader.onload=function(event){
            img.src=event.target.result;
            img.style.display='block';
        }

        fileReader.readAsDataURL(selected);
    }
})


document.getElementById('cedula').addEventListener('keydown', validateNumbers) ;
document.getElementById('telefono').addEventListener('keydown', validateNumbers) ;
document.getElementById('cedulaConsulta').addEventListener('keydown', validateNumbers) ;
document.getElementById('cedulaHijo').addEventListener('keydown', validateNumbers) ;
document.getElementById('datoCedulaPariente').addEventListener('keydown', validateNumbers) ;




function validateNumbers(event){
    // backspace, delete, tab, escape, enter, Ctrl C, Ctrl V
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||(event.keyCode == 67 && event.ctrlKey === true) || 
    (event.keyCode == 86 && event.ctrlKey === true)){
            return;
        }
    // verificar numeros
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
    }
}

function calculateAge(){

    const date=document.getElementById('fecha').value;
    const hour=document.getElementById('hora').value;
    const arrayDate=date.split("-");
    const dayBirth=arrayDate[2];
    const monthBirth=arrayDate[1];
    const yearBirth=arrayDate[0];
    const dateBirth=new Date(yearBirth, parseInt(monthBirth)-1, dayBirth);
    const now=new Date();
    
    const arrayHour=hour.split(":");
    const hourBirth=arrayHour[0];

    let hours=now.getHours()-hourBirth;
    let days=now.getDate()-dateBirth.getDate();
    let months=now.getMonth()-dateBirth.getMonth();
    let years=now.getFullYear()-dateBirth.getFullYear();
    
    if(hours<0){
        hours=hours+24;
        days--;
    }
    if(days<0){
        const monthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += monthDays;
        months--;
    }

    if(months<0 ){
        months=12+months;
        years--;
    }
    return `${years} años, ${months} meses, ${days} dias y ${hours} horas`
   

}

const citysByCountry={
    Ecuador: ['Cuenca', 'Quito', 'Guayaquil'],
    Colombia: ['Bogotá', 'Medellín', 'Cartagena'],
    Peru: ['Lima', 'Cajamarca','Cusco']
}

const countrySelected=document.getElementById('pais');
const citySelected=document.getElementById('ciudad');

function changeCitiesByCountry(){
    const country=countrySelected.value;
    const citys=citysByCountry[country];
    citySelected.innerHTML='';
    citys.forEach(function(city){
        const comboCity=document.createElement('option'); //es necesario que se llame option
        comboCity.text=city;
        citySelected.add(comboCity);
    })
}
countrySelected.addEventListener('change', 
    function(){
        changeCitiesByCountry();    
    
})

document.addEventListener('DOMContentLoaded', function(){
    changeCitiesByCountry();
})


function fillTable(event){
    event.preventDefault();
    const idValidate=document.getElementById('cedula').value;
    const flag=validateId(idValidate);
    if(!flag){
        alert('Cédula inválida');
        return;
    }
    const dateValidate=document.getElementById('')
    const id=document.getElementById('cedula').value;
    const name=document.getElementById('nombre').value;
    const address=document.getElementById('direccion').value;
    const phone=document.getElementById('telefono').value;
    const date=document.getElementById('fecha').value;
    const hour=document.getElementById('hora').value;
    const age=calculateAge();
    const country=document.getElementById('pais').value;
    const city=document.getElementById('ciudad').value;
    const photo=document.getElementById('imagen')
    
    const row=tablePersons.insertRow();
    const cellId=row.insertCell(0);
    const cellName=row.insertCell(1);
    const cellAddress=row.insertCell(2);
    const cellPhone=row.insertCell(3);
    const cellDate=row.insertCell(4);
    const cellHour=row.insertCell(5);
    const cellAge=row.insertCell(6);
    const cellCountry=row.insertCell(7);
    const cellCity=row.insertCell(8);
    cellId.textContent=id;
    cellName.textContent=name;
    cellAddress.textContent=address;
    cellPhone.textContent=phone;
    cellDate.textContent=date;
    cellHour.textContent=hour;
    cellAge.textContent=age;
    cellCountry.textContent=country;
    cellCity.textContent=city;

    
    formulario.reset();
    photo.setAttribute("src", "");
}

function fillMedicalConsultation(event){
    event.preventDefault();
    const form=document.getElementById('formConsultas');
    const id=document.getElementById('cedulaConsulta').value;
    const name=document.getElementById('nombreConsulta').value;
    const date=document.getElementById('fechaConsulta').value;
    const hour=document.getElementById('horaConsulta').value;

    
    const row=tableConsultation.insertRow();
    
    const cellDate=row.insertCell(0);
    const cellHour=row.insertCell(1);
    const cellId=row.insertCell(2);
    const cellName=row.insertCell(3);
    cellDate.textContent=date;
    cellHour.textContent=hour;
    cellId.textContent=id;
    if(name){
        cellName.textContent=name;
    }
    
    form.reset();
    name.value="";

}
function fillTableRelatives(event){
    const tableRelatives=document.getElementById('hijos');
    event.preventDefault();
    const id=document.getElementById('cedulaHijo').value;
    console.log({id})
    const name=document.getElementById('nombreHijo').value;
    console.log({name})
    const idRelative=document.getElementById('datoCedulaPariente').value;
    console.log({idRelative})
    const relationship=document.getElementById('comboParentezco').value;
    console.log({relationship})
    
    const nameRelative=document.getElementById('nombrePariente').value;
    console.log({nameRelative})
    const row=tableRelatives.insertRow();
    const cellId=row.insertCell(0);
    const cellName=row.insertCell(1);
    const cellIdRelative=row.insertCell(2);
    const cellRelationship=row.insertCell(3);
    const cellNameRelative=row.insertCell(4);
    cellId.textContent=id;
    cellName.textContent=name;
    cellIdRelative.textContent=idRelative;
    cellRelationship.textContent=relationship;
    cellNameRelative.textContent=nameRelative;
    form.reset();
    // const idInput=document.getElementById('cedulaHijo');
    // const nameInput=document.getElementById('nombreHijo');
    // idInput.value="";
    //nameInput.value="";
     

}
function validateId(id){
        
        if (id.length !== 10) {
            return false;
        }

        let region = Number(id[0] + id[1]);
        if (region < 1 || region > 24) {
            return false;
        }

        let thirdDigit = Number(id[2]);
        if (thirdDigit < 0 || thirdDigit > 6) {
            return false;
        }

        let sum = 0;
        let val = 0;
        for (let i = 0; i < 9; i++) {
            if (i & 1) {
                val = +id[i] * 1;
                if (val >= 10) {
                    val = val - 9;
                }
            } else {
                val = +id[i] * 2;
                if (val >= 10) {
                    val = val - 9;
                }
            }
            sum += val;
        }

        sum = sum % 10 ? 10 - sum % 10 : 0;

        if (sum === Number(id[9])) {
            return true;
        } else {
            return false;
        }
        
    
}

function searchPerson(){
    console.log("llegue aqui")
    const idSearch=document.getElementById('cedulaConsulta');
    let found=false;
    let name;
    for(let i=1; i<tableConsultation.rows.length; i++){
        const id=tableConsultation.rows[i].cells[0].textContent.trim();
        if(id===idSearch){
            name=tableConsultation.rows[i].cells[1].textContent.trim();
            found=true;
            break;
        }
    }
    if(found){
        const lblName=document.getElementById('datoNombre');
        lblName.textContent=name;
    }
}
