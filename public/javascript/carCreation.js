
async function newCarHandler(event) {
  event.preventDefault();

  const photo= await getPhoto(document.querySelector('input[name="photo"]').files[0]);
  const make = document.querySelector('input[name="make"]').value.trim();
  const model = document.querySelector('input[name="model"]').value.trim();
  const year = document.querySelector('input[name="yearPicker"]').value.trim();
  const color = document.querySelector('input[name="color"]').value.trim();
  const rate = document.querySelector('input[name="rate"]').value.trim();

  const response = await fetch(`/api/cars`, {
    method: 'POST',
    body: JSON.stringify({
      photo,
      make,
      model,
      year, 
      color,
      rate
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
};

const getPhoto= file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result) 
});

$(function() { 
  $('#yearPicker').datepicker( {
    yearRange: "c-100:c",
    changeMonth: false,
    changeYear: true,
    showButtonPanel: true,
    closeText:'Select',
    currentText: 'This year',
    onClose: function(dateText, inst) {
      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
      $(this).val($.datepicker.formatDate('yy', new Date(year, 1, 1)));
    }
  }).focus(function () {
    $(".ui-datepicker-month").hide();
    $(".ui-datepicker-calendar").hide();
    $(".ui-datepicker-current").hide();
    $(".ui-datepicker-prev").hide();
    $(".ui-datepicker-next").hide();
    $("#ui-datepicker-div").position({
      my: "left top",
      at: "left bottom",
      of: $(this)
    });
  }).attr("readonly", false);
});

document.querySelector('.new-car-form').addEventListener('submit', newCarHandler);

