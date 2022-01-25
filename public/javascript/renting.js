let stringDates = document.querySelector('.dates').dataset.dates;
let disabledDates = stringDates.split(",");

let today = new Date();


$(function() { 
  $('#start_date').datepicker({
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ disabledDates.indexOf(string) == -1 ]
    },
    minDate: today,
  });
});

$(function() { 
  $('#end_date').datepicker({
    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ disabledDates.indexOf(string) == -1 ]
    },
    minDate: today,
  });

  $("#start_date" ).on( "change", function() {
    let newMin = new Date($('#start_date').val());
    $("#end_date").datepicker("option", "minDate", newMin)
  });  

});

async function rentHandler(event) {
  event.preventDefault();

 let start_date = $( "#start_date" ).on( "change", function() {
    return $('#start_date').val();

  });

  let end_date = $( "#end_date" ).on( "change", function() {
    return $('#end_date').val();
  
  });

  start_date = start_date[0].value.split("/").reverse().join("-")
  end_date= end_date[0].value.split("/").reverse().join("-")
  let car_id = document.querySelector('.dropdown').dataset.id;
  const response = await fetch(`/api/rent/${car_id}`, {
    method: 'POST',
    body: JSON.stringify({
      start_date,
      end_date
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

  
}

document.querySelector('.rent-form').addEventListener('submit', rentHandler);


