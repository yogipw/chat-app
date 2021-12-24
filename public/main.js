var socket = io();

// Get the current username from the cookies
var user = cookie.get("user");

cek();

// dom
const message = document.querySelector("#message"),
  btn = document.querySelector("#send");

// event
btn.addEventListener("click", () => {
  cek()
  if (message.value != "") {
    socket.emit("chat", {
      message: message.value,
      handle: cookie.get("user") || "Anonymous",
    });
  } else {
    alert("All fields are required!");
  }
  message.value = "";
});

socket.on("chat", (data) => {
  $(".chat").append(
    "<p><strong>" + data.handle + "</strong>: " + data.message + "</p>"
  );
});

function cek() {
  if (!user) {
    // Ask for the username if there is none set already
    Swal.fire({
      title: "Name",
      text: "Enter your name",
      input: "text",
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter name!";
        }
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        cookie.set("user", result.value);
      } else {
        Swal("name?");
      }
    });
  }
}
