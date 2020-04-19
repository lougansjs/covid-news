window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above
  
  var form = document.getElementById("formulario");
  var status = document.getElementById("result");

  // Success and Error functions for after the form is submitted
  
  function success() {
    form.reset();
    status.classList.remove("d-none");
    status.classList.add("success");
    status.innerHTML = "Dados enviados com sucesso!";
    window.setTimeout(function () {
      status.classList.remove("success");
      status.classList.add("d-none");
    }, 3000);
  }

  function error() {
    status.classList.remove("d-none");
    status.classList.add("fail");
    status.innerHTML = "Oops! Ocorreu um problema.";
    window.setTimeout(function () {
      status.classList.remove("fail");
      status.classList.add("d-none");
    }, 5000);
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}